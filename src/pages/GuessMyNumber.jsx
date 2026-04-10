import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Volume2, VolumeX, HelpCircle, RotateCcw, Users, Play } from 'lucide-react'
import '../styles/guessMyNumber.css'

const GuessMyNumber = () => {
  const navigate = useNavigate()

  // Game states
  const [screen, setScreen] = useState('home') // home, settings, playing, won, mp-setup, mp-p1-set, mp-handoff-p2-set, mp-p2-set, mp-handoff-game, mp-playing, mp-results, how-to-play
  const [gameMode, setGameMode] = useState('solo') // solo or multiplayer
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Solo game state
  const [difficulty, setDifficulty] = useState('medium')
  const [customMin, setCustomMin] = useState(1)
  const [customMax, setCustomMax] = useState(100)
  const [secretNumber, setSecretNumber] = useState(0)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [guessHistory, setGuessHistory] = useState([])

  // Multiplayer state
  const [mpMode, setMpMode] = useState('random') // random or players-choose
  const [p1Name, setP1Name] = useState('Player 1')
  const [p2Name, setP2Name] = useState('Player 2')
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [p1Secret, setP1Secret] = useState(0)
  const [p2Secret, setP2Secret] = useState(0)
  const [p1Guess, setP1Guess] = useState('')
  const [p2Guess, setP2Guess] = useState('')
  const [p1Attempts, setP1Attempts] = useState(0)
  const [p2Attempts, setP2Attempts] = useState(0)
  const [p1History, setP1History] = useState([])
  const [p2History, setP2History] = useState([])
  const [p1Feedback, setP1Feedback] = useState('')
  const [p2Feedback, setP2Feedback] = useState('')
  const [p1Won, setP1Won] = useState(false)
  const [p2Won, setP2Won] = useState(false)
  const [mpSetNumber, setMpSetNumber] = useState('')
  const [mpNumberRange, setMpNumberRange] = useState({ min: 1, max: 100 })
  const [currentMpDifficulty, setCurrentMpDifficulty] = useState('medium')

  const [showConfetti, setShowConfetti] = useState(false)
  const confettiRef = useRef(null)

  // High scores state
  const [highScores, setHighScores] = useState([])

  // Load high scores on mount
  useEffect(() => {
    loadHighScores()
  }, [])

  // Game configurations
  const DIFFICULTY_RANGES = {
    easy: { min: 1, max: 50, name: 'Easy' },
    medium: { min: 1, max: 100, name: 'Medium' },
    hard: { min: 1, max: 1000, name: 'Hard' }
  }

  // Sound effects
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

  // High score functions
  const loadHighScores = () => {
    try {
      const scores = JSON.parse(localStorage.getItem('guessMyNumber_highScores') || '[]')
      setHighScores(scores)
    } catch {
      setHighScores([])
    }
  }

  const saveHighScore = (difficulty, range, attempts) => {
    const score = {
      difficulty,
      range,
      attempts,
      date: new Date().toLocaleDateString()
    }
    const scores = [...highScores, score]
    scores.sort((a, b) => a.attempts - b.attempts)
    const topScores = scores.slice(0, 20)
    setHighScores(topScores)
    localStorage.setItem('guessMyNumber_highScores', JSON.stringify(topScores))
  }

  // Solo game functions
  const startSoloGame = (diff) => {
    const range = difficulty === 'custom' ? { min: customMin, max: customMax } : DIFFICULTY_RANGES[diff]
    const randomNum = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min

    setDifficulty(diff)
    setSecretNumber(randomNum)
    setGuess('')
    setAttempts(0)
    setFeedback('')
    setGuessHistory([])
    setShowSettings(false)
    setScreen('playing')
    playSound('click')
  }

  const handleSoloGuess = () => {
    const range = difficulty === 'custom' ? { min: customMin, max: customMax } : DIFFICULTY_RANGES[difficulty]
    const num = parseInt(guess)

    if (isNaN(num)) {
      setFeedback('Please enter a valid number')
      playSound('wrong')
      return
    }

    if (num < range.min || num > range.max) {
      setFeedback(`Please enter a number between ${range.min} and ${range.max}`)
      playSound('wrong')
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    setGuessHistory([...guessHistory, { value: num, result: num === secretNumber ? 'correct' : num < secretNumber ? 'low' : 'high' }])

    if (num === secretNumber) {
      setFeedback('🎉 You got it!')
      setShowConfetti(true)
      playSound('correct')

      const rangeStr = `${range.min}–${range.max}`
      saveHighScore(difficulty, rangeStr, newAttempts)

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

  // Multiplayer game functions
  const startMultiplayer = () => {
    setGameMode('multiplayer')
    setScreen('mp-setup')
  }

  const startMultiplayerGame = (mode, difficulty) => {
    const range = DIFFICULTY_RANGES[difficulty]
    setCurrentMpDifficulty(difficulty)
    setMpNumberRange(range)
    setMpMode(mode)

    if (mode === 'random') {
      const randomNum = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
      setP1Secret(randomNum)
      setP2Secret(randomNum)
      setScreen('mp-playing')
      setCurrentPlayer(1)
    } else {
      // Players choose mode
      setScreen('mp-p1-set')
    }
  }

  const handleP1SetNumber = () => {
    const num = parseInt(mpSetNumber)
    if (isNaN(num) || num < mpNumberRange.min || num > mpNumberRange.max) {
      alert(`Please enter a valid number between ${mpNumberRange.min} and ${mpNumberRange.max}`)
      return
    }
    setP1Secret(num)
    setMpSetNumber('')
    setScreen('mp-handoff-p2-set')
  }

  const handleP2SetNumber = () => {
    const num = parseInt(mpSetNumber)
    if (isNaN(num) || num < mpNumberRange.min || num > mpNumberRange.max) {
      alert(`Please enter a valid number between ${mpNumberRange.min} and ${mpNumberRange.max}`)
      return
    }
    setP2Secret(num)
    setMpSetNumber('')
    setScreen('mp-handoff-game')
  }

  const handleMultiplayerGuess = (playerNum, guestValue) => {
    const currentGuess = playerNum === 1 ? p1Guess : p2Guess
    const secretNum = playerNum === 1 ? p2Secret : p1Secret
    const currentAttempts = playerNum === 1 ? p1Attempts : p2Attempts
    const currentHistory = playerNum === 1 ? p1History : p2History
    const otherPlayerWon = playerNum === 1 ? p2Won : p1Won

    const num = parseInt(currentGuess)

    if (isNaN(num) || num < mpNumberRange.min || num > mpNumberRange.max) {
      const feedbackMsg = `Please enter a number between ${mpNumberRange.min} and ${mpNumberRange.max}`
      if (playerNum === 1) {
        setP1Feedback(feedbackMsg)
      } else {
        setP2Feedback(feedbackMsg)
      }
      playSound('wrong')
      return
    }

    const newAttempts = currentAttempts + 1
    const newHistory = [...currentHistory, { value: num, result: num === secretNum ? 'correct' : num < secretNum ? 'low' : 'high' }]

    if (playerNum === 1) {
      setP1Attempts(newAttempts)
      setP1History(newHistory)
    } else {
      setP2Attempts(newAttempts)
      setP2History(newHistory)
    }

    if (num === secretNum) {
      const feedbackMsg = '🎉 You got it!'
      if (playerNum === 1) {
        setP1Feedback(feedbackMsg)
        setP1Won(true)
      } else {
        setP2Feedback(feedbackMsg)
        setP2Won(true)
      }
      playSound('correct')

      // If both players have guessed, show results
      if (otherPlayerWon || screen === 'mp-results') {
        setTimeout(() => setScreen('mp-results'), 500)
      }
    } else if (num < secretNum) {
      const feedbackMsg = '📈 Too low! Guess higher'
      if (playerNum === 1) {
        setP1Feedback(feedbackMsg)
      } else {
        setP2Feedback(feedbackMsg)
      }
      playSound('wrong')
    } else {
      const feedbackMsg = '📉 Too high! Guess lower'
      if (playerNum === 1) {
        setP1Feedback(feedbackMsg)
      } else {
        setP2Feedback(feedbackMsg)
      }
      playSound('wrong')
    }

    if (playerNum === 1) {
      setP1Guess('')
    } else {
      setP2Guess('')
    }
  }

  const resetGame = () => {
    setShowConfetti(false)
    if (gameMode === 'solo') {
      startSoloGame(difficulty)
    } else {
      startMultiplayer()
    }
  }

  const goHome = () => {
    setShowConfetti(false)
    setGameMode('solo')
    setScreen('home')
    setP1Won(false)
    setP2Won(false)
    setP1Attempts(0)
    setP2Attempts(0)
    setP1History([])
    setP2History([])
  }

  // ========== RENDER SCREENS ==========

  // HOME SCREEN
  if (screen === 'home') {
    return (
      <div className="gmn-container">
        <div className="gmn-card intro-card">
          <div className="floating-numbers">
            {[7, 42, 99, 13].map((num, i) => (
              <div key={i} className={`floating-number num-${i}`}>{num}</div>
            ))}
          </div>

          <h1 className="gmn-title">My Number Is?</h1>
          <p className="gmn-subtitle">Test your logic and guessing skills</p>

          <div className="home-buttons">
            <button
              className="home-btn solo-btn"
              onClick={() => setShowSettings(true)}
            >
              <Play size={24} />
              <span>Solo Game</span>
              <small>Play Against the Game</small>
            </button>

            <button
              className="home-btn multiplayer-btn"
              onClick={startMultiplayer}
            >
              <Users size={24} />
              <span>Multiplayer</span>
              <small>Play Against Friend</small>
            </button>
          </div>

          <div className="home-footer-buttons">
            <button
              className="gmn-button help-button"
              onClick={() => setShowHowToPlay(true)}
            >
              <HelpCircle size={20} />
              How To Play
            </button>

            <button
              className="gmn-button"
              onClick={() => navigate('/')}
            >
              ← Back Home
            </button>
          </div>

          <div className="high-scores-preview">
            <h3>Top 5 High Scores</h3>
            {highScores.slice(0, 5).map((score, i) => (
              <div key={i} className="score-item">
                <span>{i + 1}.</span>
                <span>{score.difficulty} ({score.range})</span>
                <span className="attempts">{score.attempts} attempts</span>
              </div>
            ))}
            {highScores.length === 0 && <p className="no-scores">No scores yet. Play to set a new high score!</p>}
          </div>
        </div>
      </div>
    )
  }

  // SETTINGS MODAL
  if (showSettings && screen === 'home') {
    return (
      <div className="gmn-container">
        <div className="gmn-overlay">
          <div className="modal-dialog settings-modal">
            <h2>Game Settings</h2>
            <p>Choose your difficulty level:</p>

            <div className="difficulty-grid">
              {Object.entries(DIFFICULTY_RANGES).map(([key, level]) => (
                <button
                  key={key}
                  className={`difficulty-card ${difficulty === key ? 'active' : ''}`}
                  onClick={() => setDifficulty(key)}
                >
                  <div className="difficulty-name">{level.name}</div>
                  <div className="difficulty-range">{level.min}-{level.max}</div>
                </button>
              ))}
            </div>

            <div className="button-group">
              <button
                className="gmn-button start-btn"
                onClick={() => {
                  startSoloGame(difficulty)
                }}
              >
                Start Game
              </button>
              <button
                className="gmn-button secondary"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // PLAYING SCREEN (SOLO)
  if (screen === 'playing') {
    const range = difficulty === 'custom' ? { min: customMin, max: customMax } : DIFFICULTY_RANGES[difficulty]
    return (
      <div className="gmn-container">
        {showConfetti && <canvas ref={confettiRef} className="confetti-canvas" />}

        <div className="gmn-card">
          <div className="gmn-header">
            <h2>Guess My Number</h2>
            <p className="range-info">Find a number between {range.min} and {range.max}</p>
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
              onKeyPress={(e) => e.key === 'Enter' && guess.trim() && handleSoloGuess()}
              placeholder="Enter your guess..."
              className="guess-input"
              min={range.min}
              max={range.max}
              autoFocus
            />
            <button
              className="guess-button"
              onClick={handleSoloGuess}
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
                {guessHistory.map((item, i) => (
                  <span key={i} className={`history-item ${item.result}`} title={item.result}>
                    {item.value}
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
          <button className="gmn-button small" onClick={goHome} title="Back to Home">
            ← Home
          </button>
        </div>
      </div>
    )
  }

  // WON SCREEN (SOLO)
  if (screen === 'won') {
    const range = difficulty === 'custom' ? { min: customMin, max: customMax } : DIFFICULTY_RANGES[difficulty]
    const optimalAttempts = Math.ceil(Math.log2(range.max - range.min + 1))
    let rating = 'Keep Trying'
    let emoji = '✨'

    if (attempts <= optimalAttempts) {
      rating = 'Excellent! Optimal!'
      emoji = '🌟'
    } else if (attempts <= optimalAttempts + 3) {
      rating = 'Great Job!'
      emoji = '⭐'
    } else if (attempts <= optimalAttempts + 6) {
      rating = 'Good Effort!'
      emoji = '👍'
    }

    return (
      <div className="gmn-container">
        <div className="gmn-card result-card">
          <div className="gmn-header">
            <h2>{emoji} You Won! {emoji}</h2>
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
              <span className="stat-value">{difficulty.toUpperCase()}</span>
            </div>
          </div>

          <div className={`performance-rating ${attempts <= optimalAttempts ? 'excellent' : attempts <= optimalAttempts + 3 ? 'great' : attempts <= optimalAttempts + 6 ? 'good' : 'okay'}`}>
            {emoji} {rating}
          </div>

          <div className="button-group">
            <button className="gmn-button" onClick={resetGame}>
              <RotateCcw size={20} />
              Play Again
            </button>
            <button className="gmn-button secondary" onClick={goHome}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // MULTIPLAYER SETUP
  if (screen === 'mp-setup') {
    return (
      <div className="gmn-container">
        <div className="gmn-card">
          <h2>Multiplayer Setup</h2>

          <div className="mp-section">
            <label>Player 1 Name:</label>
            <input
              type="text"
              value={p1Name}
              onChange={(e) => setP1Name(e.target.value)}
              placeholder="Player 1"
              className="mp-input"
            />

            <label>Player 2 Name:</label>
            <input
              type="text"
              value={p2Name}
              onChange={(e) => setP2Name(e.target.value)}
              placeholder="Player 2"
              className="mp-input"
            />

            <label>Game Mode:</label>
            <div className="mode-buttons">
              <button
                className={`mode-btn ${mpMode === 'random' ? 'active' : ''}`}
                onClick={() => setMpMode('random')}
              >
                Random Number
              </button>
              <button
                className={`mode-btn ${mpMode === 'players-choose' ? 'active' : ''}`}
                onClick={() => setMpMode('players-choose')}
              >
                Players Choose
              </button>
            </div>

            <label>Difficulty:</label>
            <div className="difficulty-grid">
              {Object.entries(DIFFICULTY_RANGES).map(([key, level]) => (
                <button
                  key={key}
                  className={`difficulty-card ${currentMpDifficulty === key ? 'active' : ''}`}
                  onClick={() => setCurrentMpDifficulty(key)}
                >
                  <div className="difficulty-name">{level.name}</div>
                  <div className="difficulty-range">{level.min}-{level.max}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="button-group">
            <button
              className="gmn-button"
              onClick={() => startMultiplayerGame(mpMode, currentMpDifficulty)}
            >
              Start Game
            </button>
            <button className="gmn-button secondary" onClick={goHome}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  // PLAYER 1 SET NUMBER
  if (screen === 'mp-p1-set') {
    return (
      <div className="gmn-container">
        <div className="gmn-card">
          <h2>{p1Name}, Set Your Secret Number</h2>
          <p className="subtitle">Choose a number between {mpNumberRange.min} and {mpNumberRange.max}</p>

          <div className="mp-set-section">
            <input
              type="number"
              value={mpSetNumber}
              onChange={(e) => setMpSetNumber(e.target.value)}
              placeholder={`Enter a number between ${mpNumberRange.min}-${mpNumberRange.max}`}
              className="mp-input"
              min={mpNumberRange.min}
              max={mpNumberRange.max}
              autoFocus
            />
          </div>

          <div className="button-group">
            <button
              className="gmn-button"
              onClick={handleP1SetNumber}
              disabled={!mpSetNumber}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }

  // HANDOFF TO PLAYER 2 SET
  if (screen === 'mp-handoff-p2-set') {
    return (
      <div className="gmn-container">
        <div className="gmn-card handoff-card">
          <h2>Hand Device to {p2Name}</h2>
          <p>Pass the device to Player 2 to set their number</p>
          <button
            className="gmn-button large"
            onClick={() => setScreen('mp-p2-set')}
          >
            Ready →
          </button>
        </div>
      </div>
    )
  }

  // PLAYER 2 SET NUMBER
  if (screen === 'mp-p2-set') {
    return (
      <div className="gmn-container">
        <div className="gmn-card">
          <h2>{p2Name}, Set Your Secret Number</h2>
          <p className="subtitle">Choose a number between {mpNumberRange.min} and {mpNumberRange.max}</p>

          <div className="mp-set-section">
            <input
              type="number"
              value={mpSetNumber}
              onChange={(e) => setMpSetNumber(e.target.value)}
              placeholder={`Enter a number between ${mpNumberRange.min}-${mpNumberRange.max}`}
              className="mp-input"
              min={mpNumberRange.min}
              max={mpNumberRange.max}
              autoFocus
            />
          </div>

          <div className="button-group">
            <button
              className="gmn-button"
              onClick={handleP2SetNumber}
              disabled={!mpSetNumber}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }

  // HANDOFF TO GAME
  if (screen === 'mp-handoff-game') {
    return (
      <div className="gmn-container">
        <div className="gmn-card handoff-card">
          <h2>Hand Device to {p1Name}</h2>
          <p>Game is ready. Pass the device to Player 1 to start playing</p>
          <button
            className="gmn-button large"
            onClick={() => {
              setScreen('mp-playing')
              setCurrentPlayer(1)
            }}
          >
            Start Game →
          </button>
        </div>
      </div>
    )
  }

  // MULTIPLAYER PLAYING
  if (screen === 'mp-playing') {
    const currentPlayerName = currentPlayer === 1 ? p2Name : p1Name // Confusing but correct - P1 guesses P2's number
    const currentGuess = currentPlayer === 1 ? p1Guess : p2Guess
    const currentAttempts = currentPlayer === 1 ? p1Attempts : p2Attempts
    const currentHistory = currentPlayer === 1 ? p1History : p2History
    const currentFeedback = currentPlayer === 1 ? p1Feedback : p2Feedback

    return (
      <div className="gmn-container">
        <div className="gmn-card">
          <div className="gmn-header">
            <h2>Multiplayer Game</h2>
            <p className="current-player">{currentPlayer === 1 ? p1Name : p2Name}'s Turn</p>
            <p className="range-info">Find a number between {mpNumberRange.min} and {mpNumberRange.max}</p>
          </div>

          <div className="attempt-counter">
            <div className="attempt-badge">
              <span className="attempt-label">Attempts</span>
              <span className="attempt-count">{currentAttempts}</span>
            </div>
          </div>

          <div className="guess-input-section">
            <input
              type="number"
              value={currentGuess}
              onChange={(e) => {
                if (currentPlayer === 1) setP1Guess(e.target.value)
                else setP2Guess(e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && currentGuess.trim()) {
                  handleMultiplayerGuess(currentPlayer)
                }
              }}
              placeholder="Enter your guess..."
              className="guess-input"
              min={mpNumberRange.min}
              max={mpNumberRange.max}
              autoFocus
            />
            <button
              className="guess-button"
              onClick={() => handleMultiplayerGuess(currentPlayer)}
              disabled={!currentGuess.trim()}
            >
              Guess
            </button>
          </div>

          {currentFeedback && (
            <div className={`feedback ${currentFeedback.includes('low') ? 'low' : currentFeedback.includes('high') ? 'high' : 'correct'}`}>
              {currentFeedback}
            </div>
          )}

          {currentHistory.length > 0 && (
            <div className="guess-history">
              <h3>Guesses</h3>
              <div className="history-list">
                {currentHistory.map((item, i) => (
                  <span key={i} className={`history-item ${item.result}`} title={item.result}>
                    {item.value}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(p1Won || p2Won) && (
            <div className="button-group">
              <button
                className="gmn-button"
                onClick={() => {
                  setShowConfetti(true)
                  setTimeout(() => setScreen('mp-results'), 500)
                }}
              >
                See Results
              </button>
            </div>
          )}
        </div>

        <div className="gmn-controls">
          <button
            className="gmn-button small"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>
    )
  }

  // MULTIPLAYER RESULTS
  if (screen === 'mp-results') {
    const p1Winner = p1Attempts < p2Attempts && p1Won
    const p2Winner = p2Attempts < p1Attempts && p2Won
    const isTie = p1Attempts === p2Attempts && p1Won && p2Won

    return (
      <div className="gmn-container">
        {showConfetti && <canvas ref={confettiRef} className="confetti-canvas" />}

        <div className="gmn-card result-card">
          <div className="gmn-header">
            <h2>🎉 Game Over! 🎉</h2>
          </div>

          <div className="mp-results">
            <div className={`player-result ${p1Winner ? 'winner' : ''}`}>
              <h3>{p1Name}</h3>
              <div className="result-stat">
                <span className="label">Attempts</span>
                <span className="value">{p1Attempts}</span>
              </div>
              <div className="result-stat">
                <span className="label">Secret Number</span>
                <span className="value">{p2Secret}</span>
              </div>
              {p1Winner && <div className="winner-badge">🏆 Winner!</div>}
            </div>

            <div className="vs">VS</div>

            <div className={`player-result ${p2Winner ? 'winner' : ''}`}>
              <h3>{p2Name}</h3>
              <div className="result-stat">
                <span className="label">Attempts</span>
                <span className="value">{p2Attempts}</span>
              </div>
              <div className="result-stat">
                <span className="label">Secret Number</span>
                <span className="value">{p1Secret}</span>
              </div>
              {p2Winner && <div className="winner-badge">🏆 Winner!</div>}
            </div>
          </div>

          {isTie && <div className="tie-message">🤝 It's a Tie!</div>}

          <div className="button-group">
            <button className="gmn-button" onClick={goHome}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // HOW TO PLAY MODAL
  if (showHowToPlay) {
    return (
      <div className="gmn-container">
        <div className="gmn-overlay">
          <div className="modal-dialog how-to-play-modal">
            <button
              className="modal-close"
              onClick={() => setShowHowToPlay(false)}
            >
              ✕
            </button>

            <h2>How To Play</h2>

            <div className="modal-section">
              <h3>Solo Mode</h3>
              <p>
                I think of a number within a range, and you have to guess it! After each guess, I tell you if your number is too high or too low. Use binary search strategy to find it in the fewest attempts!
              </p>

              <h4>Steps:</h4>
              <ol>
                <li>Choose your difficulty (Easy: 1-50, Medium: 1-100, Hard: 1-1000)</li>
                <li>I think of a random number in that range</li>
                <li>Enter your guess and click Guess (or press Enter)</li>
                <li>I tell you if it's too high or too low</li>
                <li>Use the feedback to narrow down your guesses</li>
                <li>Keep guessing until you find the number!</li>
              </ol>

              <h4>Strategy Tip:</h4>
              <p>Use binary search! Always guess the middle of the remaining range. This finds any number in the minimum attempts.</p>
            </div>

            <div className="modal-section">
              <h3>Multiplayer Mode</h3>
              <p>
                Play against a friend! Both players take turns guessing each other's secret numbers. The player with the fewest attempts wins!
              </p>

              <h4>Two Game Modes:</h4>
              <ul>
                <li><strong>Random Number:</strong> Both players guess the same random number</li>
                <li><strong>Players Choose:</strong> Each player sets a secret number for the other to guess</li>
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
      </div>
    )
  }

  return null
}

export default GuessMyNumber
