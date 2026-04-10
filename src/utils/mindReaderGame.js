// Mind Reader Game Logic - Binary Search Algorithm

export const DIFFICULTY_LEVELS = {
  easy: { name: 'Easy', min: 1, max: 50, label: '1-50' },
  medium: { name: 'Medium', min: 1, max: 100, label: '1-100' },
  hard: { name: 'Hard', min: 1, max: 1000, label: '1-1000' }
}

export const createGameState = (difficulty) => {
  const level = DIFFICULTY_LEVELS[difficulty]
  const min = level.min
  const max = level.max
  const mid = Math.floor((min + max) / 2)

  return {
    difficulty,
    min,
    max,
    currentGuess: mid,
    attempts: 0,
    previousGuesses: [],
    gameOver: false,
    won: false,
    cheatingDetected: false,
    history: []
  }
}

export const makeNextGuess = (gameState, feedback) => {
  const { min, max, currentGuess, attempts, previousGuesses, history } = gameState
  let newMin = min
  let newMax = max

  // Record the guess and feedback
  const newHistory = [...history, { guess: currentGuess, feedback }]
  const newPreviousGuesses = [...previousGuesses, currentGuess]

  // Check for cheating (inconsistent responses)
  let cheatingDetected = false
  if (feedback === 'higher') {
    newMin = currentGuess + 1
  } else if (feedback === 'lower') {
    newMax = currentGuess - 1
  } else if (feedback === 'correct') {
    return {
      ...gameState,
      attempts: attempts + 1,
      gameOver: true,
      won: true,
      previousGuesses: newPreviousGuesses,
      history: newHistory
    }
  }

  // Check for cheating: if range becomes invalid
  if (newMin > newMax) {
    cheatingDetected = true
  }

  const nextGuess = Math.floor((newMin + newMax) / 2)

  return {
    ...gameState,
    min: newMin,
    max: newMax,
    currentGuess: nextGuess,
    attempts: attempts + 1,
    previousGuesses: newPreviousGuesses,
    cheatingDetected,
    gameOver: cheatingDetected,
    history: newHistory
  }
}

export const getPerformanceRating = (attempts, max) => {
  const theoreticalMinimum = Math.ceil(Math.log2(max))

  if (attempts <= theoreticalMinimum) {
    return {
      rating: 'Genius 🧠',
      message: 'Perfect! You guessed in the theoretical minimum!',
      emoji: '🧠'
    }
  } else if (attempts <= theoreticalMinimum + 2) {
    return {
      rating: 'Smart 🎯',
      message: 'Great! Very efficient guessing strategy.',
      emoji: '🎯'
    }
  } else if (attempts <= theoreticalMinimum + 5) {
    return {
      rating: 'Good 👍',
      message: 'Nice thinking! Room to optimize though.',
      emoji: '👍'
    }
  } else {
    return {
      rating: 'Lucky 🍀',
      message: 'Got it! But try optimizing your answers next time.',
      emoji: '🍀'
    }
  }
}

export const shouldDetectCheating = (gameState) => {
  return gameState.cheatingDetected
}

export const resetGame = () => {
  return createGameState('medium')
}
