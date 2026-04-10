// Advanced Mind Reader - Multi-Question Deduction System

export const DIFFICULTY_LEVELS = {
  easy: { name: 'Easy', min: 1, max: 50, label: '1-50', questions: 3 },
  medium: { name: 'Medium', min: 1, max: 100, label: '1-100', questions: 4 },
  hard: { name: 'Hard', min: 1, max: 1000, label: '1-1000', questions: 5 }
}

export const QUESTIONS = {
  range_low: {
    text: "Is your number less than 50?",
    key: 'range_low',
    type: 'yesno'
  },
  range_mid: {
    text: "Is your number less than 500?",
    key: 'range_mid',
    type: 'yesno'
  },
  parity: {
    text: "Is your number odd?",
    key: 'parity',
    type: 'yesno'
  },
  divisible_3: {
    text: "Is your number divisible by 3?",
    key: 'divisible_3',
    type: 'yesno'
  },
  divisible_5: {
    text: "Is your number divisible by 5?",
    key: 'divisible_5',
    type: 'yesno'
  }
}

export const createGameState = (difficulty) => {
  const level = DIFFICULTY_LEVELS[difficulty]

  // Randomize constants for each game
  const constants = generateRandomConstants()

  return {
    difficulty,
    min: level.min,
    max: level.max,
    numQuestions: level.questions,
    currentQuestion: 0,
    answers: {},
    constants,
    finalResult: null,
    originalNumber: null,
    gameOver: false,
    won: false,
    correctGuess: false
  }
}

export const generateRandomConstants = () => {
  return {
    range_low_yes: Math.floor(Math.random() * 10) + 5,    // 5-14
    range_low_no: Math.floor(Math.random() * 10) + 15,    // 15-24
    range_mid_yes: Math.floor(Math.random() * 10) + 25,   // 25-34
    range_mid_no: Math.floor(Math.random() * 10) + 35,    // 35-44
    parity_odd: Math.floor(Math.random() * 10) + 3,        // 3-12
    parity_even: Math.floor(Math.random() * 10) + 13,      // 13-22
    divisible_3_yes: Math.floor(Math.random() * 10) + 20,  // 20-29
    divisible_3_no: Math.floor(Math.random() * 10) + 30,   // 30-39
    divisible_5_yes: Math.floor(Math.random() * 10) + 40,  // 40-49
    divisible_5_no: Math.floor(Math.random() * 10) + 50    // 50-59
  }
}

export const getQuestionsForDifficulty = (difficulty) => {
  const level = DIFFICULTY_LEVELS[difficulty]
  const allQuestions = ['range_low', 'parity', 'divisible_3', 'divisible_5', 'range_mid']

  if (difficulty === 'easy') {
    return allQuestions.slice(0, 3)
  } else if (difficulty === 'medium') {
    return allQuestions.slice(0, 4)
  } else {
    return allQuestions
  }
}

export const recordAnswer = (gameState, answer) => {
  const questions = getQuestionsForDifficulty(gameState.difficulty)
  const currentQuestionKey = questions[gameState.currentQuestion]

  return {
    ...gameState,
    answers: {
      ...gameState.answers,
      [currentQuestionKey]: answer
    },
    currentQuestion: gameState.currentQuestion + 1
  }
}

