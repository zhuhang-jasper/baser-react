import React, { Component } from 'react'

class Tools extends Component {
  handleModeChange = (e) => {
    const mode = e.target.id
    this.props.handleModeChange(mode)
  }

  render () {
    const { mode } = this.props
    return (
      <div className="tools">
        <h3>Tools</h3>
        <textarea id="txtArea" rows="13" cols="10" placeholder="Enter words. Separate rows by next line."></textarea>
        <ul>
          <li>
            <input
              id="typing"
              type="radio"
              name="mode"
              defaultChecked={mode === 'typing'}
              onChange={this.handleModeChange} />
            <label htmlFor="typing">Typing</label>
          </li>
          <li>
            <input
              id="orange"
              type="radio"
              name="mode"
              defaultChecked={mode === 'orange'}
              onChange={this.handleModeChange} />
            <label htmlFor="orange">Opponent Color</label>
          </li>
          <li>
            <input
              id="blue"
              type="radio"
              name="mode"
              defaultChecked={mode === 'blue'}
              onChange={this.handleModeChange} />
            <label htmlFor="blue">My Color</label>
          </li>
          <li>
            <input
              id="clear"
              type="radio"
              name="mode"
              defaultChecked={mode === 'clear'}
              onChange={this.handleModeChange} />
            <label htmlFor="clear">Clear Color</label>
          </li>
          <div align="center">
            <input id="btnRenderWord" type="submit" value="Fill Words >>" />
          </div>
        </ul>
      </div>
    )
  }
}

export { Tools }
