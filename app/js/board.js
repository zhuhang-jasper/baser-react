import React, { Component } from 'react'
import classnames from 'classnames'
import { Word } from './word'

class Board extends Component {
  static propTypes = {
    handleWords: React.PropTypes.func.isRequired,
    selectedWord: React.PropTypes.object.isRequired,
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
  
  swapColor = () => {
    this.setState({
      board: Array(13).fill().map((_, ri) => {
        return Array(10).fill().map((_, ci) => {
          const letter = this.state.board[ri][ci].letter
          const prevMode = this.state.board[ri][ci].mode
          const mode = prevMode === 'orange' ? 'blue' : prevMode === 'blue' ? 'orange' : ''
          return {
            mode,
            letter,
          }
        })
      })
    })
  }
  
  generateTestData = () => {
    this.setState({
      board: Array(13).fill().map((_, ri) => {
        return Array(10).fill().map((_, ci) => {
          const letter = String.fromCharCode(65 + Math.round(Math.random() * 10000) % 26)
          const mode = ri === 0 ? 'orange' : (
            ri === 12 ? 'blue' : ''
          )
          return {
            mode,
            letter,
          }
        })
      })
    })
  }
  
  logger = ({ target }) => {
    console.log(this)
    console.log(this.state)
    console.log(this.props)
  }
  
  handleAll = ({ target }) => {
    const { mode } = this.props
    const newclass = mode === 'typing' ? target.className : mode
    const { row, column } = target.dataset
    const { value } = target
    //console.log('row=' + row + 'col=' + column + 'value=' + value + 'mode=' + newclass)
    
    this.setState({
      board: Array(13).fill().map((_, ri) => {
        return Array(10).fill().map((_, ci) => {
          if (row == ri && column == ci) {
            return {
              mode: newclass,
              letter: value.slice(0, 1).toUpperCase()
            }
          }
          return this.state.board[ri][ci]
        })
      })
    })
  }

  handleValue = ({ target }) => {
    const { row, column } = target.dataset
    const { value } = target
    
    this.setState({
      board: Array(13).fill().map((_, ri) => {
        return Array(10).fill().map((_, ci) => {
          if (row == ri && column == ci) {
            return {
              mode: this.state.board[ri][ci].mode,
              letter: value.slice(0, 1).toUpperCase()
            }
          }
          return this.state.board[ri][ci]
        })
      })
    })
  }

  handleMode = ({ target }) => {
    const { mode } = this.props
    const { row, column } = target.dataset

    if (mode === 'typing') return

    this.setState({
      board: Array(13).fill().map((_, ri) => {
        return Array(10).fill().map((_, ci) => {
          if (row == ri && column == ci) {
            return {
              mode,
              letter: this.state.board[ri][ci].letter,
            }
          }
          return this.state.board[ri][ci]
        })
      })
    })
  }

  render () {
    const { selectedWord } = this.props
    return (
      <div className="board">
        <ul className="board">
          { this.state.board.map((row, ri) => (
            <li key={ri}>
              <ul>
                { row.map((cell, ci) => {
                  const { letter, mode } = cell
                  const classes = classnames({
                    [mode]: mode,
                    invalid: letter && !letter.match(/^[a-z]$/i),
                    selected: selectedWord.includes(cell, { ri, ci })
                  })
                  return <li key={ci}>
                    <input
                      className={classes}
                      data-row={ri}
                      data-column={ci}
                      value={letter}
                      onFocus={this.handleAll} />
                  </li>
                }) }
              </ul>
            </li>
          )) }
        </ul>
        <input type="submit" value="Clear" id="btnClear" onClick={this.props.selectedWord = '', this.state.selectedWord = ''} />
        <input type="submit" value="Swap" onClick={this.swapColor} />
        <input type="submit" value="Find Words" onClick={this.findWords} />
        <input type="submit" value="Random" onClick={this.generateTestData} />
        <input type="submit" value="Log" onClick={this.logger} />
      </div>
    )
  }
}

export { Board }
