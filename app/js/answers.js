import React, { Component } from 'react'
import { AnswerItem } from './answerItem'

class Answers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      order: 'Length',
    }
  }

  sort = {
    Lowest (a, b) { const scoreA = a.nodes.reduce((memo, node) => Math.min(memo, node.pos.ri))
      const scoreB = a.nodes.reduce((memo, node) => Math.min(memo, node.pos.ri))
      return scoreA > scoreB ? 1 : -1
    },
    Highest (a, b) {
      const scoreA = a.nodes.reduce((memo, node) => Math.max(memo, node.pos.ri))
      const scoreB = a.nodes.reduce((memo, node) => Math.max(memo, node.pos.ri))
      return scoreA > scoreB ? -1 : 1
    },
    Length (a, b) {
      return a.toString().length > b.toString().length ? -1 : 1
    },
  }

  changeSortOrder = ({ target }) => {
    this.setState({
      order: target.value,
    })
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
