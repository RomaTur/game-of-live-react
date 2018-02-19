import { createStore } from 'redux'
import grid from '../reducers'

const configureStore = () => {
  const store = createStore(
    grid,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return store
}

export default configureStore
