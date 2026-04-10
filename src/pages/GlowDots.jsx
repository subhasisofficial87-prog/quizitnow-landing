import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Settings, Volume2, VolumeX, Undo2 } from 'lucide-react'
import '../styles/glowDots.css'
import { createEmptyGame, drawLine, getAvailableMoves, undoLastMove } from '../utils/glowDotsGame'
import { getAIMove } from '../utils/glowDotsAI'
import { THEME_NAMES, getTheme } from '../utils/glowDotsThemes'
import Confetti from '../components/Confetti'

function GlowDots() {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState(null)
  const [menuOpen, setMenuOpen] = useState(true)
  const [gameMode, setGameMode] = useState(null) // 'ai' or '2player'
  const [aiDifficulty, setAiDifficulty] = useState('normal')
  const [gridSize, setGridSize] = useState(4)
  const [player1Name, setPlayer1Name] = useState('Player 1')
  const [player2Name, setPlayer2Name] = useState('AI')
  const [theme, setTheme] = useState('neon-dream')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [aiThinking, setAiThinking] = useState(false)
  const [showVictory, setShowVictory] = useState(false)
  const [hoveredLine, setHoveredLine] = useState(null)
  const canvasRef = useRef(null)
  const confettiRef = useRef(null)

  const themeData = getTheme(theme)

  // Initialize game
  const startGame = () => {
    const newGame = createEmptyGame(gridSize)
    setGameState(newGame)
    setMenuOpen(false)
    setShowVictory(false)
  }

  // Reset game
  const handleReset = () => {
    startGame()
  }

  // Undo move
  const handleUndo = () => {
    if (gameState && gameState.moveHistory.length > 0) {
      const newGame = { ...gameState }
      undoLastMove(newGame)
      setGameState(newGame)
    }
  }

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    if (type === 'line') {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = 800
      gain.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      osc.start(audioContext.currentTime)
      osc.stop(audioContext.currentTime + 0.1)
    } else if (type === 'box') {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = 1200
      gain.gain.setValueAtTime(0.4, audioContext.currentTime)
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

  // Handle line click
  const handleLineClick = (lineType, row, col) => {
    if (!gameState || gameState.gameOver || menuOpen) return

    const newGame = { ...gameState }
    const result = drawLine(newGame, lineType, row, col)

    if (result.success) {
      playSound(result.boxesCompleted.length > 0 ? 'box' : 'line')
      setGameState(newGame)

      if (result.boxesCompleted.length > 0) {
        if (confettiRef.current) {
          confettiRef.current.burst(result.boxesCompleted.length * 20)
        }
      }

      if (newGame.gameOver) {
        setShowVictory(true)
        playSound('victory')
      } else if (gameMode === 'ai' && newGame.currentPlayer === 1) {
        setTimeout(() => makeAIMove(newGame), 600)
      }
    }
  }

  const makeAIMove = (currentGame) => {
    setAiThinking(true)
    setTimeout(() => {
      const move = getAIMove(currentGame, aiDifficulty)
      if (move) {
        const newGame = { ...currentGame }
        const result = drawLine(newGame, move.type, move.row, move.col)

        if (result.success) {
          playSound(result.boxesCompleted.length > 0 ? 'box' : 'line')
          setGameState(newGame)

          if (result.boxesCompleted.length > 0) {
            if (confettiRef.current) {
              confettiRef.current.burst(result.boxesCompleted.length * 20)
            }

            if (!newGame.gameOver) {
              setTimeout(() => makeAIMove(newGame), 600)
            }
          }

          if (newGame.gameOver) {
            setShowVictory(true)
            playSound('victory')
          }
        }
      }
      setAiThinking(false)
    }, 300)
  }

  // Render game board
  const renderGameBoard = () => {
    if (!gameState) return null

    const { gridSize, horizontalLineStates, verticalLineStates, boxOwners } = gameState
    const padding = 80
    const dotRadius = 8
    const dotSpacing = (window.innerWidth - 2 * padding - 2 * dotRadius) / (gridSize - 1)

    // Calculate actual grid bounds with dot radius
    const gridLeft = padding + dotRadius
    const gridRight = padding + (gridSize - 1) * dotSpacing + dotRadius
    const gridTop = padding + dotRadius
    const gridBottom = padding + (gridSize - 1) * dotSpacing + dotRadius
    const svgWidth = gridRight + padding + dotRadius
    const svgHeight = gridBottom + padding + dotRadius

    return (
      <div className="game-board-wrapper">
        <svg
          className="game-board"
          width="100%"
          height="100%"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Boxes */}
          {Array.from({ length: gridSize - 1 }).map((_, row) =>
            Array.from({ length: gridSize - 1 }).map((_, col) => {
              const x1 = gridLeft + col * dotSpacing
              const y1 = gridTop + row * dotSpacing
              const x2 = x1 + dotSpacing
              const y2 = y1 + dotSpacing
              const boxIndex = row * (gridSize - 1) + col
              const owner = boxOwners[boxIndex]

              return (
                <g key={`box-${row}-${col}`}>
                  {owner !== null && (
                    <rect
                      x={x1 + 2}
                      y={y1 + 2}
                      width={dotSpacing - 4}
                      height={dotSpacing - 4}
                      fill={owner === 0 ? themeData.player1.fill : themeData.player2.fill}
                      opacity="0.4"
                      rx="4"
                      className="filled-box"
                    />
                  )}
                </g>
              )
            })
          )}

          {/* Horizontal lines */}
          {Array.from({ length: gridSize }).map((_, row) =>
            Array.from({ length: gridSize - 1 }).map((_, col) => {
              const index = row * (gridSize - 1) + col
              const x1 = gridLeft + col * dotSpacing
              const y1 = gridTop + row * dotSpacing
              const x2 = x1 + dotSpacing

              return (
                <g key={`h-line-${row}-${col}`}>
                  {/* Invisible clickable area (large stroke) */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y1}
                    stroke="transparent"
                    strokeWidth={24}
                    className="line-clickable"
                    onClick={() => handleLineClick('h', row, col)}
                    onMouseEnter={() =>
                      !horizontalLineStates[index] && setHoveredLine(`h-${row}-${col}`)
                    }
                    onMouseLeave={() => setHoveredLine(null)}
                    style={{
                      cursor: horizontalLineStates[index] ? 'default' : 'pointer',
                      pointerEvents: 'auto'
                    }}
                  />
                  {/* Visible line */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y1}
                    stroke={themeData.lineColor}
                    strokeWidth={horizontalLineStates[index] ? 4 : 2}
                    opacity={horizontalLineStates[index] ? 1 : 0.3}
                    className={`game-line h-line ${
                      hoveredLine === `h-${row}-${col}` ? 'hovered' : ''
                    }`}
                    pointerEvents="none"
                    style={{
                      filter: hoveredLine === `h-${row}-${col}` ? `drop-shadow(0 0 8px ${themeData.lineGlow})` : 'none'
                    }}
                  />
                </g>
              )
            })
          )}

          {/* Vertical lines */}
          {Array.from({ length: gridSize - 1 }).map((_, row) =>
            Array.from({ length: gridSize }).map((_, col) => {
              const index = row * gridSize + col
              const x1 = gridLeft + col * dotSpacing
              const y1 = gridTop + row * dotSpacing
              const y2 = y1 + dotSpacing

              return (
                <g key={`v-line-${row}-${col}`}>
                  {/* Invisible clickable area (large stroke) */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x1}
                    y2={y2}
                    stroke="transparent"
                    strokeWidth={24}
                    className="line-clickable"
                    onClick={() => handleLineClick('v', row, col)}
                    onMouseEnter={() =>
                      !verticalLineStates[index] && setHoveredLine(`v-${row}-${col}`)
                    }
                    onMouseLeave={() => setHoveredLine(null)}
                    style={{
                      cursor: verticalLineStates[index] ? 'default' : 'pointer',
                      pointerEvents: 'auto'
                    }}
                  />
                  {/* Visible line */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x1}
                    y2={y2}
                    stroke={themeData.lineColor}
                    strokeWidth={verticalLineStates[index] ? 4 : 2}
                    opacity={verticalLineStates[index] ? 1 : 0.3}
                    className={`game-line v-line ${
                      hoveredLine === `v-${row}-${col}` ? 'hovered' : ''
                    }`}
                    pointerEvents="none"
                    style={{
                      filter: hoveredLine === `v-${row}-${col}` ? `drop-shadow(0 0 8px ${themeData.lineGlow})` : 'none'
                    }}
                  />
                </g>
              )
            })
          )}

          {/* Dots */}
          {Array.from({ length: gridSize }).map((_, row) =>
            Array.from({ length: gridSize }).map((_, col) => {
              const x = gridLeft + col * dotSpacing
              const y = gridTop + row * dotSpacing

              return (
                <circle
                  key={`dot-${row}-${col}`}
                  cx={x}
                  cy={y}
                  r={dotRadius}
                  fill={themeData.dotColor}
                  className="game-dot"
                  style={{
                    filter: `drop-shadow(0 0 10px ${themeData.dotGlow})`
                  }}
                />
              )
            })
          )}
        </svg>

        <Confetti ref={confettiRef} theme={themeData} />
      </div>
    )
  }

  if (!gameState || menuOpen) {
    return (
      <div className={`glow-dots-menu bg-gradient-to-br ${themeData.bg}`}>
        <div className="menu-container">
          <div className="menu-header">
            <button onClick={() => navigate('/')} className="back-btn">
              <ArrowLeft size={24} />
            </button>
          </div>

          <div className="menu-content">
            <h1 className="menu-title" style={{ color: themeData.accent }}>
              ✨ Glow Dots ✨
            </h1>
            <p className="menu-subtitle">A Modern Take on the Classic Dots & Boxes Game</p>

            <div className="menu-section">
              <h2>Game Mode</h2>
              <div className="button-group">
                <button
                  className={`mode-btn ${gameMode === 'ai' ? 'active' : ''}`}
                  onClick={() => setGameMode('ai')}
                  style={gameMode === 'ai' ? { borderColor: themeData.player1.color } : {}}
                >
                  🤖 vs AI
                </button>
                <button
                  className={`mode-btn ${gameMode === '2player' ? 'active' : ''}`}
                  onClick={() => setGameMode('2player')}
                  style={gameMode === '2player' ? { borderColor: themeData.player2.color } : {}}
                >
                  👥 2 Player
                </button>
              </div>
            </div>

            {gameMode === 'ai' && (
              <div className="menu-section">
                <h2>AI Difficulty</h2>
                <div className="button-group">
                  {['easy', 'normal', 'expert'].map((diff) => (
                    <button
                      key={diff}
                      className={`diff-btn ${aiDifficulty === diff ? 'active' : ''}`}
                      onClick={() => setAiDifficulty(diff)}
                      style={aiDifficulty === diff ? { borderColor: themeData.accent } : {}}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="menu-section">
              <h2>Grid Size</h2>
              <div className="button-group">
                {[3, 4, 5, 6, 7].map((size) => (
                  <button
                    key={size}
                      className={`size-btn ${gridSize === size ? 'active' : ''}`}
                    onClick={() => setGridSize(size)}
                    style={gridSize === size ? { borderColor: themeData.accent } : {}}
                  >
                    {size}×{size}
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
                      background: `linear-gradient(135deg, ${getTheme(themeName).player1.color}, ${getTheme(themeName).player2.color})`
                    }}
                  >
                    {theme === themeName && '✓'}
                  </button>
                ))}
              </div>
              <p className="theme-name">{getTheme(theme).name}</p>
            </div>

            <button className="play-btn" onClick={startGame}>
              🎮 Play Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`glow-dots-game bg-gradient-to-br ${themeData.bg}`}>
      <div className="game-container">
        {/* Header */}
        <div className="game-header">
          <button onClick={() => navigate('/')} className="back-btn">
            <ArrowLeft size={24} />
          </button>

          <div className="game-info">
            <div className="player-score player-1">
              <div
                className="player-color-dot"
                style={{ backgroundColor: themeData.player1.color }}
              ></div>
              <span className="player-name">{player1Name}</span>
              <span className="score">{gameState?.scores[0] || 0}</span>
            </div>

            <span className="vs">vs</span>

            <div className="player-score player-2">
              <div
                className="player-color-dot"
                style={{ backgroundColor: themeData.player2.color }}
              ></div>
              <span className="player-name">{player2Name}</span>
              <span className="score">{gameState?.scores[1] || 0}</span>
            </div>
          </div>

          <div className="header-controls">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="control-btn"
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button onClick={handleUndo} className="control-btn" title="Undo" disabled={gameState?.moveHistory.length === 0}>
              <Undo2 size={20} />
            </button>
            <button onClick={handleReset} className="control-btn" title="Reset">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Game Board */}
        {renderGameBoard()}

        {/* Help Text */}
        <div className="game-help-text">
          💡 Click or tap near any line to draw it
        </div>

        {/* AI Thinking */}
        {aiThinking && (
          <div className="ai-thinking">
            <div className="spinner"></div>
            <span>AI is thinking...</span>
          </div>
        )}

        {/* Victory Screen */}
        {showVictory && (
          <div className="victory-overlay">
            <div className="victory-content">
              <h1 className="victory-title">
                {gameState.winner === -1 ? "It's a Draw! 🤝" : `${gameState.winner === 0 ? player1Name : player2Name} Wins! 🎉`}
              </h1>
              <div className="victory-scores">
                <div className="final-score">
                  <span>{player1Name}</span>
                  <strong>{gameState.scores[0]}</strong>
                </div>
                <span className="vs-text">vs</span>
                <div className="final-score">
                  <span>{player2Name}</span>
                  <strong>{gameState.scores[1]}</strong>
                </div>
              </div>
              <div className="victory-buttons">
                <button onClick={handleReset} className="victory-btn">
                  Play Again
                </button>
                <button onClick={() => setMenuOpen(true)} className="victory-btn">
                  Back to Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GlowDots
