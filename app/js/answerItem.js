import React, { Component } from 'react'

class AnswerItem extends Component {
  handleClick = () => {
    this.props.handleClick(this.props.word)
  }

  render () {
    const { word } = this.props
    return <li onClick={this.handleClick}><span>{word.toString()}</span></li>
  }
}

export { AnswerItem }