export const generateInstructions = (gameState) => {
  const instructions = [
    {
      step: 1,
      instruction: 'Multiply your number by 2',
      description: 'Take your number and multiply it by 2'
    }
  ]

  const { answers, constants } = gameState
  const questions = getQuestionsForDifficulty(gameState.difficulty)

  // Range instruction
  if (questions.includes('range_low')) {
    const isLess50 = answers.range_low
    const addValue = isLess50 ? constants.range_low_yes : constants.range_low_no
    instructions.push({
      step: 2,
      instruction: `Add ${addValue}`,
      description: `Your number is ${isLess50 ? 'less than' : 'greater than or equal to'} 50, so add ${addValue}`
    })
  }

  // Parity instruction
  if (questions.includes('parity')) {
    const isOdd = answers.parity
    const addValue = isOdd ? constants.parity_odd : constants.parity_even
    instructions.push({
      step: instructions.length + 1,
      instruction: `Add ${addValue}`,
      description: `Your number is ${isOdd ? 'odd' : 'even'}, so add ${addValue}`
    })
  }

  // Divisibility by 3
  if (questions.includes('divisible_3')) {
    const isDivisible = answers.divisible_3
    const addValue = isDivisible ? constants.divisible_3_yes : constants.divisible_3_no
    instructions.push({
      step: instructions.length + 1,
      instruction: `Add ${addValue}`,
      description: `Your number is ${isDivisible ? '' : 'not'} divisible by 3, so add ${addValue}`
    })
  }

  // Divisibility by 5
  if (questions.includes('divisible_5')) {
    const isDivisible = answers.divisible_5
    const addValue = isDivisible ? constants.divisible_5_yes : constants.divisible_5_no
    instructions.push({
      step: instructions.length + 1,
      instruction: `Add ${addValue}`,
      description: `Your number is ${isDivisible ? '' : 'not'} divisible by 5, so add ${addValue}`
    })
  }

  // Range mid (for hard difficulty)
  if (questions.includes('range_mid')) {
    const isLess500 = answers.range_mid
    const addValue = isLess500 ? constants.range_mid_yes : constants.range_mid_no
    instructions.push({
      step: instructions.length + 1,
      instruction: `Add ${addValue}`,
      description: `Your number is ${isLess500 ? 'less than' : 'greater than or equal to'} 500, so add ${addValue}`
    })
  }

  return instructions
}

export const decodeNumber = (gameState, finalResult) => {
  const { answers, constants } = gameState
  const questions = getQuestionsForDifficulty(gameState.difficulty)

  let decodedNumber = finalResult

  // Reverse the operations in reverse order
  let totalAdded = 0

  if (questions.includes('range_mid')) {
    const isLess500 = answers.range_mid
    totalAdded += isLess500 ? constants.range_mid_yes : constants.range_mid_no
  }

  if (questions.includes('divisible_5')) {
    const isDivisible = answers.divisible_5
    totalAdded += isDivisible ? constants.divisible_5_yes : constants.divisible_5_no
  }

  if (questions.includes('divisible_3')) {
    const isDivisible = answers.divisible_3
    totalAdded += isDivisible ? constants.divisible_3_yes : constants.divisible_3_no
  }

  if (questions.includes('parity')) {
    const isOdd = answers.parity
    totalAdded += isOdd ? constants.parity_odd : constants.parity_even
  }

  if (questions.includes('range_low')) {
    const isLess50 = answers.range_low
    totalAdded += isLess50 ? constants.range_low_yes : constants.range_low_no
  }

  // Subtract all additions
  decodedNumber -= totalAdded

  // Divide by 2
  const originalNumber = decodedNumber / 2

  return Math.round(originalNumber)
}

export const verifyNumber = (gameState, finalResult, originalNumber) => {
  const decoded = decodeNumber(gameState, finalResult)
  const isCorrect = decoded === originalNumber

  return {
    decoded,
    isCorrect,
    difference: Math.abs(decoded - originalNumber)
  }
}

export const getEncouragingMessage = () => {
  const messages = [
    "I knew it all along 😏",
    "Your number was obvious to me 🧠",
    "Surprise! I'm psychic 🔮",
    "Figured it out! Pretty smart right? 😎",
    "Mathematics never lies 🎯",
    "Your mind is an open book to me 📖",
    "I predicted this 🎰",
    "The numbers don't lie! 🔢"
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

export const getRevealAnimation = () => {
  const animations = [
    "Analyzing your answers...",
    "Decoding the mathematical pattern...",
    "Reading your thoughts...",
    "Processing your data...",
    "Solving the equation...",
    "Cracking the code...",
    "Revealing the secret..."
  ]
  return animations[Math.floor(Math.random() * animations.length)]
}
