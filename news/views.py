from django.shortcuts import render
from .models import *
import feedparser
from allennlp.modules.token_embedders import ElmoTokenEmbedder
from allennlp.data.token_indexers.elmo_indexer import ELMoTokenCharactersIndexer
from allennlp.data.tokenizers.token_class import Token
import torch
import numpy as np
import tensorflow as tf
from datetime import datetime
from time import mktime
from allennlp.data.vocabulary import Vocabulary
from .helper import create_tfidf_vectorizer, find_best_model
from .nataha import find_ner
from rest_framework.response import Response
from rest_framework.views import APIView

elmo_embedder = ElmoTokenEmbedder(options_file="196/options.json", weight_file="196/model.hdf5")
indexer = ELMoTokenCharactersIndexer()
vocab = Vocabulary()
vocab.set_from_file("196/tokens.txt", is_padded=False)
classif_model = tf.keras.models.load_model("classif_model.h5")
model_title = tf.keras.models.load_model("model_title.h5")
agent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36"


def preprocess(text, max_word):
    text = text.strip().replace("\n", " ").replace("\xa0", " ").lower()
    tokens = [Token(word) for word in text.split()[:max_word]]
    return tokens


def get_embedded(title):
    tokens = preprocess(title, 20)
    character_indices = indexer.tokens_to_indices(tokens, vocab)["elmo_tokens"]
    indices_tensor = torch.LongTensor([character_indices])
    embeddings = elmo_embedder(indices_tensor)[0].detach().numpy()
    embeddings = np.append(embeddings, np.zeros((20 - len(embeddings), 1024))).reshape(20, 1024)
    return embeddings


def predict_role(title):
    embed = get_embedded(title)
    pred = model_title.predict(embed[None, ...])[0]
    return np.argmax(pred)


def find_tags(tags):
    t = []
    for tag in tags:
        tg = Tags.objects.filter(tag=tag["term"]).first()
        if tg:
            t.append(tg)
    return t


def media_filter(request):
    filtred_id = []
    for key in request.GET.keys():
        if key.startswith("media"):
            filtred_id.append(int(key.split("_")[1]))
    return filtred_id


def index(request):
    n = []
    news_title = []
    keywords = []
    filter_media = media_filter(request)
    if filter_media == [] or len(filter_media) == Media.objects.all().count():
        medias = Media.objects.all()
    else:
        medias = Media.objects.filter(id__in=filter_media)
    for media in medias:
        feedpaper = feedparser.parse(media.rss_url, agent=agent)
        for new in feedpaper.entries:
            article = Artilce.objects.filter(title=new['title']).first()
            if not article:
                pred = predict_role(new['title'])
                if pred != 0:
                    news_title.append(new['title'])
                    keywords.append(find_ner(new['title']))
                    tags = find_tags(new.get("tags", []))
                    desc = new.get("description", None)
                    if desc is None:
                        new.get("summary", None)
                    img = ""
                    # for i in new.get("link", []):
                    #     if i["type"].startswith("image"):
                    #         img = i["href"]
                    #         break
                    article = Artilce.objects.create(title=new['title'],
                                                     img=img,
                                                     media=media,
                                                     link=new.get("link", None),
                                                     description=desc,
                                                     body=new.get("text", None),
                                                     category=pred,
                                                     date=datetime.fromtimestamp(mktime(new["published_parsed"]))
                                                     )
                    if tags != []:
                        article.tags.add(*tags)
                        article.save()
                    n.append(article)
            else:
                news_title.append(new['title'])
                keywords.append(find_ner(new['title']))
                n.append(article)
    tf_idf_matrix = create_tfidf_vectorizer(titles=news_title)
    best_labels, k = find_best_model(tf_idf_matrix, 10)
    context_news = {}

    for i in range(k):
        ind = np.where(best_labels == i)
        context_news[i] = []
        for j in ind[0]:
            if "role" in request.GET:
                if n[j].category == int(request.GET.get("role")) or n[j] == 3 or n[j] == 0:
                    context_news[i].append({"news": n[j], "keywords": keywords[j]})
            else:
                context_news[i].append({"news": n[j], "keywords": keywords[j]})
            if len(context_news[i]) > 5:
                break
        # context_news[i].sort(key=lambda x: x["news"].date)

    if filter_media == [] or len(filter_media) == Media.objects.all().count():
        article = Artilce.objects.all()
    else:
        article = Artilce.objects.filter(media_id__in=filter_media)
    if "role" in request.GET:
        if request.GET.get("role") == 1:
            article = article.exclude(category=2).order_by("-date")
        elif request.GET.get("role") == 2:
            article = article.exclude(category=1).order_by("-date")
    else:
        article = article.exclude(category=1).order_by("-date")
    top_news = article[:3]
    big_body_news = article[3]
    body_news = article[4:7]
    return render(request, 'index.html',
                  {"news": context_news, "medias": Media.objects.all(), "roles": Role.objects.all(),
                   "top_news": top_news,
                   "body_news": body_news, "big_body_news": big_body_news, "filter_media": filter_media,
                   "select_role": request.GET.get("role", 2)})


def api(request):
    return render(request, 'api.html')


class GetNews(APIView):

    def get(self, request):
        n = []
        news_title = []
        keywords = []
        filter_media = media_filter(request)
        if filter_media == [] or len(filter_media) == Media.objects.all().count():
            medias = Media.objects.all()
        else:
            medias = Media.objects.filter(id__in=filter_media)
        for media in medias:
            feedpaper = feedparser.parse(media.rss_url, agent=agent)
            for new in feedpaper.entries:
                article = Artilce.objects.filter(title=new['title']).first()
                if not article:
                    pred = predict_role(new['title'])
                    if pred != 0:
                        news_title.append(new['title'])
                        keywords.append(find_ner(new['title']))
                        tags = find_tags(new.get("tags", []))
                        desc = new.get("description", None)
                        if desc is None:
                            new.get("summary", None)
                        img = ""
                        # for i in new.get("link", []):
                        #     if i["type"].startswith("image"):
                        #         img = i["href"]
                        #         break
                        article = Artilce.objects.create(title=new['title'],
                                                         img=img,
                                                         media=media,
                                                         link=new.get("link", None),
                                                         description=desc,
                                                         body=new.get("text", None),
                                                         category=pred,
                                                         date=datetime.fromtimestamp(mktime(new["published_parsed"]))
                                                         )
                        if tags != []:
                            article.tags.add(*tags)
                            article.save()
                        n.append(article)
                else:
                    news_title.append(new['title'])
                    keywords.append(find_ner(new['title']))
                    n.append(article)
        tf_idf_matrix = create_tfidf_vectorizer(titles=news_title)
        best_labels, k = find_best_model(tf_idf_matrix, 10)
        context_news = {}

        for i in range(k):
            ind = np.where(best_labels == i)
            context_news[i] = []
            for j in ind[0]:
                if "role" in request.GET:
                    if n[j].category == int(request.GET.get("role")) or n[j] == 3 or n[j] == 0:
                        context_news[i].append({"news": n[j], "keywords": keywords[j]})
                else:
                    context_news[i].append({"news": n[j], "keywords": keywords[j]})
                if len(context_news[i]) > 5:
                    break
            if len(context_news[i]) == 0:
                del context_news[i]
        return Response(status=200, data={"news": context_news})
