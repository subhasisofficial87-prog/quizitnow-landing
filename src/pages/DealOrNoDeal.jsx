import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Volume2, VolumeX, HelpCircle, RotateCcw } from 'lucide-react'
import {
  createGameState,
  openCase,
  selectPlayerCase,
  getRemainingValues,
  getEliminatedValues,
  calculateBankerOffer,
  getBankerMessage,
  getCasesToOpenThisRound,
  isRoundComplete,
  nextRound,
  acceptDeal,
  revealFinalCase,
  formatRupees,
  getGameStats
} from '../utils/dealOrNoDealGame'
import '../styles/dealOrNoDeal.css'

const DealOrNoDeal = () => {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState(null)
  const [screen, setScreen] = useState('intro')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [casesOpenedThisRound, setCasesOpenedThisRound] = useState(0)
  const [currentOffer, setCurrentOffer] = useState(null)
  const [bankerMessage, setBankerMessage] = useState('')
  const [showBankerDialog, setShowBankerDialog] = useState(false)
  const [animatingOffer, setAnimatingOffer] = useState(false)
  const confettiRef = useRef(null)

  // Play sound effects using Web Audio API
  const playSound = (type) => {
    if (!soundEnabled) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const now = audioContext.currentTime

    switch (type) {
      case 'caseOpen':
        // Case open sound: quick beep
        const osc1 = audioContext.createOscillator()
        const gain1 = audioContext.createGain()
        osc1.connect(gain1)
        gain1.connect(audioContext.destination)
        osc1.frequency.value = 800
        gain1.gain.setValueAtTime(0.3, now)
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
        osc1.start(now)
        osc1.stop(now + 0.1)
        break

      case 'bankerCall':
        // Banker call: phone ring pattern
        for (let i = 0; i < 3; i++) {
          const osc = audioContext.createOscillator()
          const gain = audioContext.createGain()
          osc.connect(gain)
          gain.connect(audioContext.destination)
          osc.frequency.value = 600 + i * 100
          gain.gain.setValueAtTime(0.2, now + i * 0.2)
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.2 + 0.15)
          osc.start(now + i * 0.2)
          osc.stop(now + i * 0.2 + 0.15)
        }
        break

      case 'success':
        // Victory sound: ascending notes
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

  // Start game
  const startGame = () => {
    const newGameState = createGameState()
    setGameState(newGameState)
    setScreen('selectCase')
    setCasesOpenedThisRound(0)
    setCurrentOffer(null)
  }

  // Select case
  const handleCaseSelection = (caseId) => {
    const updatedState = selectPlayerCase(gameState, caseId)
    setGameState(updatedState)
    setScreen('playing')
    setCasesOpenedThisRound(0)
    playSound('success')
  }

  // Open a case
  const handleOpenCase = (caseId) => {
    if (!gameState || gameState.cases.find(c => c.id === caseId).opened) return

    const updatedState = openCase(gameState, caseId)
    setGameState(updatedState)
    setCasesOpenedThisRound(casesOpenedThisRound + 1)
    playSound('caseOpen')

    // Check if round is complete
    if (casesOpenedThisRound + 1 >= getCasesToOpenThisRound(gameState.currentRound)) {
      setTimeout(() => {
        setScreen('bankerOffer')
        const offer = calculateBankerOffer(updatedState)
        setCurrentOffer(offer)
        const message = getBankerMessage(offer, gameState.cases.find(c => c.id === gameState.selectedCaseId).value, gameState.currentRound)
        setBankerMessage(message)
        setShowBankerDialog(true)
        playSound('bankerCall')
        setAnimatingOffer(true)
      }, 500)
    }
  }

  // Handle deal
  const handleDeal = () => {
    playSound('success')
    if (currentOffer >= 500000) {
      setShowConfetti(true)
    }
    const updatedState = acceptDeal(gameState, currentOffer)
    setGameState(updatedState)
    setShowBankerDialog(false)
    setTimeout(() => setScreen('result'), 300)
  }

  // Handle no deal
  const handleNoDeal = () => {
    playSound('caseOpen')
    const updatedState = nextRound(gameState)
    setGameState(updatedState)
    setCasesOpenedThisRound(0)
    setShowBankerDialog(false)
    setCurrentOffer(null)
    setBankerMessage('')
    setAnimatingOffer(false)
    setScreen('playing')
  }

  // Reveal final case
  const handleRevealFinal = () => {
    playSound('bankerCall')
    const updatedState = revealFinalCase(gameState)
    setGameState(updatedState)
    if (updatedState.finalValue >= 500000) {
      setTimeout(() => setShowConfetti(true), 500)
    }
    setScreen('result')
  }

  // Reset game
  const resetGame = () => {
    setShowConfetti(false)
    startGame()
  }

  if (!gameState && screen !== 'intro') {
    return null
  }

  return (
    <div className="dnd-container">
      {/* Confetti Effect */}
      {showConfetti && (
        <canvas
          ref={confettiRef}
          className="confetti-canvas"
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      {/* Intro Screen */}
      {screen === 'intro' && (
        <div className="dnd-card intro-card">
          <h1 className="dnd-title">Deal or No Deal</h1>
          <p className="dnd-subtitle">Test your luck in this high-stakes game!</p>

          <div className="briefcase-animation">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`briefcase briefcase-${i}`} />
            ))}
          </div>

          <button className="dnd-button start-button" onClick={startGame}>
            Start Game
          </button>

          <button
            className="dnd-button help-button"
            onClick={() => setShowHowToPlay(true)}
          >
            <HelpCircle size={20} />
            How To Play
          </button>
        </div>
      )}

      {/* Select Case Screen */}
      {screen === 'selectCase' && (
        <div className="dnd-card">
          <div className="dnd-header">
            <h2>Pick Your Briefcase</h2>
            <p className="subtitle">Choose one case to keep. The rest will be opened.</p>
          </div>

          <div className="briefcase-grid">
            {gameState.cases.map((c) => (
              <button
                key={c.id}
                className="briefcase-btn unopened"
                onClick={() => handleCaseSelection(c.id)}
              >
                <div className="briefcase-icon">💼</div>
                <div className="briefcase-number">{c.id + 1}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Playing Screen */}
      {screen === 'playing' && gameState.selectedCaseId !== null && (
        <div className="dnd-card">
          <div className="dnd-header">
            <h2>Round {gameState.currentRound}</h2>
            <p className="subtitle">
              Open {getCasesToOpenThisRound(gameState.currentRound) - casesOpenedThisRound} more cases
            </p>
          </div>

          {/* Selected case display */}
          <div className="selected-case-display">
            <p className="selected-label">Your Case</p>
            <div className="briefcase-btn selected">
              <div className="briefcase-icon">💼</div>
              <div className="briefcase-number">{gameState.selectedCaseId + 1}</div>
            </div>
          </div>

          <div className="playing-layout">
            {/* Briefcase Grid */}
            <div className="briefcase-grid">
              {gameState.cases.map((c) => {
                if (c.id === gameState.selectedCaseId) return null

                return (
                  <button
                    key={c.id}
                    className={`briefcase-btn ${c.opened ? 'opened' : 'unopened'}`}
                    onClick={() => !c.opened && handleOpenCase(c.id)}
                    disabled={c.opened}
                  >
                    {c.opened ? (
                      <div className="opened-value">{formatRupees(c.value)}</div>
                    ) : (
                      <>
                        <div className="briefcase-icon">💼</div>
                        <div className="briefcase-number">{c.id + 1}</div>
                      </>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Sidebar */}
            <div className="dnd-sidebar">
              <div className="values-section">
                <h3>Remaining Values</h3>
                <div className="values-list">
                  {getRemainingValues(gameState).map((val, i) => (
                    <div key={i} className="value-item remaining">
                      {formatRupees(val)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="values-section">
                <h3>Eliminated</h3>
                <div className="values-list">
                  {getEliminatedValues(gameState).map((val, i) => (
                    <div key={i} className="value-item eliminated">
                      {formatRupees(val)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Banker Offer Screen */}
      {screen === 'bankerOffer' && showBankerDialog && (
        <div className="dnd-overlay">
          <div className="banker-dialog">
            <div className="banker-header">
              <h2>🏦 The Banker Calls</h2>
            </div>

            <div className={`banker-offer ${animatingOffer ? 'animating' : ''}`}>
              <p className="offer-label">The Banker offers you:</p>
              <div className="offer-amount">
                {currentOffer ? formatRupees(currentOffer) : '...'}
              </div>
              <p className="banker-message">"{bankerMessage}"</p>
            </div>

            <div className="banker-buttons">
              <button className="dnd-button deal-button" onClick={handleDeal}>
                ✅ Deal
              </button>
              <button className="dnd-button no-deal-button" onClick={handleNoDeal}>
                ❌ No Deal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Screen */}
      {screen === 'result' && (
        <div className="dnd-card result-card">
          <div className="dnd-header">
            <h2>
              {gameState.dealtAmount ? 'You Made a Deal!' : 'Game Over!'}
            </h2>
          </div>

          <div className="result-container">
            <div className="result-section">
              {gameState.dealtAmount ? (
                <>
                  <p className="result-label">You accepted the deal:</p>
                  <div className="result-amount dealt">
                    {formatRupees(gameState.dealtAmount)}
                  </div>
                </>
              ) : (
                <>
                  <p className="result-label">Your case contained:</p>
                  <div className="result-amount">
                    {formatRupees(gameState.finalValue)}
                  </div>
                </>
              )}
            </div>

            <div className="result-message">
              {gameState.dealtAmount && gameState.finalValue && (
                <p>
                  {gameState.dealtAmount >= gameState.finalValue
                    ? '🎉 Great deal! You beat the banker!'
                    : '😅 Oops! Your case was worth more!'}
                </p>
              )}
              {gameState.dealtAmount >= 500000 || gameState.finalValue >= 500000 ? (
                <p className="big-win">🏆 BIG WIN! 🏆</p>
              ) : null}
            </div>
          </div>

          <button className="dnd-button" onClick={resetGame}>
            <RotateCcw size={20} />
            Play Again
          </button>

          <button className="dnd-button secondary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      )}

      {/* Top Controls */}
      {screen !== 'intro' && (
        <div className="dnd-controls">
          <button
            className="dnd-button small"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button
            className="dnd-button small"
            onClick={() => navigate('/')}
            title="Back to Home"
          >
            ← Home
          </button>
        </div>
      )}

      {/* How To Play Modal */}
      {showHowToPlay && (
        <div className="dnd-overlay">
          <div className="modal-dialog">
            <h2>How To Play Deal or No Deal</h2>

            <div className="modal-content">
              <h3>Game Objective</h3>
              <p>
                Select a briefcase and eliminate others. After each round, the Banker offers
                you money based on the remaining values. Accept their offer to win that amount,
                or reject it to continue and risk it all!
              </p>

              <h3>Game Flow</h3>
              <ol>
                <li>Pick one briefcase at the start (this is your prize)</li>
                <li>Each round, open a set number of cases</li>
                <li>After each round, the Banker makes an offer</li>
                <li>Choose: Deal (take the offer) or No Deal (continue playing)</li>
                <li>Final round: Your case is revealed</li>
              </ol>

              <h3>Rounds</h3>
              <ul>
                <li>Round 1: Open 5 cases</li>
                <li>Round 2: Open 4 cases</li>
                <li>Round 3: Open 3 cases</li>
                <li>Round 4: Open 2 cases</li>
                <li>Round 5: Open 1 case</li>
              </ul>

              <h3>Tips</h3>
              <ul>
                <li>Early offers are usually low - the Banker starts conservatively</li>
                <li>Later offers get better as the Banker feels pressure</li>
                <li>Pay attention to which values are eliminated</li>
                <li>Trust your instincts!</li>
              </ul>
            </div>

            <button
              className="dnd-button"
              onClick={() => setShowHowToPlay(false)}
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DealOrNoDeal
