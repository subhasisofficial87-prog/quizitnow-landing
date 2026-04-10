import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Volume2, VolumeX, RotateCcw, HelpCircle, X } from 'lucide-react'
import '../styles/advancedMindReader.css'
import {
  createGameState,
  recordAnswer,
  DIFFICULTY_LEVELS,
  QUESTIONS,
  getQuestionsForDifficulty,
  generateInstructions,
  decodeNumber,
  getEncouragingMessage,
  getRevealAnimation
} from '../utils/advancedMindReaderGame'
import MastermindConfetti from '../components/MastermindConfetti'

function AdvancedMindReader() {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState(null)
  const [screen, setScreen] = useState('difficulty') // difficulty, thinking, questions, instructions, result, reveal
  const [difficulty, setDifficulty] = useState('medium')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [finalResultInput, setFinalResultInput] = useState('')
  const [revealAnimation, setRevealAnimation] = useState('')
  const [decodedNumber, setDecodedNumber] = useState(null)
  const confettiRef = useRef(null)

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
    }
  }

  const startGame = () => {
    playSound('click')
    const newGame = createGameState(difficulty)
    setGameState(newGame)
    setScreen('thinking')
  }

  const readyForQuestions = () => {
    playSound('click')
    setScreen('questions')
  }

  const handleAnswer = (answer) => {
    playSound('click')
    const newGameState = recordAnswer(gameState, answer)
    setGameState(newGameState)

    const questions = getQuestionsForDifficulty(newGameState.difficulty)

    if (newGameState.currentQuestion >= questions.length) {
      setTimeout(() => {
        setScreen('instructions')
      }, 500)
    }
  }

  const proceedToResult = () => {
    playSound('click')
    setScreen('result')
  }

  const submitFinalResult = () => {
    playSound('click')
    const finalNum = parseInt(finalResultInput)

    if (isNaN(finalNum) || finalNum < 0) {
      alert('Please enter a valid number')
      return
    }

    const animation = getRevealAnimation()
    setRevealAnimation(animation)

    setTimeout(() => {
      const decoded = decodeNumber(gameState, finalNum)
      setDecodedNumber(decoded)
      setRevealAnimation('')
      setScreen('reveal')
      playSound('success')

      setTimeout(() => {
        if (confettiRef.current) {
          confettiRef.current.burst(['#00ff9f', '#ff1493', '#ffb700'], 100)
        }
      }, 200)
    }, 2000)
  }

  const playAgain = () => {
    playSound('click')
    setScreen('difficulty')
    setGameState(null)
    setFinalResultInput('')
    setDecodedNumber(null)
  }

  // Difficulty Selection Screen
  if (screen === 'difficulty') {
    return (
      <div className="amr-container">
        <div className="amr-header">
          <button onClick={() => navigate('/')} className="amr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="amr-title">Advanced Mind Reader 🧠⚡</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="amr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="amr-content">
          <div className="amr-card">
            <h2 className="amr-subtitle">Think of a Number</h2>
            <p className="amr-description">I'll ask clever questions and use mathematical deduction to read your mind! Think you can trick me? 🤔</p>

            <div className="amr-difficulty-grid">
              {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
                <button
                  key={key}
                  onClick={() => setDifficulty(key)}
                  className={`amr-difficulty-btn ${difficulty === key ? 'active' : ''}`}
                >
                  <div className="difficulty-label">{level.label}</div>
                  <div className="difficulty-name">{level.name}</div>
                  <div className="difficulty-questions">{level.questions} questions</div>
                </button>
              ))}
            </div>

            <button onClick={startGame} className="amr-start-btn">
              🎮 Start Deduction
            </button>

            <button onClick={() => setShowHowToPlay(true)} className="amr-help-btn">
              <HelpCircle size={20} />
            </button>
          </div>
        </div>

        {showHowToPlay && (
          <div className="amr-modal-overlay" onClick={() => setShowHowToPlay(false)}>
            <div className="amr-modal" onClick={(e) => e.stopPropagation()}>
              <button className="amr-modal-close" onClick={() => setShowHowToPlay(false)}>
                <X size={24} />
              </button>
              <h2 className="amr-modal-title">How Advanced Mind Reader Works</h2>
              <div className="amr-modal-content">
                <h3>🎯 The Magic:</h3>
                <p>I'll ask questions about your number. Based on your answers, you'll perform mathematical operations. When you give me the final result, I'll decode your original number using pure mathematics!</p>

                <h3>📋 Game Steps:</h3>
                <ol>
                  <li>Think of a number in the selected range</li>
                  <li>Answer my logical questions honestly</li>
                  <li>Follow my mathematical instructions</li>
                  <li>Tell me your final result</li>
                  <li>Watch as I reveal your number!</li>
                </ol>

                <h3>🔢 The Math:</h3>
                <p>Each answer changes the constants you add. Different additions for different answers create a unique encoding. By analyzing your final number, I can decode your original!</p>

                <h3>💡 Pro Tips:</h3>
                <ul>
                  <li>Answer questions carefully and honestly</li>
                  <li>Follow the arithmetic instructions exactly</li>
                  <li>Make sure you enter the correct final result</li>
                  <li>Try different numbers and ranges!</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  // Thinking Screen
  if (screen === 'thinking') {
    return (
      <div className="amr-container">
        <div className="amr-header">
          <button onClick={() => navigate('/')} className="amr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="amr-title">Advanced Mind Reader 🧠⚡</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="amr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="amr-content thinking-content">
          <div className="amr-card thinking-card">
            <div className="thinking-emoji">🤔</div>
            <h2 className="thinking-title">Think of a Number...</h2>
            <p className="thinking-subtitle">Don't tell me! 😉</p>
            <p className="thinking-range">Range: {DIFFICULTY_LEVELS[difficulty].label}</p>

            <button onClick={readyForQuestions} className="amr-ready-btn">
              I'm Ready! ✅
            </button>
          </div>
        </div>

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  // Questions Screen
  if (screen === 'questions' && gameState) {
    const questions = getQuestionsForDifficulty(gameState.difficulty)
    const currentQuestionKey = questions[gameState.currentQuestion]
    const currentQuestion = QUESTIONS[currentQuestionKey]
    const progress = ((gameState.currentQuestion / questions.length) * 100).toFixed(0)

    return (
      <div className="amr-container">
        <div className="amr-header">
          <button onClick={() => navigate('/')} className="amr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="amr-title">Advanced Mind Reader 🧠⚡</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="amr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="amr-content">
          <div className="amr-progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="amr-question-counter">Question {gameState.currentQuestion + 1} of {questions.length}</div>

          <div className="amr-question-card">
            <div className="question-icon">❓</div>
            <p className="question-text">{currentQuestion.text}</p>

            <div className="question-buttons">
              <button onClick={() => handleAnswer(true)} className="amr-answer-btn yes-btn">
                <span className="answer-emoji">✅</span>
                <span className="answer-text">Yes</span>
              </button>
              <button onClick={() => handleAnswer(false)} className="amr-answer-btn no-btn">
                <span className="answer-emoji">❌</span>
                <span className="answer-text">No</span>
              </button>
            </div>

            <div className="answers-summary">
              <h4>Your Answers So Far:</h4>
              <div className="answers-list">
                {Object.entries(gameState.answers).map(([key, value]) => (
                  <div key={key} className="answer-item">
                    <span className="answer-key">{key.replace(/_/g, ' ')}:</span>
                    <span className={`answer-value ${value ? 'yes' : 'no'}`}>{value ? '✅ Yes' : '❌ No'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  // Instructions Screen
  if (screen === 'instructions' && gameState) {
    const instructions = generateInstructions(gameState)

    return (
      <div className="amr-container">
        <div className="amr-header">
          <button onClick={() => navigate('/')} className="amr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="amr-title">Advanced Mind Reader 🧠⚡</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="amr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="amr-content">
          <div className="amr-instructions-card">
            <div className="instructions-header">
              <h2>🔢 Mathematical Operations</h2>
              <p>Follow these steps carefully:</p>
            </div>

            <div className="instructions-list">
              {instructions.map((inst) => (
                <div key={inst.step} className="instruction-item">
                  <div className="instruction-step">Step {inst.step}</div>
                  <div className="instruction-detail">
                    <div className="instruction-main">{inst.instruction}</div>
                    <div className="instruction-explanation">{inst.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="instruction-note">
              <p>💡 After completing all steps, you'll have a final result. Tell me that number and I'll reveal your original number!</p>
            </div>

            <button onClick={proceedToResult} className="amr-proceed-btn">
              I'm Done! 🎯
            </button>
          </div>
        </div>

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  // Result Input Screen
  if (screen === 'result' && gameState) {
    return (
      <div className="amr-container">
        <div className="amr-header">
          <button onClick={() => navigate('/')} className="amr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="amr-title">Advanced Mind Reader 🧠⚡</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="amr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="amr-content result-input-content">
          <div className="result-input-card">
            <div className="result-emoji">🎯</div>
            <h2 className="result-title">What's Your Final Result?</h2>
            <p className="result-subtitle">Enter the number you got after all the operations</p>

            <input
              type="number"
              value={finalResultInput}
              onChange={(e) => setFinalResultInput(e.target.value)}
              placeholder="Enter your final number"
              className="result-input"
              onKeyPress={(e) => e.key === 'Enter' && submitFinalResult()}
            />

            <button onClick={submitFinalResult} className="amr-submit-btn">
              🔍 Reveal My Number!
            </button>
          </div>
        </div>

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  // Reveal Screen
  if (screen === 'reveal' && decodedNumber !== null) {
    return (
      <div className="amr-container">
        <div className="amr-header">
          <button onClick={() => navigate('/')} className="amr-back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="amr-title">Advanced Mind Reader 🧠⚡</h1>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="amr-control-btn">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="amr-content reveal-content">
          {revealAnimation && (
            <div className="amr-animation-card">
              <div className="animation-dots">
                <span></span><span></span><span></span>
              </div>
              <p className="animation-text">{revealAnimation}</p>
            </div>
          )}

          {!revealAnimation && (
            <div className="reveal-card">
              <div className="reveal-emoji">✨🎉✨</div>
              <h2 className="reveal-title">Your Number Was...</h2>
              <div className="big-reveal-number">{decodedNumber}</div>
              <p className="reveal-message">{getEncouragingMessage()}</p>

              <div className="reveal-explanation">
                <h3>How Did I Know?</h3>
                <p>By analyzing your answers and your final result, I calculated which constants were added, subtracted them all, and divided by 2. Pure mathematics!</p>
              </div>

              <button onClick={playAgain} className="amr-play-again-btn">
                🔄 Play Again
              </button>
            </div>
          )}
        </div>

        <MastermindConfetti ref={confettiRef} />
      </div>
    )
  }

  return null
}

export default AdvancedMindReader
