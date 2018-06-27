import { dictionary } from './lib/dictionary'
import { dictionary2 } from './lib/dictionary2'

class Word {
  constructor (nodes) {
    this.nodes = nodes || []
  }

  clone (extra) {
    const nodes = this.nodes.slice(0)
    nodes.push(extra)
    return new Word(nodes)
  }

  findWords (isDeep) {
    const last = this.nodes[this.nodes.length - 1]
    return last.sibs.map((sib) => {
      if (!this.nodes.includes(sib)) {
        return this.clone(sib)
      }
    }).reduce((memo, word) => {
      if (word) {
        if (word.isWord(isDeep)) {
          memo.push(word)
        }
        if (word.isPossibleWord(isDeep)) {
          return [...memo, ...word.findWords(isDeep)]
        }
      }
      return memo
    }, [])
  }

  includes (needle, pos) {
    const foundNode = this.nodes.find((node) => {
      return node.pos.ri === pos.ri && node.pos.ci === pos.ci
    })
    return foundNode && foundNode.letter === needle.letter
  }

  toString () {
    return this.nodes.map((node) => {
      return node.letter
    }).join('').toLowerCase()
  }

  isWord (isDeep) {
    var dict = !isDeep ? dictionary : dictionary2
    return dict.lookup(this.toString())
  }

  isPossibleWord (isDeep) {
    var dict = !isDeep ? dictionary : dictionary2
    return this.isWord(isDeep) || dict.isValidPrefix(this.toString())
  }

}

export { Word }
