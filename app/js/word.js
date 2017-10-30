import { dictionary } from './lib/dictionary'

class Word {
  constructor (nodes) {
    this.nodes = nodes || []
  }

  clone (extra) {
    const nodes = this.nodes.slice(0)
    nodes.push(extra)
    return new Word(nodes)
  }

  findWords () {
    const last = this.nodes[this.nodes.length - 1]
    return last.sibs.map((sib) => {
      if (!this.nodes.includes(sib)) {
        return this.clone(sib)
      }
    }).reduce((memo, word) => {
      if (word) {
        if (word.isWord()) {
          memo.push(word)
        }
        if (word.isPossibleWord()) {
          return [...memo, ...word.findWords()]
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

  isWord () {
    return dictionary.lookup(this.toString())
  }

  isPossibleWord () {
    return this.isWord() || dictionary.isValidPrefix(this.toString())
  }
}

export { Word }
