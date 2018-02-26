import React, { Component } from 'react'
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
    const newGrid = cloneArr(this.state.fullGrid)

    newGrid[row][col] = !newGrid[row][col]
    this.setState({
      fullGrid: newGrid
    })
  }


  random = () => {
    this.clear()

    const rows = this.state.rows
    const cols = this.state.cols
    const randomGrid = Array(rows).fill([]).map(() => Array(cols).fill(false))

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          randomGrid[i][j] = true
        }
      }
    }
    this.setState({
      fullGrid: randomGrid
    })
  }

  play = () => {
    //  вычисление одной итерации по алгоритму
    //  подробнее - https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB
    const cols = this.state.cols
    const rows = this.state.rows
    const g = this.state.fullGrid
    const g2 = cloneArr(this.state.fullGrid)
    let equal = true

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let count = 0

        if (i > 0) if (g[i - 1][j]) count++
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++
        if (i > 0 && j < cols - 1) if (g[i - 1][j + 1]) count++
        if (j < cols - 1) if (g[i][j + 1]) count++
        if (j > 0) if (g[i][j - 1]) count++
        if (i < rows - 1) if (g[i + 1][j]) count++
        if (i < rows - 1 && j > 0) if (g[i + 1][j - 1]) count++
        if (i < rows - 1 && cols - 1) if (g[i + 1][j + 1]) count++
        if (g[i][j] && (count < 2 || count > 3)) {
          g2[i][j] = false
          equal = false
        }
        if (!g[i][j] && count === 3) {
          g2[i][j] = true
          equal = false
        }
      }
    }
    //  если текущее поколение идентично с предыдущим, то
    //  останавливаем "игру", иначе
    //  присваиваем новый массив и увеличиваем поколение
    if (equal) {
      clearInterval(this.intervalId)
      this.setState({
        isPlaying: false
      })
      const playButton = document.querySelector('.input__button--play')

      playButton.style.opacity = '0.7'
      playButton.value = 'Start'
      playButton.disabled = true
    } else {
      this.setState({
        fullGrid: g2,
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

function cloneArr(arr) {
  return JSON.parse(JSON.stringify(arr))
}

export default App
