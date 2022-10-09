from allennlp.modules.token_embedders import ElmoTokenEmbedder
from allennlp.data.token_indexers.elmo_indexer import ELMoTokenCharactersIndexer
from allennlp.data.tokenizers.token_class import Token
import torch
import numpy as np
from allennlp.data.vocabulary import Vocabulary

sentence = "Привет мир"

tokens = [Token(word) for word in sentence.split()]


elmo_embedder = ElmoTokenEmbedder(options_file="196/options.json", weight_file="196/model.hdf5")
indexer = ELMoTokenCharactersIndexer()
vocab = Vocabulary()
vocab.set_from_file("196/tokens.txt", is_padded=False)
character_indices = indexer.tokens_to_indices(tokens, vocab)["elmo_tokens"]

indices_tensor = torch.LongTensor([character_indices])

embeddings = elmo_embedder(indices_tensor)[0]
