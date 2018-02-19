import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Playground from '../Playground'
import Header from '../Header'

class App extends Component {
  constructor() {
    super()
    this.intervalId = 0
    this.speed = 100
    this.cols = 20
    this.rows = 20
    this.state = {
      isPlaying: false,
      flag: true,
      generation: 0,
      speed: this.speed,
      cols: this.cols,
      rows: this.rows,
      fullGrid: Array(this.rows).fill([]).map(() => Array(this.cols).fill(false))
    }
    this.selectSquare = this.selectSquare.bind(this)
    this.random = this.random.bind(this)
  }

  componentDidMount() {
    this.random()
    document.querySelector('.input__play').value = 'Start'
    // this.playButton()
  }

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
    this.setState({
      generation: 0,
      fullGrid: Array(this.state.rows).fill([]).map(() => Array(this.state.cols).fill(false))
    })
  }

  selectSquare(row, col) {
    this.props.changeSquare(this.state.fullGrid, row, col)

    this.setState({
      fullGrid: this.props.grid.fullGrid
    })
  }


  random = () => {
    this.clear()
    this.props.randomGrid(this.state.fullGrid, this.state.rows, this.state.cols)
    console.log(this.props)
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
    this.props.play(this.state.fullGrid, this.state.rows, this.state.cols)
    this.setState({
      fullGrid: this.props.grid.fullGrid,
      generation: this.state.generation + 1
    })
  }

  playButton = (el) => {
    if (this.state.isPlaying) {
      clearInterval(this.intervalId)
      this.setState({
        isPlaying: false
      })
      el.target.value = 'Start'
    } else {
      this.intervalId = setInterval(this.play, this.speed)
      this.setState({
        isPlaying: true
      })
      el.target.value = 'Stop'
    }
  }

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
