import React, { Component } from 'react'
import { render } from 'react-dom'
import classnames from 'classnames'
import { dictionary } from './lib/dictionary'

class Word {
  constructor (nodes) {
    this.nodes = nodes
  }

  push (node) {
    this.nodes.push(node)
    return this
  }

  clone () {
    return new Word(this.nodes.slice(0))
  }

  findWords () {
    const last = this.nodes[this.nodes.length - 1]
    return last.sibs.map((sib) => {
      if (!this.nodes.includes(sib)) {
        return this.clone().push(sib)
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

class Board extends Component {
  static propTypes = {
    handleWords: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      board: Array(13).fill().map(() => {
        return Array(10).fill().map(() => ({}))
      })
    }
  }

  findWords = () => {
    const directions = [
      [0, -1], [0, 1], [-1, 0], [1, 0], [1, -1], [-1, -1], [1, 1], [-1, 1]
    ]
    const board = this.state.board.map((row) => {
      return row.map((cell) => ({ ...cell }))
    })

    board.map((row, ri) => {
      return row.map((cell, ci) => {
        cell.pos = { ri, ci }
        cell.sibs = directions.map((dir) => {
          return board[ri + dir[0]] && board[ri + dir[0]][ci + dir[1]]
        }).filter(Boolean)
      })
    })

    this.props.handleWords(board.map((row) => {
      return row.reduce((memo, cell) => {
        if (cell.mode === 'blue') {
          const word = new Word([cell])
          return [...memo, ...word.findWords()]
        }
        return memo
      })
    }).reduce((memo, item) => {
      return [...memo, ...item]
    }, []))
  }

  generateTestData = () => {
    this.setState({
      board: Array(13).fill().map((_, rowIndex) => {
        return Array(10).fill().map((_, columnIndex) => {
          const letter = String.fromCharCode(65 + Math.round(Math.random() * 10000) % 26)
          const mode = rowIndex === 0 ? 'orange' : (
            rowIndex === 12 ? 'blue' : ''
          )
          return {
            mode,
            letter,
          }
        })
      })
    })
  }

  handleValue = ({ target }) => {
    const { row, column } = target.dataset
    const { value } = target

    this.setState({
      board: Array(13).fill().map((_, rowIndex) => {
        return Array(10).fill().map((_, columnIndex) => {
          if (row == rowIndex && column == columnIndex) {
            return {
              mode: this.state.board[rowIndex][columnIndex].mode,
              letter: value.toUpperCase()
            }
          }
          return this.state.board[rowIndex][columnIndex]
        })
      })
    })
  }

  handleMode = ({ target }) => {
    const { mode } = this.props
    const { row, column } = target.dataset

    if (mode === 'typing') return

    this.setState({
      board: Array(13).fill().map((_, rowIndex) => {
        return Array(10).fill().map((_, columnIndex) => {
          if (row == rowIndex && column == columnIndex) {
            return {
              mode,
              letter: this.state.board[rowIndex][columnIndex].letter,
            }
          }
          return this.state.board[rowIndex][columnIndex]
        })
      })
    })
  }

  render () {
    return (
      <div className="board">
        <ul className="board">
          { this.state.board.map((row, rowIndex) => (
            <li key={rowIndex}>
              <ul>
                { row.map(({ letter, mode }, columnIndex) => {
                  const classes = classnames({
                    [mode]: mode,
                    invalid: letter && !letter.match(/^[a-z]$/i),
                  })
                  return <li key={columnIndex}>
                    <input
                      className={classes}
                      data-row={rowIndex}
                      data-column={columnIndex}
                      value={letter}
                      onFocus={this.handleMode}
                      onChange={this.handleValue} />
                  </li>
                }) }
              </ul>
            </li>
          )) }
        </ul>
        <input type="submit" value="Find Words" onClick={this.findWords} />
        <input type="submit" value="Test Data" onClick={this.generateTestData} />
      </div>
    )
  }
}

const ForkMe = () => (
  <div className="github-fork-ribbon-wrapper right">
    <div className="github-fork-ribbon">
      <a href="https://github.com/blainesch/baser-react">Fork me on GitHub</a>
    </div>
  </div>
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      words: [],
      mode: 'typing',
      order: 'Length',
    }
  }

  handleModeChange = (e) => {
    const mode = e.target.id
    this.setState({
      mode,
    })
  }

  handleWords = (words) => {
    this.setState({words})
  }

  changeSortOrder = ({ target }) => {
    this.setState({
      order: target.value,
    })
  }

  sort = {
    Lowest (a, b) {
      const lowestA = a.nodes.reduce((memo, node) => {
        return Math.min(memo, node.pos.ri)
      })
      const lowestB = a.nodes.reduce((memo, node) => {
        return Math.min(memo, node.pos.ri)
      })
      return lowestA > lowestB ? 1 : -1
    },
    Highest (a, b) {
      const highestA = a.nodes.reduce((memo, node) => {
        return Math.max(memo, node.pos.ri)
      })
      const highestB = a.nodes.reduce((memo, node) => {
        return Math.max(memo, node.pos.ri)
      })
      return highestA > highestB ? -1 : 1
    },
    Length (a, b) {
      return a.toString().length > b.toString().length ? -1 : 1
    }
  }


  render() {
    const { mode, order } = this.state

    return (
      <div>
        <ForkMe />
        <h2>Wordbase Helper</h2>
        <Board handleWords={this.handleWords} mode={mode} />
        <div className="tools">
          <h3>Tools</h3>
          <ul>
            <li>
              <input
                id="typing"
                type="radio"
                name="mode"
                defaultChecked={this.state.mode === 'typing'}
                onChange={this.handleModeChange} />
              <label htmlFor="typing">Typing</label>
            </li>
            <li>
              <input
                id="orange"
                type="radio"
                name="mode"
                defaultChecked={this.state.mode === 'orange'}
                onChange={this.handleModeChange} />
              <label htmlFor="orange">Opponent Color</label>
            </li>
            <li>
              <input
                id="blue"
                type="radio"
                name="mode"
                defaultChecked={this.state.mode === 'blue'}
                onChange={this.handleModeChange} />
              <label htmlFor="blue">My Color</label>
            </li>
            <li>
              <input
                id="clear"
                type="radio"
                name="mode"
                defaultChecked={this.state.mode === 'clear'}
                onChange={this.handleModeChange} />
              <label htmlFor="clear">Clear Color</label>
            </li>
          </ul>
        </div>
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
            { this.state.words.sort(this.sort[order]).map((word) => {
              return <li>{word.toString()}</li>
            }) }
          </ul>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('react'))
