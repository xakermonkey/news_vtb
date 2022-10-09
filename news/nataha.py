
from slovnet import NER
from navec import Navec
import pymorphy2

navec = Navec.load('navec_news_v1_1B_250K_300d_100q.tar')
ner = NER.load('slovnet_ner_news_v1.tar')
ner.navec(navec)

def find_ner(text):
    word = []
    markup = ner(text)
    for span in markup.spans:
        word.append(pymorphy2.MorphAnalyzer(lang="ru").parse(text[span.start:span.stop])[0].normal_form)
    return word
