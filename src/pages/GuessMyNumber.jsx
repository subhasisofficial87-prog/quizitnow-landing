import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Volume2, VolumeX, HelpCircle, RotateCcw } from 'lucide-react'
import '../styles/guessMyNumber.css'

const GuessMyNumber = () => {
  const navigate = useNavigate()
  const [screen, setScreen] = useState('home') // home, difficulty, playing, won
  const [difficulty, setDifficulty] = useState(null)
  const [secretNumber, setSecretNumber] = useState(0)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [guessHistory, setGuessHistory] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const confettiRef = useRef(null)

  const DIFFICULTY_LEVELS = {
    easy: { min: 1, max: 50, name: 'Easy' },
    medium: { min: 1, max: 100, name: 'Medium' },
    hard: { min: 1, max: 500, name: 'Hard' },
    extreme: { min: 1, max: 1000, name: 'Extreme' }
  }

  // Play sound effects using Web Audio API
  const playSound = (type) => {
    if (!soundEnabled) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const now = audioContext.currentTime

    switch (type) {
      case 'click':
        const osc1 = audioContext.createOscillator()
        const gain1 = audioContext.createGain()
        osc1.connect(gain1)
        gain1.connect(audioContext.destination)
        osc1.frequency.value = 600
        gain1.gain.setValueAtTime(0.2, now)
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
        osc1.start(now)
        osc1.stop(now + 0.1)
        break

      case 'wrong':
        const osc2 = audioContext.createOscillator()
        const gain2 = audioContext.createGain()
        osc2.connect(gain2)
        gain2.connect(audioContext.destination)
        osc2.frequency.value = 300
        gain2.gain.setValueAtTime(0.2, now)
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
        osc2.start(now)
        osc2.stop(now + 0.2)
        break

      case 'correct':
        const notes = [523.25, 659.25, 783.99, 1046.5]
        notes.forEach((freq, i) => {
          const osc = audioContext.createOscillator()
          const gain = audioContext.createGain()
          osc.connect(gain)
          gain.connect(audioContext.destination)
          osc.frequency.value = freq
          gain.gain.setValueAtTime(0.2, now + i * 0.15)
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.2)
          osc.start(now + i * 0.15)
          osc.stop(now + i * 0.15 + 0.2)
        })
        break

      default:
        break
    }
  }

  // Start a new game
  const startGame = (diff) => {
    const level = DIFFICULTY_LEVELS[diff]
    const randomNum = Math.floor(Math.random() * (level.max - level.min + 1)) + level.min

    setDifficulty(diff)
    setSecretNumber(randomNum)
    setGuess('')
    setAttempts(0)
    setFeedback('')
    setGuessHistory([])
    setScreen('playing')
    playSound('click')
  }

  // Handle guess submission
  const handleGuess = () => {
    const num = parseInt(guess)

    if (isNaN(num)) {
      setFeedback('Please enter a valid number')
      playSound('wrong')
      return
    }

    const level = DIFFICULTY_LEVELS[difficulty]
    if (num < level.min || num > level.max) {
      setFeedback(`Please enter a number between ${level.min} and ${level.max}`)
      playSound('wrong')
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    setGuessHistory([...guessHistory, num])

    if (num === secretNumber) {
      setFeedback('🎉 You got it!')
      setShowConfetti(true)
      playSound('correct')
      setTimeout(() => setScreen('won'), 500)
    } else if (num < secretNumber) {
      setFeedback('📈 Too low! Guess higher')
      playSound('wrong')
    } else {
      setFeedback('📉 Too high! Guess lower')
      playSound('wrong')
    }

    setGuess('')
  }

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && guess.trim()) {
      handleGuess()
    }
  }

  // Reset game
  const resetGame = () => {
    setShowConfetti(false)
    startGame(difficulty)
  }

  // Home Screen
  if (screen === 'home') {
    return (
      <div className="gmn-container">
        <div className="gmn-card intro-card">
          <h1 className="gmn-title">Guess My Number</h1>
          <p className="gmn-subtitle">Test your guessing skills and find the secret number!</p>

          <div className="number-animation">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`number number-${i}`}>
                {Math.floor(Math.random() * 10)}
              </div>
            ))}
          </div>

          <p className="choose-difficulty">Choose a difficulty level:</p>
          <div className="difficulty-buttons">
            {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
              <button
                key={key}
                className="difficulty-btn"
                onClick={() => startGame(key)}
              >
                <div className="difficulty-name">{level.name}</div>
                <div className="difficulty-range">
                  {level.min}-{level.max}
                </div>
              </button>
            ))}
          </div>

          <button
            className="gmn-button help-button"
            onClick={() => setShowHowToPlay(true)}
          >
            <HelpCircle size={20} />
            How To Play
          </button>
        </div>
      </div>
    )
  }

  // Playing Screen
  if (screen === 'playing') {
    const level = DIFFICULTY_LEVELS[difficulty]
    return (
      <div className="gmn-container">
        {showConfetti && <canvas ref={confettiRef} className="confetti-canvas" />}

        <div className="gmn-card">
          <div className="gmn-header">
            <h2>Guess My Number</h2>
            <p className="range-info">
              Find a number between {level.min} and {level.max}
            </p>
          </div>

          <div className="attempt-counter">
            <div className="attempt-badge">
              <span className="attempt-label">Attempts</span>
              <span className="attempt-count">{attempts}</span>
            </div>
          </div>

          <div className="guess-input-section">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your guess..."
              className="guess-input"
              min={level.min}
              max={level.max}
              autoFocus
            />
            <button
              className="guess-button"
              onClick={handleGuess}
              disabled={!guess.trim()}
            >
              Guess
            </button>
          </div>

          {feedback && (
            <div className={`feedback ${feedback.includes('low') ? 'low' : feedback.includes('high') ? 'high' : 'correct'}`}>
              {feedback}
            </div>
          )}

          {guessHistory.length > 0 && (
            <div className="guess-history">
              <h3>Your Guesses</h3>
              <div className="history-list">
                {guessHistory.map((num, i) => (
                  <span key={i} className="history-item">
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="gmn-controls">
          <button
            className="gmn-button small"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button
            className="gmn-button small"
            onClick={() => navigate('/')}
            title="Back to Home"
          >
            ← Home
          </button>
        </div>
      </div>
    )
  }

  // Won Screen
  if (screen === 'won') {
    return (
      <div className="gmn-container">
        <div className="gmn-card result-card">
          <div className="gmn-header">
            <h2>🎉 You Won! 🎉</h2>
          </div>

          <div className="result-stats">
            <div className="stat-box">
              <span className="stat-label">Secret Number</span>
              <span className="stat-value">{secretNumber}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Attempts</span>
              <span className="stat-value">{attempts}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Difficulty</span>
              <span className="stat-value">{DIFFICULTY_LEVELS[difficulty].name}</span>
            </div>
          </div>

          <div className="performance-rating">
            {getPerformanceRating(attempts, DIFFICULTY_LEVELS[difficulty].max)}
          </div>

          <div className="button-group">
            <button className="gmn-button" onClick={resetGame}>
              <RotateCcw size={20} />
              Play Again
            </button>
            <button className="gmn-button secondary" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // How To Play Modal
  if (showHowToPlay) {
    return (
      <div className="gmn-overlay">
        <div className="modal-dialog">
          <h2>How To Play Guess My Number</h2>

          <div className="modal-content">
            <h3>Quick Overview</h3>
            <p>
              I'm thinking of a number within a specific range. Your goal is to guess it in as few attempts as possible.
              After each guess, I'll tell you if your number is too high, too low, or correct!
            </p>

            <h3>How To Play</h3>
            <ol>
              <li>Choose a difficulty level (Easy, Medium, Hard, or Extreme)</li>
              <li>I'll think of a random number in that range</li>
              <li>Enter your guess in the input field</li>
              <li>I'll tell you if it's too high or too low</li>
              <li>Use the feedback to narrow down your guesses</li>
              <li>Keep guessing until you find the number!</li>
            </ol>

            <h3>Difficulty Levels</h3>
            <ul>
              <li><strong>Easy:</strong> 1-50</li>
              <li><strong>Medium:</strong> 1-100</li>
              <li><strong>Hard:</strong> 1-500</li>
              <li><strong>Extreme:</strong> 1-1000</li>
            </ul>

            <h3>Tips</h3>
            <ul>
              <li>Use binary search: guess the middle of the remaining range</li>
              <li>Pay attention to the feedback</li>
              <li>The fewer attempts, the better your score!</li>
            </ul>
          </div>

          <button
            className="gmn-button"
            onClick={() => setShowHowToPlay(false)}
          >
            Got It!
          </button>
        </div>
      </div>
    )
  }
}

// Helper function to get performance rating
function getPerformanceRating(attempts, maxNumber) {
  const optimalAttempts = Math.ceil(Math.log2(maxNumber))

  if (attempts <= optimalAttempts) {
    return (
      <div className="rating excellent">
        <span className="rating-emoji">🌟</span>
        <span className="rating-text">Excellent! Optimal guessing!</span>
      </div>
    )
  } else if (attempts <= optimalAttempts + 3) {
    return (
      <div className="rating great">
        <span className="rating-emoji">⭐</span>
        <span className="rating-text">Great job! Well done!</span>
      </div>
    )
  } else if (attempts <= optimalAttempts + 6) {
    return (
      <div className="rating good">
        <span className="rating-emoji">👍</span>
        <span className="rating-text">Good effort!</span>
      </div>
    )
  } else {
    return (
      <div className="rating okay">
        <span className="rating-emoji">✨</span>
        <span className="rating-text">You got it! Try again for a better score.</span>
      </div>
    )
  }
}

export default GuessMyNumber
