// import { FILL_SQUARE, EMPTY_SQUARE, fillSquare, emptySquare } from '../actions'

const options = (state = [], action) => {
  // switch (action.type) {
  //   case FILL_SQUARE:
  //     return fillSquare
  //   case EMPTY_SQUARE:
  //     return emptySquare
  //   default:
  //     return state
  // }
  if (action.type === 'EMPTY_SQUARE') {
    return [
      ...state,
      action.payload
    ]
  }
}

export default options
