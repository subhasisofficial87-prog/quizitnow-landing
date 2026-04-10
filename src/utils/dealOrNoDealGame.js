// Deal or No Deal Game Logic

export const CASE_VALUES = [
  1, 5, 10, 50, 100, 500, 1000, 5000, 10000,
  25000, 50000, 100000, 250000, 500000, 750000, 1000000
];

export const ROUND_CONFIG = {
  1: 5, // Open 5 cases in round 1
  2: 4, // Open 4 cases in round 2
  3: 3, // Open 3 cases in round 3
  4: 2, // Open 2 cases in round 4
  5: 1  // Open 1 case in round 5
};

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Create initial game state
export const createGameState = () => {
  const shuffledValues = shuffleArray(CASE_VALUES);

  return {
    cases: shuffledValues.map((value, index) => ({
      id: index,
      value,
      opened: false
    })),
    selectedCaseId: null,
    openedCases: [],
    currentRound: 1,
    bankerOffers: [],
    gameStatus: 'picking', // picking, playing, deciding, final, result
    dealtAmount: null,
    finalValue: null
  };
};

// Mark a case as opened and return updated state
export const openCase = (gameState, caseId) => {
  return {
    ...gameState,
    cases: gameState.cases.map(c =>
      c.id === caseId ? { ...c, opened: true } : c
    ),
    openedCases: [...gameState.openedCases, caseId]
  };
};

// Get remaining (unopened) case values
export const getRemainingValues = (gameState) => {
  const remaining = gameState.cases
    .filter(c => !c.opened && c.id !== gameState.selectedCaseId)
    .map(c => c.value)
    .sort((a, b) => b - a); // High to low
  return remaining;
};

// Get eliminated (opened) case values
export const getEliminatedValues = (gameState) => {
  const eliminated = gameState.openedCases
    .map(id => gameState.cases.find(c => c.id === id).value)
    .sort((a, b) => b - a); // High to low
  return eliminated;
};

// Get risk factor based on round
const getRiskFactor = (currentRound, totalRounds = 5) => {
  let baseFactor;

  if (currentRound <= 2) {
    // Early rounds: banker has advantage (0.6-0.75)
    baseFactor = 0.6 + (currentRound - 1) * 0.075;
  } else if (currentRound <= 4) {
    // Mid rounds: balanced (0.75-0.9)
    baseFactor = 0.75 + (currentRound - 3) * 0.075;
  } else {
    // Late rounds: player has advantage (0.9-1.05)
    baseFactor = 0.9 + (currentRound - 5) * 0.075;
  }

  // Add slight randomness
  const randomFactor = baseFactor + (Math.random() - 0.5) * 0.05;
  return Math.max(0.5, Math.min(1.1, randomFactor)); // Clamp between 0.5 and 1.1
};

// Calculate banker offer
export const calculateBankerOffer = (gameState) => {
  const remainingValues = getRemainingValues(gameState);

  if (remainingValues.length === 0) {
    return gameState.cases.find(c => c.id === gameState.selectedCaseId).value;
  }

  const average = remainingValues.reduce((sum, val) => sum + val, 0) / remainingValues.length;
  const riskFactor = getRiskFactor(gameState.currentRound);
  const offer = Math.floor(average * riskFactor);

  return offer;
};

// Get banker personality message
export const getBankerMessage = (offer, selectedValue, currentRound) => {
  const messages = [
    "That's a risky move 😏",
    "Take the deal before it's too late...",
    "You're walking away from a fortune",
    "The banker will never offer this again",
    "Your luck is running out",
    "Don't be greedy...",
    "This is the best offer you'll get",
    "Think carefully about this decision"
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};

// Get number of cases to open in current round
export const getCasesToOpenThisRound = (currentRound) => {
  return ROUND_CONFIG[currentRound] || 0;
};

// Check if round is complete
export const isRoundComplete = (gameState) => {
  const casesOpenedThisRound = gameState.openedCases.length -
    (gameState.currentRound > 1 ? Object.values(ROUND_CONFIG).slice(0, gameState.currentRound - 1).reduce((a, b) => a + b, 0) : 0);

  const casesToOpen = getCasesToOpenThisRound(gameState.currentRound);
  return casesOpenedThisRound >= casesToOpen;
};

// Move to next round
export const nextRound = (gameState) => {
  const nextRoundNum = gameState.currentRound + 1;

  if (nextRoundNum > 5) {
    // Game over - time to reveal final case
    return {
      ...gameState,
      gameStatus: 'final',
      currentRound: 6
    };
  }

  return {
    ...gameState,
    currentRound: nextRoundNum
  };
};

// Accept deal
export const acceptDeal = (gameState, offerAmount) => {
  return {
    ...gameState,
    gameStatus: 'result',
    dealtAmount: offerAmount,
    finalValue: null
  };
};

// Reject deal and continue
export const rejectDeal = (gameState) => {
  return {
    ...gameState,
    gameStatus: 'playing'
  };
};

// Select player's case
export const selectPlayerCase = (gameState, caseId) => {
  return {
    ...gameState,
    selectedCaseId: caseId,
    gameStatus: 'playing'
  };
};

// Reveal final case
export const revealFinalCase = (gameState) => {
  const selectedCase = gameState.cases.find(c => c.id === gameState.selectedCaseId);

  return {
    ...gameState,
    gameStatus: 'result',
    finalValue: selectedCase.value,
    dealtAmount: null
  };
};

// Get game stats
export const getGameStats = (gameState) => {
  const eliminated = getEliminatedValues(gameState);
  const remaining = getRemainingValues(gameState);

  return {
    totalEliminated: eliminated.length,
    totalRemaining: remaining.length,
    highestEliminated: eliminated.length > 0 ? eliminated[0] : 0,
    lowestRemaining: remaining.length > 0 ? remaining[remaining.length - 1] : 0,
    highestRemaining: remaining.length > 0 ? remaining[0] : 0
  };
};

// Format rupee amount
export const formatRupees = (amount) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount}`;
};
