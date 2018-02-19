import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store'

import App from './components/App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()

const root = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(root, document.getElementById('root'))
registerServiceWorker()
