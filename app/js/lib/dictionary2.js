import trie from 'trie'
import words from '../../static/unchecked.txt'
//import words from '../../static/words_alpha.txt'

var dictionary2 = trie.createTrieFromArray(words.split('\n'));

export { dictionary2 }
