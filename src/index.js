/*
  - Исходное состояние - create-react-app
  - Точка входа index.js
  - Правила Игры "Жизнь" - https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB
*/

//  подключаем зависимости
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'


const root = (
  <App />
)

//  собираем компонент
ReactDOM.render(root, document.getElementById('root'))
registerServiceWorker()
