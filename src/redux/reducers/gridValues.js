import { RANDOM_GRID, PLAY, CHANGE_SQUARE } from '../actions'

const initialState = {
  generation: 0,
  speed: this.speed,
  cols: 20,
  rows: 20,
  fullGrid: Array(20).fill([]).map(() => Array(20).fill(false))
}

const changeSquare = (row, col, grid) => {
  grid[row][col] = !grid[row][col]
  return grid
}

const random = (rows, cols) => {
  const randomGrid = Array(rows).fill([]).map(() => Array(cols).fill(false))

  // this.clear()
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (Math.floor(Math.random() * 4) === 1) {
        randomGrid[i][j] = true
      }
    }
  }
  return randomGrid
}

const play = (rows, cols, grid) => {
  const g = grid
  const g2 = grid

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
      if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false
      if (!g[i][j] && count === 3) g2[i][j] = true
    }
  }
  return g2
}

const gridValues = (state = initialState, action) => {
  if (action.type === RANDOM_GRID) {
    state.fullGrid = random(action.rows, action.cols)
    return state
  }
  if (action.type === PLAY) {
    state.fullGrid = play(action.rows, action.cols, action.fullGrid)
    return state
  }
  if (action.type === CHANGE_SQUARE) {
    state.fullGrid = changeSquare(action.row, action.col, action.fullGrid)
    return state
  }
}

export default gridValues
