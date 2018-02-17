import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Playground from'../Playground'
let logThis = require('debug')('this')

class App extends Component {


  logMessage(message, e){
    logThis(': %o', message);
    console.log(message);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to game 'live'</h1>
        </header>
        <p className="App-intro">
          Выберите размер поля и нажмите "Start"
        </p>
        <Playground />
      </div>
    );
  }
}


export default App;
