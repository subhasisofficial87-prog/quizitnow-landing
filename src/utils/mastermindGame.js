// Mastermind Game Logic

// Color palettes for different difficulty levels
export const COLOR_PALETTES = {
  classic: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'],
  medium: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'],
  hard: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']
}

export const DIFFICULTY_PRESETS = {
  classic: {
    name: 'Classic',
    pegs: 4,
    colors: 6,
    maxGuesses: 10,
    colorPalette: COLOR_PALETTES.classic
  },
  medium: {
    name: 'Medium',
    pegs: 5,
    colors: 6,
    maxGuesses: 12,
    colorPalette: COLOR_PALETTES.medium
  },
  hard: {
    name: 'Hard',
    pegs: 6,
    colors: 8,
    maxGuesses: 12,
    colorPalette: COLOR_PALETTES.hard
  }
}

// Generate random secret code
export const generateSecretCode = (numPegs, colorPalette) => {
  const code = []
  for (let i = 0; i < numPegs; i++) {
    const randomIndex = Math.floor(Math.random() * colorPalette.length)
    code.push(colorPalette[randomIndex])
  }
  return code
}

// Calculate feedback for a guess
export const calculateFeedback = (secretCode, guess) => {
  const blacks = [] // Correct color, correct position
  const whites = [] // Correct color, wrong position
  const secretCopy = [...secretCode]
  const guessCopy = [...guess]

  // Find blacks
  for (let i = 0; i < secretCode.length; i++) {
    if (guess[i] === secretCode[i]) {
      blacks.push('black')
      secretCopy[i] = null
      guessCopy[i] = null
    }
  }

  // Find whites
  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] !== null) {
      const index = secretCopy.indexOf(guessCopy[i])
      if (index !== -1) {
        whites.push('white')
        secretCopy[index] = null
      }
    }
  }

  // Combine feedback (blacks first, then whites)
  return [...blacks, ...whites]
}

// Check if guess matches secret code
export const isWinningGuess = (secretCode, guess) => {
  return secretCode.every((color, index) => color === guess[index])
}

// Create initial game state
export const createGameState = (difficulty) => {
  const preset = DIFFICULTY_PRESETS[difficulty] || DIFFICULTY_PRESETS.classic
  const secretCode = generateSecretCode(preset.pegs, preset.colorPalette)

  return {
    secretCode,
    numPegs: preset.pegs,
    colorPalette: preset.colorPalette,
    maxGuesses: preset.maxGuesses,
    guesses: [], // Array of { guess: [], feedback: [] }
    currentGuess: Array(preset.pegs).fill(null),
    gameOver: false,
    won: false,
    currentGuessIndex: 0
  }
}

// Submit a guess
export const submitGuess = (gameState) => {
  // Check if guess is complete
  if (gameState.currentGuess.some(peg => peg === null)) {
    return { success: false, message: 'Complete the guess first!' }
  }

  const feedback = calculateFeedback(gameState.secretCode, gameState.currentGuess)
  const isWin = isWinningGuess(gameState.secretCode, gameState.currentGuess)

  const newGameState = {
    ...gameState,
    guesses: [...gameState.guesses, { guess: [...gameState.currentGuess], feedback }],
    currentGuess: Array(gameState.numPegs).fill(null),
    currentGuessIndex: gameState.currentGuessIndex + 1,
    gameOver: isWin || gameState.currentGuessIndex + 1 >= gameState.maxGuesses,
    won: isWin
  }

  return {
    success: true,
    gameState: newGameState,
    feedback,
    isWin,
    isGameOver: newGameState.gameOver
  }
}

// Update current guess
export const updateGuess = (gameState, position, color) => {
  const newGuess = [...gameState.currentGuess]
  newGuess[position] = color
  return {
    ...gameState,
    currentGuess: newGuess
  }
}

// Remove peg from guess
export const removePeg = (gameState, position) => {
  const newGuess = [...gameState.currentGuess]
  newGuess[position] = null
  return {
    ...gameState,
    currentGuess: newGuess
  }
}

// Undo last guess
export const undoLastGuess = (gameState) => {
  if (gameState.guesses.length === 0) {
    return gameState
  }

  const lastGuessIndex = gameState.guesses.length - 1
  return {
    ...gameState,
    guesses: gameState.guesses.slice(0, -1),
    currentGuess: [...gameState.guesses[lastGuessIndex].guess],
    currentGuessIndex: lastGuessIndex,
    gameOver: false,
    won: false
  }
}

// Calculate stats
export const calculateStats = (gameState) => {
  if (!gameState.gameOver) {
    return null
  }

  return {
    guessCount: gameState.guesses.length,
    won: gameState.won,
    secretCode: gameState.secretCode
  }
}

// Format game for storage
export const formatGameForStorage = (gameState, startTime) => {
  const endTime = new Date().getTime()
  const duration = Math.round((endTime - startTime) / 1000)

  return {
    date: new Date().toISOString(),
    difficulty: gameState.numPegs === 4 ? 'classic' : gameState.numPegs === 5 ? 'medium' : 'hard',
    won: gameState.won,
    guessCount: gameState.guesses.length,
    maxGuesses: gameState.maxGuesses,
    duration,
    secretCode: gameState.secretCode,
    guesses: gameState.guesses
  }
}
