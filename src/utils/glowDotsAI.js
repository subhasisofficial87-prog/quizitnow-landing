import { getAvailableMoves, checkCompletedBoxes, isBoxComplete } from './glowDotsGame'

// Strategic AI for Glow Dots
export const getAIMove = (game, difficulty = 'normal') => {
  const availableMoves = getAvailableMoves(game)
  if (availableMoves.length === 0) return null

  if (difficulty === 'easy') {
    return getRandomMove(availableMoves)
  } else if (difficulty === 'normal') {
    return getNormalMove(game, availableMoves)
  } else if (difficulty === 'expert') {
    return getExpertMove(game, availableMoves)
  }

  return getRandomMove(availableMoves)
}

// Random move - Easy AI
const getRandomMove = (availableMoves) => {
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

// Normal difficulty - Tries to complete boxes, blocks opponent
const getNormalMove = (game, availableMoves) => {
  // Try to complete a box
  for (const move of availableMoves) {
    const testGame = JSON.parse(JSON.stringify(game))
    const boxes = checkCompletedBoxes(testGame, move.type, move.row, move.col)
    if (boxes.length > 0) {
      return move
    }
  }

  // Try to block opponent from completing boxes
  for (const move of availableMoves) {
    const testGame = JSON.parse(JSON.stringify(game))
    // Set the line temporarily
    if (move.type === 'h') {
      testGame.horizontalLineStates[move.row * (testGame.gridSize - 1) + move.col] = true
    } else {
      testGame.verticalLineStates[move.row * testGame.gridSize + move.col] = true
    }

    // Check if opponent would complete a box with other moves
    const opponentMoves = getAvailableMoves(testGame)
    let opponentCanComplete = false
    for (const oMove of opponentMoves) {
      const boxes = checkCompletedBoxes(testGame, oMove.type, oMove.row, oMove.col)
      if (boxes.length > 0) {
        opponentCanComplete = true
        break
      }
    }

    if (opponentCanComplete) {
      return move
    }
  }

  // Avoid giving opponent a setup (one move away from completing)
  return avoidSettingUp(game, availableMoves)
}

// Expert difficulty - Uses minimax-like strategy with lookahead
const getExpertMove = (game, availableMoves) => {
  let bestMove = null
  let bestScore = -Infinity

  for (const move of availableMoves) {
    const score = evaluateMove(game, move)
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove || availableMoves[0]
}

const evaluateMove = (game, move) => {
  let score = 0
  const testGame = JSON.parse(JSON.stringify(game))

  // Set the line
  if (move.type === 'h') {
    testGame.horizontalLineStates[move.row * (testGame.gridSize - 1) + move.col] = true
  } else {
    testGame.verticalLineStates[move.row * testGame.gridSize + move.col] = true
  }

  // Score for completing boxes
  const completedBoxes = checkCompletedBoxes(testGame, move.type, move.row, move.col)
  score += completedBoxes.length * 100

  // Penalty for giving opponent good moves
  const opponentMoves = getAvailableMoves(testGame)
  let opponentCompletions = 0
  for (const oMove of opponentMoves) {
    const boxes = checkCompletedBoxes(testGame, oMove.type, oMove.row, oMove.col)
    opponentCompletions += boxes.length
  }
  score -= opponentCompletions * 30

  // Bonus for blocking opponent
  score += countBlockingValue(testGame, move) * 10

  return score
}

const countBlockingValue = (game, move) => {
  let value = 0
  const gs = game.gridSize

  if (move.type === 'h') {
    // Check boxes above and below
    if (move.row > 0 && isNearCompletion(game, move.row - 1, move.col)) {
      value++
    }
    if (move.row < gs - 1 && isNearCompletion(game, move.row, move.col)) {
      value++
    }
  } else if (move.type === 'v') {
    // Check boxes left and right
    if (move.col > 0 && isNearCompletion(game, move.row, move.col - 1)) {
      value++
    }
    if (move.col < gs - 1 && isNearCompletion(game, move.row, move.col)) {
      value++
    }
  }

  return value
}

const isNearCompletion = (game, boxRow, boxCol) => {
  const gs = game.gridSize
  let linesComplete = 0

  const topComplete = game.horizontalLineStates[boxRow * (gs - 1) + boxCol]
  const bottomComplete = game.horizontalLineStates[(boxRow + 1) * (gs - 1) + boxCol]
  const leftComplete = game.verticalLineStates[boxRow * gs + boxCol]
  const rightComplete = game.verticalLineStates[boxRow * gs + (boxCol + 1)]

  if (topComplete) linesComplete++
  if (bottomComplete) linesComplete++
  if (leftComplete) linesComplete++
  if (rightComplete) linesComplete++

  return linesComplete === 3
}

const avoidSettingUp = (game, availableMoves) => {
  for (const move of availableMoves) {
    const testGame = JSON.parse(JSON.stringify(game))

    if (move.type === 'h') {
      testGame.horizontalLineStates[move.row * (testGame.gridSize - 1) + move.col] = true
    } else {
      testGame.verticalLineStates[move.row * testGame.gridSize + move.col] = true
    }

    // Check if this move creates a "near completion" for opponent
    let setsUp = false
    const opponentMoves = getAvailableMoves(testGame)

    for (const oMove of opponentMoves) {
      if (isNearCompletion(testGame, oMove.type === 'h' ? oMove.row : oMove.row, oMove.col)) {
        setsUp = true
        break
      }
    }

    if (!setsUp) {
      return move
    }
  }

  return availableMoves[0]
}
