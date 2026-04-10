import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Volume2, VolumeX, RotateCcw, HelpCircle, X } from 'lucide-react'
import '../styles/mindReader.css'
import {
  createGameState,
  makeNextGuess,
  getPerformanceRating,
  shouldDetectCheating,
  DIFFICULTY_LEVELS
} from '../utils/mindReaderGame'
import MastermindConfetti from '../components/MastermindConfetti'

function MindReader() {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState(null)
  const [screen, setScreen] = useState('difficulty') // difficulty, thinking, playing, result, cheating
  const [difficulty, setDifficulty] = useState('medium')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const confettiRef = useRef(null)
  const [thinkingAnimation, setThinkingAnimation] = useState(true)

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    if (type === 'click') {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = 600 + Math.random() * 200
      gain.gain.setValueAtTime(0.1, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      osc.start(audioContext.currentTime)
      osc.stop(audioContext.currentTime + 0.1)
    } else if (type === 'success') {
      const notes = [523, 659, 784, 1047]
      notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()
        osc.connect(gain)
        gain.connect(audioContext.destination)
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.2)
        osc.start(audioContext.currentTime + i * 0.1)
        osc.stop(audioContext.currentTime + i * 0.1 + 0.2)
      })
    } else if (type === 'error') {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = 300
      gain.gain.setValueAtTime(0.2, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      osc.start(audioContext.currentTime)
      osc.stop(audioContext.currentTime + 0.3)
    }
  }

  // Start game
  const startGame = () => {
    playSound('click')
    const newGame = createGameState(difficulty)
    setGameState(newGame)
    setScreen('thinking')
  }

  // Ready to play
  const readyToPlay = () => {
    playSound('click')
    setThinkingAnimation(false)
    setScreen('playing')
  }

  // Handle feedback
  const handleFeedback = (feedback) => {
    playSound('click')
    setThinkingAnimation(true)

    const newGameState = makeNextGuess(gameState, feedback)

    if (shouldDetectCheating(newGameState)) {
      playSound('error')
      setGameState(newGameState)
      setScreen('cheating')
    } else if (newGameState.won) {
      playSound('success')
      setGameState(newGameState)
      setTimeout(() => {
        setScreen('result')
        if (confettiRef.current) {
          confettiRef.current.burst(['#00ff9f', '#ff1493', '#00d4ff'], 100)
        }
      }, 500)
    } else {
      setGameState(newGameState)
      setTimeout(() => {
        setThinkingAnimation(false)
      }, 1000)
    }
  }

  // Play again
  const playAgain = () => {
    playSound('click')
    setScreen('difficulty')
    setGameState(null)
    setThinkingAnimation(true)
  }

  // Render difficulty selection screen
  if (screen === 'difficulty') {
    return (
      <div className="mind-reader-container">
        <div className="mr-header">
          <button onClick={() => navigate('/')} className="mr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="mr-title">Mind Reader 🧠</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="mr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="mr-content">
          <div className="mr-card">
            <h2 className="mr-subtitle">Think of a Number</h2>
            <p className="mr-description">I will guess the number you're thinking of using my brilliant mind-reading powers! 🧠✨</p>

            <div className="mr-difficulty-grid">
              {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
                <button
                  key={key}
                  onClick={() => setDifficulty(key)}
                  className={`mr-difficulty-btn ${difficulty === key ? 'active' : ''}`}
                >
                  <div className="difficulty-label">{level.label}</div>
                  <div className="difficulty-name">{level.name}</div>
                </button>
              ))}
            </div>

            <button onClick={startGame} className="mr-start-btn">
              🎮 Start Game
            </button>

            <button onClick={() => setShowHowToPlay(true)} className="mr-help-btn">
              <HelpCircle size={20} />
            </button>
          </div>
        </div>

        {showHowToPlay && (
          <div className="mr-modal-overlay" onClick={() => setShowHowToPlay(false)}>
            <div className="mr-modal" onClick={(e) => e.stopPropagation()}>
              <button className="mr-modal-close" onClick={() => setShowHowToPlay(false)}>
                <X size={24} />
              </button>
              <h2 className="mr-modal-title">How to Play</h2>
              <div className="mr-modal-content">
                <h3>🎯 The Goal:</h3>
                <p>Think of a number and let me guess it! You'll only need to respond with "Higher", "Lower", or "Correct".</p>

                <h3>📖 How It Works:</h3>
                <ol>
                  <li>Select your range (1-50, 1-100, or 1-1000)</li>
                  <li>Think of a number in that range</li>
                  <li>I'll make a guess</li>
                  <li>Tell me if my guess is Higher, Lower, or Correct</li>
                  <li>I'll use my AI brain to narrow down and guess again!</li>
                </ol>

                <h3>⚡ Performance Ratings:</h3>
                <ul>
                  <li>🧠 Genius - Perfect guessing!</li>
                  <li>🎯 Smart - Very efficient</li>
                  <li>👍 Good - Nice thinking</li>
                  <li>🍀 Lucky - Got there eventually!</li>
                </ul>

                <h3>⚠️ Fair Play:</h3>
                <p>Be honest with your responses! If you give contradictory hints, I'll detect it.</p>
              </div>
            </div>
          </div>
        )}

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  // Render thinking screen
  if (screen === 'thinking') {
    return (
      <div className="mind-reader-container">
        <div className="mr-header">
          <button onClick={() => navigate('/')} className="mr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="mr-title">Mind Reader 🧠</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="mr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="mr-content thinking-content">
          <div className="mr-card thinking-card">
            <div className="thinking-emoji">🤔</div>
            <h2 className="thinking-title">Think of a Number...</h2>
            <p className="thinking-subtitle">Don't tell me! 😉</p>
            <p className="thinking-range">Range: {DIFFICULTY_LEVELS[difficulty].label}</p>

            <button onClick={readyToPlay} className="mr-ready-btn">
              I'm Ready! ✅
            </button>
          </div>
        </div>

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  // Render playing screen
  if (screen === 'playing' && gameState) {
    return (
      <div className="mind-reader-container">
        <div className="mr-header">
          <button onClick={() => navigate('/')} className="mr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="mr-title">Mind Reader 🧠</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="mr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="mr-content">
          <div className="mr-stats">
            <div className="stat">Attempt: <span className="stat-value">{gameState.attempts}</span></div>
            <div className="stat">Range: <span className="stat-value">{gameState.min} - {gameState.max}</span></div>
          </div>

          <div className="mr-guess-display">
            {thinkingAnimation ? (
              <div className="thinking-dots">
                <span></span><span></span><span></span>
              </div>
            ) : (
              <div className="guess-number">{gameState.currentGuess}</div>
            )}
          </div>

          <div className="mr-message">
            {thinkingAnimation ? 'AI is thinking...' : 'Is it this number?'}
          </div>

          {!thinkingAnimation && (
            <>
              <div className="mr-buttons">
                <button onClick={() => handleFeedback('higher')} className="mr-feedback-btn higher-btn">
                  <div className="btn-arrow">⬆️</div>
                  <div className="btn-text">Higher</div>
                </button>
                <button onClick={() => handleFeedback('correct')} className="mr-feedback-btn correct-btn">
                  <div className="btn-arrow">✅</div>
                  <div className="btn-text">Correct!</div>
                </button>
                <button onClick={() => handleFeedback('lower')} className="mr-feedback-btn lower-btn">
                  <div className="btn-arrow">⬇️</div>
                  <div className="btn-text">Lower</div>
                </button>
              </div>

              {gameState.previousGuesses.length > 0 && (
                <div className="mr-history">
                  <h3>Previous Guesses:</h3>
                  <div className="history-list">
                    {gameState.previousGuesses.map((guess, idx) => (
                      <span key={idx} className="history-item">{guess}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  // Render result screen
  if (screen === 'result' && gameState) {
    const performance = getPerformanceRating(gameState.attempts, DIFFICULTY_LEVELS[gameState.difficulty].max)

    return (
      <div className="mind-reader-container">
        <div className="mr-header">
          <button onClick={() => navigate('/')} className="mr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="mr-title">Mind Reader 🧠</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="mr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="mr-content result-content">
          <div className="mr-card result-card">
            <div className="result-emoji">{performance.emoji}</div>
            <h2 className="result-title">I Got It! 🎉</h2>
            <p className="result-attempts">I guessed your number in <strong>{gameState.attempts}</strong> attempts</p>

            <div className="performance-rating">
              <div className="rating-label">{performance.rating}</div>
              <p className="rating-message">{performance.message}</p>
            </div>

            <div className="guesses-summary">
              <h3>My Guesses:</h3>
              <div className="summary-list">
                {gameState.history.map((item, idx) => (
                  <div key={idx} className="summary-item">
                    <span className="guess-num">Guess {idx + 1}: {item.guess}</span>
                    <span className="feedback-badge">{item.feedback.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={playAgain} className="mr-play-again-btn">
              🔄 Play Again
            </button>
          </div>
        </div>

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  // Render cheating detection screen
  if (screen === 'cheating') {
    return (
      <div className="mind-reader-container">
        <div className="mr-header">
          <button onClick={() => navigate('/')} className="mr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="mr-title">Mind Reader 🧠</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="mr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="mr-content cheating-content">
          <div className="mr-card cheating-card">
            <div className="cheating-emoji">🤔</div>
            <h2 className="cheating-title">Hmm... Something's Off</h2>
            <p className="cheating-message">Your hints don't add up! 🕵️</p>

            <div className="cheating-explanation">
              <p>Your last guess was {gameState.currentGuess}.</p>
              <p>But your previous answers contradict that number could exist in the remaining range!</p>
              <p>Try to be honest with your answers next time! 😊</p>
            </div>

            <button onClick={playAgain} className="mr-try-again-btn">
              🔄 Try Again
            </button>
          </div>
        </div>

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  return null
}

export default MindReader
