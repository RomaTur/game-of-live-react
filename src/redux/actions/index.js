//  определили названия доступных действий
export const RANDOM_GRID = 'RANDOM_GRID'

export const randomGrid = () => ({
  type: RANDOM_GRID
})

export const PLAY = 'PLAY'

export const play = () => ({
  type: PLAY
})

export const CHANGE_SQUARE = 'CHANGE_SQUARE'

export const chacngeSquare = () => ({
  type: CHANGE_SQUARE
})
