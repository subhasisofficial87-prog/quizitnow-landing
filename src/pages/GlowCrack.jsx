import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Settings, Volume2, VolumeX, Undo2, Plus, X, HelpCircle } from 'lucide-react'
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
  const [showHowToPlay, setShowHowToPlay] = useState(false)
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

  // Render menu or game screen
  const mainContent = !gameState || menuOpen ? (
    <div className={`mastermind-menu bg-gradient-to-br ${themeData.bg}`}>
      <div className="menu-container">
        <div className="menu-header">
          <button onClick={() => navigate('/')} className="back-btn">
            <ArrowLeft size={24} />
          </button>
          <button onClick={() => setShowHowToPlay(true)} className="how-to-play-btn" title="How To Play">
            <HelpCircle size={24} />
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
  ) : (
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
              onClick={() => setShowHowToPlay(true)}
              className="control-btn"
              title="How To Play"
            >
              <HelpCircle size={20} />
            </button>
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

  // Return main content with modal overlay
  return (
    <>
      {mainContent}

      {/* How To Play Modal */}
      {showHowToPlay && (
        <div className="how-to-play-overlay">
          <div className="how-to-play-modal" style={{ borderColor: themeData.accentColor }}>
            <button
              onClick={() => setShowHowToPlay(false)}
              className="modal-close-btn"
              style={{ color: themeData.accentColor }}
            >
              <X size={28} />
            </button>

            <h2 className="modal-title" style={{ color: themeData.accentColor }}>
              🎮 How To Play GlowCrack
            </h2>

            <div className="modal-content">
              <div className="instruction-section">
                <h3 className="section-title" style={{ color: themeData.textColor }}>
                  The Objective
                </h3>
                <p style={{ color: themeData.textColor }}>
                  GlowCrack is a code-breaking game where you must guess the secret code within a limited number of attempts. Each code consists of colored pegs in a specific sequence. After each guess, you receive feedback—black pegs indicate a color in the correct position, while white pegs show you have the right color but in the wrong spot. Use this feedback strategically to crack the code before your guesses run out!
                </p>
              </div>

              <div className="instruction-section">
                <h3 className="section-title" style={{ color: themeData.textColor }}>
                  Step-by-Step Guide
                </h3>
                <ol className="steps-list" style={{ color: themeData.textColor }}>
                  <li><strong>Choose Your Game:</strong> Select a difficulty level (Easy, Classic, Medium, Hard, Expert) that determines the number of pegs and available colors. More pegs and colors mean harder challenges!</li>
                  <li><strong>Select a Color:</strong> Click on any color in the color palette at the bottom of the screen. The selected color will glow brighter to indicate it's active.</li>
                  <li><strong>Place Your Pegs:</strong> Click on empty peg slots in the current guess row to place your selected color. You can click multiple times to add different colors. Each slot holds one colored peg.</li>
                  <li><strong>Remove Pegs (Optional):</strong> Click on an already-placed peg to remove it and try a different color in that position.</li>
                  <li><strong>Submit Your Guess:</strong> Once all peg slots are filled, click the "Submit Guess" button. The game will show you feedback on the right side—count the black and white feedback pegs carefully!</li>
                  <li><strong>Interpret Feedback:</strong> Black feedback pegs = correct color in correct position (perfect match). White feedback pegs = correct color but wrong position. No feedback pegs for that position = that color isn't in the secret code at all.</li>
                  <li><strong>Make Your Next Guess:</strong> Use the feedback from your previous guess to narrow down possibilities. Move on to the next row and try again. You can use the Undo button to change your last guess if needed.</li>
                  <li><strong>Win or Lose:</strong> Get all 4 pegs correct in the right positions and you've cracked the code! Fail to do so within your guess limit and the secret code will be revealed. Either way, your game is saved to your statistics!</li>
                  <li><strong>Play Again:</strong> Click "Play Again" to start a new game with a new secret code, or go back to the menu to change the difficulty or theme.</li>
                </ol>
              </div>

              <div className="tips-section" style={{ borderColor: themeData.accentColor }}>
                <h3 className="section-title" style={{ color: themeData.accentColor }}>
                  💡 Pro Tips
                </h3>
                <ul style={{ color: themeData.textColor }}>
                  <li>Start with a balanced mix of colors to eliminate possibilities quickly</li>
                  <li>Pay close attention to black vs white feedback pegs—they mean very different things!</li>
                  <li>If you get a white peg, that color exists in the code but not in that position</li>
                  <li>Use the Undo button strategically to test different combinations without wasting guesses</li>
                  <li>Try different themes to find the visual style you like best</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GlowCrack
