import React, { Component } from 'react'
import { render } from 'react-dom'
import classnames from 'classnames'

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      board: Array(13).fill().map(() => {
        return Array(10).fill().map(() => ({}))
      })
    }
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
      mode: 'typing',
    }
  }

  onModeChange = (e) => {
    const mode = e.target.id
    this.setState({
      mode,
    })
  }

  render() {
    const { mode } = this.state

    return (
      <div>
        <ForkMe />
        <h2>Wordbase Helper</h2>
        <Board mode={mode} />
        <div className="tools">
          <h3>Tools</h3>
          <ul>
            <li>
              <input
                id="typing"
                type="radio"
                name="mode"
                defaultChecked={this.state.mode === 'typing'}
                onChange={this.onModeChange} />
              <label htmlFor="typing">Typing</label>
            </li>
            <li>
              <input
                id="orange"
                type="radio"
                name="mode"
                defaultChecked={this.state.mode === 'orange'}
                onChange={this.onModeChange} />
              <label htmlFor="orange">Opponent Color</label>
            </li>
            <li>
              <input
                id="blue"
                type="radio"
                name="mode"
                defaultChecked={this.state.mode === 'blue'}
                onChange={this.onModeChange} />
              <label htmlFor="blue">My Color</label>
            </li>
            <li>
              <input
                id="clear"
                type="radio"
                name="mode"
                defaultChecked={this.state.mode === 'clear'}
                onChange={this.onModeChange} />
              <label htmlFor="clear">Clear Color</label>
            </li>
          </ul>
        </div>
        <div className="answers">
          <h3>
            <span>Word List</span>
            <select onChange={this.orderWords}>
              <option value="Length">Length</option>
              <option value="Highest">Highest</option>
              <option value="Lowest">Lowest</option>
            </select>
          </h3>
          <ul className="words">
            <li onClick={this.highlightWord}>Meow</li>
          </ul>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('react'))
