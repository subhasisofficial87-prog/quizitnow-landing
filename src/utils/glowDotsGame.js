// Game Logic for Glow Dots

export const createEmptyGame = (gridSize) => {
  const totalDots = gridSize * gridSize
  const horizontalLines = gridSize * (gridSize - 1)
  const verticalLines = (gridSize - 1) * gridSize
  const totalBoxes = (gridSize - 1) * (gridSize - 1)

  return {
    gridSize,
    totalDots,
    horizontalLines,
    verticalLines,
    totalBoxes,
    horizontalLineStates: Array(horizontalLines).fill(false),
    verticalLineStates: Array(verticalLines).fill(false),
    boxOwners: Array(totalBoxes).fill(null), // null, 0, or 1
    scores: [0, 0],
    currentPlayer: 0,
    gameOver: false,
    winner: null,
    moveHistory: []
  }
}

export const getLineKey = (lineType, row, col) => `${lineType}-${row}-${col}`

export const parseLineKey = (key) => {
  const [type, row, col] = key.split('-')
  return { type, row: parseInt(row), col: parseInt(col) }
}

export const drawLine = (game, lineType, row, col) => {
  if (game.gameOver) return { success: false, boxesCompleted: [] }

  if (lineType === 'h') {
    if (game.horizontalLineStates[row * (game.gridSize - 1) + col]) {
      return { success: false, boxesCompleted: [] }
    }
    game.horizontalLineStates[row * (game.gridSize - 1) + col] = true
  } else if (lineType === 'v') {
    if (game.verticalLineStates[row * game.gridSize + col]) {
      return { success: false, boxesCompleted: [] }
    }
    game.verticalLineStates[row * game.gridSize + col] = true
  }

  const boxesCompleted = checkCompletedBoxes(game, lineType, row, col)

  game.moveHistory.push({
    lineType,
    row,
    col,
    boxesCompleted: boxesCompleted.length,
    player: game.currentPlayer
  })

  if (boxesCompleted.length > 0) {
    boxesCompleted.forEach((boxIndex) => {
      game.boxOwners[boxIndex] = game.currentPlayer
      game.scores[game.currentPlayer]++
    })
  } else {
    game.currentPlayer = 1 - game.currentPlayer
  }

  checkGameOver(game)

  return { success: true, boxesCompleted }
}

export const checkCompletedBoxes = (game, lineType, row, col) => {
  const completed = []
  const gs = game.gridSize

  if (lineType === 'h') {
    // Check box above and below horizontal line
    if (row > 0) {
      const boxIndex = (row - 1) * (gs - 1) + col
      if (isBoxComplete(game, row - 1, col)) {
        if (!game.boxOwners[boxIndex]) {
          completed.push(boxIndex)
        }
      }
    }
    if (row < gs - 1) {
      const boxIndex = row * (gs - 1) + col
      if (isBoxComplete(game, row, col)) {
        if (!game.boxOwners[boxIndex]) {
          completed.push(boxIndex)
        }
      }
    }
  } else if (lineType === 'v') {
    // Check box left and right of vertical line
    if (col > 0) {
      const boxIndex = row * (gs - 1) + (col - 1)
      if (isBoxComplete(game, row, col - 1)) {
        if (!game.boxOwners[boxIndex]) {
          completed.push(boxIndex)
        }
      }
    }
    if (col < gs - 1) {
      const boxIndex = row * (gs - 1) + col
      if (isBoxComplete(game, row, col)) {
        if (!game.boxOwners[boxIndex]) {
          completed.push(boxIndex)
        }
      }
    }
  }

  return completed
}

export const isBoxComplete = (game, row, col) => {
  const gs = game.gridSize

  // Top line
  const topComplete = game.horizontalLineStates[row * (gs - 1) + col]
  // Bottom line
  const bottomComplete = game.horizontalLineStates[(row + 1) * (gs - 1) + col]
  // Left line
  const leftComplete = game.verticalLineStates[row * gs + col]
  // Right line
  const rightComplete = game.verticalLineStates[row * gs + (col + 1)]

  return topComplete && bottomComplete && leftComplete && rightComplete
}

export const checkGameOver = (game) => {
  if (
    game.horizontalLineStates.every((v) => v) &&
    game.verticalLineStates.every((v) => v)
  ) {
    game.gameOver = true
    if (game.scores[0] > game.scores[1]) {
      game.winner = 0
    } else if (game.scores[1] > game.scores[0]) {
      game.winner = 1
    } else {
      game.winner = -1 // Draw
    }
  }
}

export const undoLastMove = (game) => {
  if (game.moveHistory.length === 0 || game.gameOver) return false

  const lastMove = game.moveHistory.pop()
  const { lineType, row, col, player } = lastMove

  if (lineType === 'h') {
    game.horizontalLineStates[row * (game.gridSize - 1) + col] = false
  } else {
    game.verticalLineStates[row * game.gridSize + col] = false
  }

  // Remove completed boxes
  const boxesToRemove = checkCompletedBoxes(game, lineType, row, col)
  boxesToRemove.forEach((boxIndex) => {
    if (game.boxOwners[boxIndex] === player) {
      game.boxOwners[boxIndex] = null
      game.scores[player]--
    }
  })

  // Restore game state
  game.currentPlayer = player
  if (boxesToRemove.length === 0) {
    game.currentPlayer = 1 - game.currentPlayer
  }

  game.gameOver = false
  game.winner = null

  return true
}

export const getAvailableMoves = (game) => {
  const moves = []
  const gs = game.gridSize

  // Horizontal lines
  for (let row = 0; row < gs; row++) {
    for (let col = 0; col < gs - 1; col++) {
      if (!game.horizontalLineStates[row * (gs - 1) + col]) {
        moves.push({ type: 'h', row, col })
      }
    }
  }

  // Vertical lines
  for (let row = 0; row < gs - 1; row++) {
    for (let col = 0; col < gs; col++) {
      if (!game.verticalLineStates[row * gs + col]) {
        moves.push({ type: 'v', row, col })
      }
    }
  }

  return moves
}

export const getLineIndex = (lineType, row, col, gridSize) => {
  if (lineType === 'h') {
    return row * (gridSize - 1) + col
  } else {
    return row * gridSize + col
  }
}

export const getBoxIndex = (row, col, gridSize) => {
  return row * (gridSize - 1) + col
}
