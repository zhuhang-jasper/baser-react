import React, { Component } from 'react'
import classnames from 'classnames'
import { Word } from './word'

class Board extends Component {
  static propTypes = {
    handleWords: React.PropTypes.func.isRequired,
  }

  constructor (props) { super(props)
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
              letter: value.slice(0, 1).toUpperCase()
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

export { Board }
