import trie from 'trie'
import words from '../../static/dicts.txt'
//import words from '../../static/ospd4.txt'

var dictionary = trie.createTrieFromArray(words.split('\n'));

export { dictionary }
