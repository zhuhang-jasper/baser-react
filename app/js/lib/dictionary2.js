import trie from 'trie'
import words from '../../static/combined.txt'
//import words2 from '../../static/words_alpha.txt'

var dictionary2 = trie.createTrieFromArray(words.split('\n'));

export { dictionary2 }
