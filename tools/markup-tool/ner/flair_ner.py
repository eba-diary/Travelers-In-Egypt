from flair.models import SequenceTagger
from flair.data import Sentence
import logging
import os
os.environ['SSL_CERT_FILE'] = 'venv/lib/python3.11/site-packages/certifi/cacert.pem'
import nltk
nltk.download('punkt')

from nltk.tokenize import sent_tokenize

tagger = SequenceTagger.load('ner-fast')
logging.info('Loaded tagger')


def tag_entities(text):
    sentences = sent_tokenize(text)
    output = []
    for s in sentences:
        s = Sentence(s)
        tagger.predict(s)

        output.append(s.to_dict(tag_type='ner'))
    return output
