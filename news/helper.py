import nltk
from nltk.stem.snowball import SnowballStemmer
import re
import os
import codecs
from sklearn import feature_extraction
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

nltk.download('punkt')
nltk.download('stopwords')
stopwords = nltk.corpus.stopwords.words('russian')
stemmer = SnowballStemmer("russian")
stopwords.extend(['что', 'это', 'так', 'вот', 'быть', 'как', 'в', 'к', 'на'])


def token_and_stem(text):
    tokens = [word for sent in nltk.sent_tokenize(text) for word in nltk.word_tokenize(sent)]
    filtered_tokens = []
    for token in tokens:
        if re.search('[а-яА-Я]', token):
            filtered_tokens.append(token)
    stems = [stemmer.stem(t) for t in filtered_tokens]
    return stems


def token_only(text):
    tokens = [word.lower() for sent in nltk.sent_tokenize(text) for word in nltk.word_tokenize(sent)]
    filtered_tokens = []
    for token in tokens:
        if re.search('[а-яА-Я]', token):
            filtered_tokens.append(token)
    return filtered_tokens


def create_tfidf_vectorizer(titles):
    n_featur = 10000
    tfidf_vectorizer = TfidfVectorizer(max_df=0.8, max_features=n_featur,
                                       min_df=0.01, stop_words=stopwords,
                                       use_idf=True, tokenizer=token_and_stem, ngram_range=(1, 3))
    tfidf_matrix = tfidf_vectorizer.fit_transform(titles)
    return tfidf_matrix


def find_best_model(tfidf_matrix, kmax):
    best_kmeans = None
    best_sil = 0
    best_labels = []
    bestk = 0
    for k in range(2, kmax + 1):
        kmeans = KMeans(n_clusters=k).fit(tfidf_matrix)
        labels = kmeans.labels_
        sil = silhouette_score(tfidf_matrix, labels, metric='euclidean')
        if sil > best_sil:
            best_sil = sil
            best_kmeans = kmeans
            best_labels = labels
            bestk = k
    print(best_sil)
    return np.array(best_labels), bestk
