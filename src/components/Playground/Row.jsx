import React, { Component } from 'react'
import Square from '../Square'
import './Playground.css'


class Row extends Component {
  /*
    - в зависимости от значения ячейки присуждаем тот или иной css класс
    - создаем и выводим массив ячеек
  */
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
