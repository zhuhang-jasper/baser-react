import trie from 'trie'
import words from '../../static/words_alpha.txt'

var dictionary = trie.createTrieFromArray(words.split('\n'));

export { dictionary }
