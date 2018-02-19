import React, { Component } from 'react'
import Square from '../Square'
import './Playground.css'


class Row extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     playgroundWidth: window.innerWidth - Math.round(window.innerWidth / 2)
  //   }
  // }

  // componentDidMount() {
  //   const newPlaygroundWidth = this.state.playgroundWidth + 30

  //   this.setState({
  //     playgroundWidth: newPlaygroundWidth
  //   })
  // }

  render() {
    const colsArr = []
    let squareClass = 'Square off'

    for (let j = 0; j < this.props.cols; j++) {
      const squareId = `${this.props.row}_${j}`

      squareClass = (this.props.fullGrid[this.props.row][j]) ? 'Square On' : 'Square Off'

      colsArr.push(
        <Square
          className={squareClass}
          key={squareId}
          squareId={squareId}
          row={this.props.row}
          col={j}
          selectSquare={this.props.selectSquare}
          squareWidth={this.props.squareWidth}
        />
      )
    }


    return (
      <div className='Row'>
        { colsArr }
      </div>
    )
  }
}

export default Row
