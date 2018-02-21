import React, { Component } from 'react'
import './Square.css'

class Square extends Component {
  //  при нажатии на ячейку, в App передается номер колонки и строки
  selectSquare() {
    this.props.selectSquare(this.props.row, this.props.col)
  }
  //  вывод одной ячейки
  render() {
    return (
      <div
        className={this.props.className}
        style={{ width: this.props.squareWidth, height: this.props.squareWidth }}
        onClick={this.selectSquare.bind(this)}
      />
    )
  }
}

export default Square
