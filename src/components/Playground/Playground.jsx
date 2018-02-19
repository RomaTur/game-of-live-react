import React, { Component } from 'react'
import './Playground.css'
import Row from './Row'


class Playground extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playgroundWidth: window.innerWidth - Math.round(window.innerWidth / 2)
    }
  }

  render() {
    const rowsArr = []
    // const squareWidth = (this.props.rows < this.props.cols) ? Math.round(this.playgroundWidth / this.props.cols) - 1 : Math.round(this.playgroundWidth / this.props.rows) - 1
    const squareWidth = Math.round(this.state.playgroundWidth / this.props.cols)
    // console.log(this.props.fullGrid)

    for (let i = 0; i < this.props.rows; i++) {
      rowsArr.push(
        <Row
          className='Row'
          key={i}
          cols={this.props.cols}
          row={i}
          squareWidth={squareWidth}
          fullGrid={this.props.fullGrid}
          selectSquare={this.props.selectSquare}
        />
      )
    }
    return (
      <div className='Playground' style={{ width: this.state.playgroundWidth }}>
        { rowsArr }
      </div>
    )
  }
}

export default Playground
