import { useState } from 'react'

function SpinWheel({ onClose, onPick }) {
  const [spinning, setSpinning] = useState(false)
  const [status, setStatus] = useState('Tap spin below!')

  function spin() {
    setSpinning(true)
    setStatus('Selecting random masterpiece...')
    setTimeout(() => {
      setSpinning(false)
      setStatus('Matched!')
      onPick()
    }, 3000)
  }

  return (
    <aside className="overlay" onClick={onClose}>
      <article className="glass-panel spin-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="btn-close-simple"><i className="fa-solid fa-xmark"></i></button>
        <figure className="spin-icon"><i className="fa-solid fa-dharmachakra"></i></figure>
        <h3 className="spin-title">Movie Wheel of Fortune</h3>
        <p className="spin-subtitle">Let fate decide your movie tonight without overthinking!</p>
        <figure className="wheel-container">
          <span className="wheel-pointer"><i className="fa-solid fa-location-pin fa-rotate-180"></i></span>
          <section className={spinning ? 'wheel-circle spinning' : 'wheel-circle'}>
            <section className="wheel-center-text">
              <i className="fa-solid fa-clapperboard"></i>
              <span>{status}</span>
            </section>
          </section>
        </figure>
        <button type="button" onClick={spin} disabled={spinning} className="app-btn btn-gradient btn-full">
          🎯 Spin & Pick My Watch!
        </button>
      </article>
    </aside>
  )
}

export default SpinWheel
