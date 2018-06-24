import React, { Component } from 'react'
import { AnswerItem } from './answerItem'

class Answers extends Component {
  static propTypes = {
    handleClick: React.PropTypes.func.isRequired,
    selectedWord: React.PropTypes.object.isRequired,
    words: React.PropTypes.array.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      order: 'Length',
    }
  }

  sort = {
    Lowest (a, b) {
      const scoreA = a.nodes.reduce((memo, node) => Math.max(memo, node.pos.ri), 0)
      const scoreB = b.nodes.reduce((memo, node) => Math.max(memo, node.pos.ri), 0)
      if (scoreA > scoreB) return -1
      if (scoreA < scoreB) return 1
      return a.toString() > b.toString() ? 1 : -1
    },
    Highest (a, b) {
      const scoreA = a.nodes.reduce((memo, node) => Math.min(memo, node.pos.ri), 13)
      const scoreB = b.nodes.reduce((memo, node) => Math.min(memo, node.pos.ri), 13)
      if (scoreA > scoreB) return 1
      if (scoreA < scoreB) return -1
      return a.toString() > b.toString() ? 1 : -1
    },
    Length (a, b) {
      const lenA = a.toString().length
      const lenB = b.toString().length
      if (lenA > lenB) return -1
      if (lenA < lenB) return 1
      return a.toString() > b.toString() ? 1 : -1
    },
  }

  changeSortOrder = ({ target }) => {
    this.setState({
      order: target.value,
    })
  }

  clearWord = () => {
    this.props.handleClick('')
  }

  render () {
    const { words, handleClick, selectedWord } = this.props
    const { order } = this.state

    return (
      <div className="answers">
        <h3>
          <span>Word List</span>
          <select onChange={this.changeSortOrder}>
            <option value="Length">Length</option>
            <option value="Highest">Highest</option>
            <option value="Lowest">Lowest</option>
          </select>
          <input type="button" value="Clear" id="btnClear" onClick={this.clearWord} />
        </h3>
        <ul className="words">
          { words.sort(this.sort[order]).map((word, i) => {
            return (
              <AnswerItem
                key={i}
                selected={word === selectedWord}
                handleClick={handleClick}
                word={word} />
            )
          }) }
        </ul>
      </div>
    )
  }
}

export { Answers }
