import React, { Component } from 'react'
import './Playground.css'
import Row from './Row'


class Playground extends Component {
  constructor(props) {
    super(props)
    // определим размер игрового поля
    this.state = {
      playgroundWidth: window.innerWidth - Math.round(window.innerWidth / 2)
    }
  }

  /*
    - в зависимости от размера игрового поля, изменяем размер ячейки
    - создаем и выводим массив строк с количеством колонок в качестве параметра
  */
  render() {
    const rowsArr = []
    const squareWidth = Math.round(this.state.playgroundWidth / this.props.cols)

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
