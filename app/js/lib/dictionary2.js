import trie from 'trie'
import words2 from '../../static/words_alpha.txt'

var dictionary2 = trie.createTrieFromArray(words2.split('\n'));

export { dictionary2 }
