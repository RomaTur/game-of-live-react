import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  componentDidMount() {
    document.querySelector('.input__button--play').value = 'Start'
  }
  render() {
    return (
      <header className='App-header'>
        <h1 className='App-title'>Выберите размер поля, нажмите "Random" или выберите ячейку и нажмите "Start"</h1>
        <div className='inputs'>
          <div className='input__label'>
            <span className='input__title'>Rows</span>
            <input
              className='input__field input__field--rows'
              type='number'
              onChange={this.props.onRows}
              value={this.props.valRows}
            />
          </div>
          <div className='input__label'>
            <span className='input__title'>Columns</span>
            <input
              className='input__field input__field--cols'
              type='number'
              onChange={this.props.onCols}
              value={this.props.valCols}
            />
          </div>
          <div className='input__label'>
            <input
              className='input__button input__button--random'
              type='button'
              onClick={this.props.onRand}
              value='Random'
            />
            <input
              className='input__button input__button--clear'
              type='button'
              onClick={this.props.onClear}
              value='Clear'
            />
          </div>
          <input
            className='input__button input__button--play'
            type='button'
            onClick={this.props.onStart}
          />
        </div>
      </header>
    )
  }
}

export default Header
