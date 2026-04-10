import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Settings, Volume2, VolumeX, Undo2, Plus, X } from 'lucide-react'
import '../styles/glowCrack.css'
import {
  createGameState,
  submitGuess,
  updateGuess,
  removePeg,
  undoLastGuess,
  calculateStats,
  formatGameForStorage,
  DIFFICULTY_PRESETS
} from '../utils/mastermindGame'
import { THEME_NAMES, getTheme } from '../utils/mastermindThemes'
import MastermindConfetti from '../components/MastermindConfetti'

function GlowCrack() {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState(null)
  const [menuOpen, setMenuOpen] = useState(true)
  const [difficulty, setDifficulty] = useState('classic')
  const [theme, setTheme] = useState('neon-glow')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showVictory, setShowVictory] = useState(false)
  const [showDefeat, setShowDefeat] = useState(false)
  const [selectedColorIndex, setSelectedColorIndex] = useState(null)
  const [stats, setStats] = useState(null)
  const [gameHistory, setGameHistory] = useState([])
  const [startTime, setStartTime] = useState(null)
  const confettiRef = useRef(null)

  const themeData = getTheme(theme)

  // Load game history on mount
  useEffect(() => {
    const saved = localStorage.getItem('mastermindHistory')
    if (saved) {
      setGameHistory(JSON.parse(saved))
    }
  }, [])

  // Initialize game
  const startGame = () => {
    const newGame = createGameState(difficulty)
    setGameState(newGame)
    setMenuOpen(false)
    setShowVictory(false)
    setShowDefeat(false)
    setSelectedColorIndex(null)
    setStats(null)
    setStartTime(Date.now())
  }

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    if (type === 'peg') {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = 800 + Math.random() * 400
      gain.gain.setValueAtTime(0.2, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      osc.start(audioContext.currentTime)
      osc.stop(audioContext.currentTime + 0.1)
    } else if (type === 'submit') {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = 1000
      gain.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
      osc.start(audioContext.currentTime)
      osc.stop(audioContext.currentTime + 0.15)
    } else if (type === 'victory') {
      const notes = [523, 659, 784, 1047]
      notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()
        osc.connect(gain)
        gain.connect(audioContext.destination)
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.2)
        osc.start(audioContext.currentTime + i * 0.1)
        osc.stop(audioContext.currentTime + i * 0.1 + 0.2)
      })
    }
  }

  // Handle peg click
  const handlePegClick = (position) => {
    if (!gameState || gameState.gameOver) return

    if (selectedColorIndex === null) return

    const color = gameState.colorPalette[selectedColorIndex]
    const newGame = updateGuess(gameState, position, color)
    setGameState(newGame)
    playSound('peg')
  }

  // Handle peg removal
  const handleRemovePeg = (position) => {
    if (!gameState || gameState.gameOver) return

    const newGame = removePeg(gameState, position)
    setGameState(newGame)
  }

  // Handle submit guess
  const handleSubmitGuess = () => {
    if (!gameState || gameState.gameOver) return

    const result = submitGuess(gameState)

    if (!result.success) {
      return
    }

    playSound('submit')
    setGameState(result.gameState)

    if (result.isWin) {
      setTimeout(() => {
        const gameStats = calculateStats(result.gameState)
        setStats(gameStats)
        setShowVictory(true)

        // Save to history
        const game = formatGameForStorage(result.gameState, startTime)
        const newHistory = [game, ...gameHistory]
        setGameHistory(newHistory)
        localStorage.setItem('mastermindHistory', JSON.stringify(newHistory))

        playSound('victory')
        if (confettiRef.current) {
          confettiRef.current.burst(gameState.colorPalette, 100)
        }
      }, 500)
    } else if (result.isGameOver) {
      setTimeout(() => {
        const gameStats = calculateStats(result.gameState)
        setStats(gameStats)
        setShowDefeat(true)

        // Save to history
        const game = formatGameForStorage(result.gameState, startTime)
        const newHistory = [game, ...gameHistory]
        setGameHistory(newHistory)
        localStorage.setItem('mastermindHistory', JSON.stringify(newHistory))
      }, 500)
    }
  }

  // Handle undo
  const handleUndo = () => {
    if (!gameState || gameState.guesses.length === 0) return

    const newGame = undoLastGuess(gameState)
    setGameState(newGame)
  }

  // Handle reset
  const handleReset = () => {
    startGame()
  }

  // Render game board
  const renderGameBoard = () => {
    if (!gameState) return null

    return (
      <div className="mastermind-board">
        {/* Previous guesses */}
        <div className="guesses-container">
          {gameState.guesses.map((row, idx) => (
            <div key={idx} className="guess-row">
              <div className="pegs-section">
                {row.guess.map((color, pegIdx) => (
                  <div
                    key={pegIdx}
                    className="peg display-peg"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 12px ${color}80`
                    }}
                  />
                ))}
              </div>
              <div className="feedback-section">
                {row.feedback.map((feedback, feedIdx) => (
                  <div
                    key={feedIdx}
                    className={`feedback-peg ${feedback}`}
                    style={{
                      backgroundColor: feedback === 'black' ? themeData.feedbackBlack : themeData.feedbackWhite,
                      border: `1px solid ${feedback === 'black' ? '#333' : '#999'}`
                    }}
                  />
                ))}
                {row.feedback.length < 4 && (
                  <>
                    {Array(4 - row.feedback.length)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="feedback-peg empty" />
                      ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Current guess */}
        {!gameState.gameOver && (
          <div className="current-guess-section">
            <div className="guess-row current">
              <div className="pegs-section">
                {gameState.currentGuess.map((color, idx) => (
                  <div
                    key={idx}
                    className="peg current-peg"
                    style={{
                      backgroundColor: color || 'transparent',
                      boxShadow: color ? `0 0 15px ${color}80` : 'none',
                      cursor: 'pointer',
                      border: color ? 'none' : '2px dashed rgba(255,255,255,0.3)'
                    }}
                    onClick={() => handleRemovePeg(idx)}
                  >
                    {!color && <Plus size={16} />}
                  </div>
                ))}
              </div>
              <div className="feedback-section" style={{ opacity: 0.3 }}>
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="feedback-peg empty" />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Color palette */}
        {!gameState.gameOver && (
          <div className="color-palette">
            <p className="palette-label">Select color:</p>
            <div className="colors-grid">
              {gameState.colorPalette.map((color, idx) => (
                <div
                  key={idx}
                  className={`color-option ${selectedColorIndex === idx ? 'selected' : ''}`}
                  style={{
                    backgroundColor: color,
                    boxShadow:
                      selectedColorIndex === idx
                        ? `0 0 20px ${color}, 0 0 40px ${color}80`
                        : `0 0 8px ${color}40`,
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedColorIndex(selectedColorIndex === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        {!gameState.gameOver && (
          <div className="game-controls">
            <button
              className="submit-btn"
              onClick={handleSubmitGuess}
              disabled={gameState.currentGuess.some(p => p === null)}
              style={{
                background:
                  gameState.currentGuess.some(p => p === null) ? 'rgba(0,255,136,0.3)' : themeData.buttonBg,
                cursor: gameState.currentGuess.some(p => p === null) ? 'not-allowed' : 'pointer'
              }}
            >
              Submit Guess ({gameState.guesses.length + 1}/{gameState.maxGuesses})
            </button>
          </div>
        )}
      </div>
    )
  }

  if (!gameState || menuOpen) {
    return (
      <div className={`mastermind-menu bg-gradient-to-br ${themeData.bg}`}>
        <div className="menu-container">
          <div className="menu-header">
            <button onClick={() => navigate('/')} className="back-btn">
              <ArrowLeft size={24} />
            </button>
          </div>

          <div className="menu-content">
            <h1 className="menu-title" style={{ color: themeData.accentColor }}>
              🔐 GlowCrack 🔐
            </h1>
            <p className="menu-subtitle">Crack the Secret Code</p>

            <div className="menu-section">
              <h2>Difficulty</h2>
              <div className="button-group">
                {Object.entries(DIFFICULTY_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    className={`difficulty-btn ${difficulty === key ? 'active' : ''}`}
                    onClick={() => setDifficulty(key)}
                    style={difficulty === key ? { borderColor: themeData.accentColor } : {}}
                  >
                    {preset.name}
                    <span className="difficulty-info">
                      {preset.pegs}P • {preset.colors}C
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="menu-section">
              <h2>Theme</h2>
              <div className="theme-grid">
                {THEME_NAMES.map((themeName) => (
                  <button
                    key={themeName}
                    className={`theme-btn ${theme === themeName ? 'active' : ''}`}
                    onClick={() => setTheme(themeName)}
                    title={getTheme(themeName).name}
                    style={{
                      background: getTheme(themeName).buttonBg
                    }}
                  >
                    {theme === themeName && '✓'}
                  </button>
                ))}
              </div>
              <p className="theme-name">{getTheme(theme).name}</p>
            </div>

            {gameHistory.length > 0 && (
              <div className="menu-section">
                <h2>Stats</h2>
                <div className="stats-display">
                  <div className="stat-item">
                    <span className="stat-label">Games Played:</span>
                    <span className="stat-value">{gameHistory.length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Won:</span>
                    <span className="stat-value">{gameHistory.filter(g => g.won).length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Win Rate:</span>
                    <span className="stat-value">
                      {gameHistory.length > 0
                        ? Math.round((gameHistory.filter(g => g.won).length / gameHistory.length) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button className="play-btn" onClick={startGame} style={{ background: themeData.buttonBg }}>
              🎮 Start Game
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`mastermind-game bg-gradient-to-br ${themeData.bg}`}>
      <div className="game-container">
        {/* Header */}
        <div className="game-header">
          <button onClick={() => navigate('/')} className="back-btn">
            <ArrowLeft size={24} />
          </button>

          <div className="game-title">
            <h1 style={{ color: themeData.accentColor }}>🔐 GlowCrack</h1>
            <p className="guess-counter">Guess {gameState.guesses.length + 1} of {gameState.maxGuesses}</p>
          </div>

          <div className="header-controls">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="control-btn"
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={handleUndo}
              className="control-btn"
              title="Undo"
              disabled={gameState.guesses.length === 0}
            >
              <Undo2 size={20} />
            </button>
            <button onClick={handleReset} className="control-btn" title="Reset">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Game Board */}
        {renderGameBoard()}

        {/* Victory Screen */}
        {showVictory && (
          <div className="victory-overlay">
            <div className="victory-content">
              <h1 className="victory-title">🎉 Code Cracked! 🎉</h1>
              <p className="victory-message">
                Solved in <span className="highlight">{stats.guessCount}</span> guess
                {stats.guessCount !== 1 ? 'es' : ''}!
              </p>
              <div className="secret-code-display">
                {gameState.secretCode.map((color, idx) => (
                  <div
                    key={idx}
                    className="secret-peg"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 20px ${color}`
                    }}
                  />
                ))}
              </div>
              <div className="victory-buttons">
                <button onClick={handleReset} className="victory-btn" style={{ background: themeData.buttonBg }}>
                  Play Again
                </button>
                <button onClick={() => setMenuOpen(true)} className="victory-btn" style={{ background: themeData.buttonBg }}>
                  Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Defeat Screen */}
        {showDefeat && (
          <div className="victory-overlay defeat">
            <div className="victory-content">
              <h1 className="defeat-title">💔 Code Not Cracked</h1>
              <p className="defeat-message">The secret code was:</p>
              <div className="secret-code-display">
                {gameState.secretCode.map((color, idx) => (
                  <div
                    key={idx}
                    className="secret-peg"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 20px ${color}`
                    }}
                  />
                ))}
              </div>
              <p className="defeat-message">You made {gameState.guesses.length} guesses</p>
              <div className="victory-buttons">
                <button onClick={handleReset} className="victory-btn" style={{ background: themeData.buttonBg }}>
                  Try Again
                </button>
                <button onClick={() => setMenuOpen(true)} className="victory-btn" style={{ background: themeData.buttonBg }}>
                  Menu
                </button>
              </div>
            </div>
          </div>
        )}

        <MastermindConfetti ref={confettiRef} theme={themeData} />
      </div>
    </div>
  )
}

export default GlowCrack
