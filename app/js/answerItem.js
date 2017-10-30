import React, { Component } from 'react'
import classnames from 'classnames'

class AnswerItem extends Component {
  static propTypes = {
    handleClick: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool.isRequired,
    word: React.PropTypes.object.isRequired,
  }

  handleClick = () => {
    this.props.handleClick(this.props.word)
  }

  render () {
    const { word, selected } = this.props
    const classes = classnames({ selected })
    return (
      <li onClick={this.handleClick}>
        <span className={classes}>{word.toString()}</span>
      </li>
    )
  }
}

export { AnswerItem }
