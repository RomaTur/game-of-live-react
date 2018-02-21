import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Playground from '../Playground'
import Header from '../Header'

class App extends Component {
  //  определяем внутреннее хранилище
  constructor() {
    super()
    this.intervalId = 0
    this.speed = 100
    this.state = {
      isPlaying: false,
      flag: true,
      generation: 0,
      speed: this.speed,
      cols: 20,
      rows: 20,
      fullGrid: Array(20).fill([]).map(() => Array(20).fill(false))
    }
    this.selectSquare = this.selectSquare.bind(this)
  }

  //  сначала опустошаем массив ячеек
  componentDidMount() {
    this.random()
  }

  /*
    Функции:
    - setCols, setRows - изменяем кол-во колонок, строк соответственно
    - clear - останавливаем "игру" и очищаем поле
    - selectSquare - меняем значение ячейки по нажатию на нее
    - random - останавливаем "игру" и определяем рандомные значения ячейкам
    - play - одна итерация рассчета "поколения"
    - playButton - начинаем/останавливаем "игру"
  */
  setCols(val) {
    let cols = parseInt(val.target.value, 10)

    this.clear()
    cols = (cols < 1) ? 1 : cols
    this.setState({
      cols,
      fullGrid: Array(this.state.rows).fill([]).map(() => Array(cols).fill(false))
    })
  }

  setRows(val) {
    let rows = parseInt(val.target.value, 10)

    this.clear()
    rows = (rows < 1) ? 1 : rows
    this.setState({
      rows,
      fullGrid: Array(rows).fill([]).map(() => Array(this.state.cols).fill(false))
    })
  }

  clear = () => {
    clearInterval(this.intervalId)
    const playButton = document.querySelector('.input__button--play')

    playButton.style.opacity = '1'
    playButton.value = 'Start'
    playButton.disabled = false
    document.querySelectorAll('.input__field').forEach(elem => {
      elem.disabled = false
    })
    this.setState({
      generation: 0,
      fullGrid: Array(this.state.rows).fill([]).map(() => Array(this.state.cols).fill(false)),
      isPlaying: false
    })
  }

  selectSquare(row, col) {
    //  отправляем в redux какую ячейку поменять
    this.props.changeSquare(this.state.fullGrid, row, col)
    this.setState({
      fullGrid: this.props.grid.fullGrid
    })
  }


  random = () => {
    this.clear()
    //  отправляем в redux случайное расположение ячеек
    this.props.randomGrid(this.state.fullGrid, this.state.rows, this.state.cols)
    // изначально в redux нет массива, поэтому при инициализации создаем пустой массив, далее берем из redux
    if (this.state.flag) {
      this.setState({
        fullGrid: Array(this.state.rows).fill([]).map(() => Array(this.state.cols).fill(false)),
        flag: false
      })
    } else {
      this.setState({
        fullGrid: this.props.grid.fullGrid
      })
    }
  }

  play = () => {
    // отправляем в redux текущее состояние поля
    this.props.play(this.state.fullGrid, this.state.rows, this.state.cols)
    //  если из redux вернулся null, значит текущая итерация идентична предыдущей
    // останавливаем "игру", иначе
    //  присваиваем новый массив и увеличиваем поколение
    if (this.props.grid.fullGrid === null) {
      clearInterval(this.intervalId)
      this.setState({
        isPlaying: false
      })
      const playButton = document.querySelector('.input__button--play')

      playButton.style.opacity = '0.7'
      playButton.value = 'Start'
      playButton.disabled = true
    } else if (this.state.isPlaying) {
      this.setState({
        fullGrid: this.props.grid.fullGrid,
        generation: this.state.generation + 1
      })
    }
  }

  playButton = (el) => {
    //  нажатие на кнопку start/stop:
    //  если идет итерация, то остановить "игру"
    //  иначе начать "игру"
    if (this.state.isPlaying) {
      clearInterval(this.intervalId)
      this.setState({
        isPlaying: false
      })
      el.target.value = 'Start'
      document.querySelectorAll('.input__field').forEach(elem => {
        elem.disabled = false
      })
    } else {
      this.intervalId = setInterval(this.play, this.speed)
      this.setState({
        isPlaying: true
      })
      el.target.value = 'Stop'
      document.querySelectorAll('.input__field').forEach(elem => {
        elem.disabled = true
      })
    }
  }

  //  отрендерить все это дело
  render() {
    return (
      <div className='App'>
        <Header
          onRows={this.setRows.bind(this)}
          valRows={this.state.rows}
          onCols={this.setCols.bind(this)}
          valCols={this.state.cols}
          onRand={this.random.bind(this)}
          onStart={this.playButton.bind(this)}
          onClear={this.clear.bind(this)}
        />
        <h2>Поколение: {this.state.generation} </h2>
        <Playground
          cols={this.state.cols}
          rows={this.state.rows}
          fullGrid={this.state.fullGrid}
          selectSquare={this.selectSquare}
        />
      </div>
    )
  }
}

//  связываем все функции работы с массивом с redux
export default connect(
  state => ({
    grid: state
  }),
  dispatch => ({
    randomGrid: (allGrid, rowsVar, colsVar) => {
      dispatch({
        type: 'RANDOM_GRID',
        fullGrid: allGrid,
        rows: rowsVar,
        cols: colsVar
      })
    },
    play: (allGrid, rowsVar, colsVar) => {
      dispatch({
        type: 'PLAY',
        fullGrid: allGrid,
        rows: rowsVar,
        cols: colsVar
      })
    },
    changeSquare: (allGrid, rowVar, colVar) => {
      dispatch({
        type: 'CHANGE_SQUARE',
        fullGrid: allGrid,
        row: rowVar,
        col: colVar
      })
    }
  })
)(App)
