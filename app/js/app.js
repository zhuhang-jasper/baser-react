import React, { Component } from 'react'
import { render } from 'react-dom'
import classnames from 'classnames'

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      board: Array(13).fill().map(() => {
        return Array(10).fill().map(() => '')
      })
    }
  }

  handleValue = ({ key, target }) => {
    const { row, column } = target.dataset
    this.setState({
      board: Array(13).fill().map((_, rowIndex) => {
        return Array(10).fill().map((_, columnIndex) => {
          if (row == rowIndex && column == columnIndex) {
            return key.toUpperCase()
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
                { row.map((letter, columnIndex) => {
                  const classes = classnames({
                    invalid: letter && !letter.match(/^[a-z]$/i),
                  })
                  return <li key={columnIndex}>
                    <input
                      className={classes}
                      data-row={rowIndex}
                      data-column={columnIndex}
                      value={letter}
                      onKeyPress={this.handleValue} />
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
  render() {
    return (
      <div>
        <ForkMe />
        <h2>Wordbase Helper</h2>
        <Board />
        <div className="tools">
          <h3>Tools</h3>
          <ul>
            <li>
              <input type="radio" />
              <label htmlFor="typing">Typing</label>
            </li>
            <li>
              <input type="radio" />
              <label htmlFor="orange">Opponent Color</label>
            </li>
            <li>
              <input type="radio" name="tool" id="blue" value="blue"/>
              <label htmlFor="blue">My Color</label>
            </li>
            <li>
              <input type="radio" name="tool" id="clear" value="clear"/>
              <label htmlFor="clear">Clear Color</label>
            </li>
          </ul>
        </div>
        <div className="answers">
          <h3><span>Word List</span>
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
