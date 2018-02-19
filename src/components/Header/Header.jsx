import React, { Component } from 'react'
import './Header.css'
import logo from './logo.svg'


class Header extends Component {
  render() {
    return (
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1 className='App-title'>Выберите размер поля и нажмите "Start"</h1>
        <div className='inputs'>
          <div className='input__label'>
            <span className='input__title'>Rows</span>
            <input
              className='input__field'
              type='number'
              onChange={this.props.onRows}
              value={this.props.valRows}
            />
          </div>
          <div className='input__label'>
            <span className='input__title'>Columns</span>
            <input
              className='input__field'
              type='number'
              onChange={this.props.onCols}
              value={this.props.valCols}
            />
          </div>
          <input
            className='input__random'
            type='button'
            onClick={this.props.onRand}
            value='Random'
          />
          <input
            className='input__play'
            type='button'
            onClick={this.props.onStart}
          />
          <input
            className='input__clear'
            type='button'
            onClick={this.props.onClear}
            value='Clear'
          />
        </div>
      </header>
    )
  }
}

export default Header
