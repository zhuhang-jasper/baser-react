import React, { Component } from 'react'
import { render } from 'react-dom'
import { Board } from './board'
import { ForkMe } from './forkme'
import { Answers } from './answers'
import { Tools } from './tools'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      words: [],
      mode: 'typing',
    }
  }

  handleModeChange = (mode) => {
    this.setState({ mode })
  }

  handleWords = (words) => {
    this.setState({words})
  }

  handleSelectWord = (selectedWord) => {
    this.setState({ selectedWord })
  }

  render() {
    const { mode, words } = this.state

    return (
      <div>
        <ForkMe />
        <h2>Wordbase Helper</h2>
        <Board
          selectedWord={this.selectedWord}
          handleWords={this.handleWords}
          mode={mode} />
        <Tools
          handleModeChange={this.handleModeChange}
          mode={mode} />
        <Answers
          handleClick={this.handleSelectWord}
          words={words} />
      </div>
    )
  }
}

render(<App />, document.getElementById('react'))
