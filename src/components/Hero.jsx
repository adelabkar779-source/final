const moods = [
  { key: 'excited', label: '🔥 High adrenaline' },
  { key: 'laugh', label: '😂 Need a Laugh' },
  { key: 'relaxed', label: '☕ Chilling' },
  { key: 'mindblowing', label: '🤯 Deep Thinking' },
  { key: 'family', label: '🍿 Family Night' },
]

function Hero({ onPickMood }) {
  return (
    <section className="hero-section">
      <figure className="hero-bg"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop')" }}></figure>
      <span className="hero-overlay"></span>
      <article className="hero-container">
        <span className="hero-pill">
          <i className="fa-solid fa-sparkles"></i> Your Personal Entertainment Concierge
        </span>
        <h1 className="hero-headline">
          Stop Scrolling. <br />
          <span className="gradient-text">Start Watching Greatness.</span>
        </h1>
        <p className="hero-description">
          Select your mood, favorite genre, or preferred streaming platform. Our recommendation engine finds your next watch in seconds.
        </p>
        <nav className="mood-shortcuts">
          <span className="mood-label">Instant Mood:</span>
          {moods.map((m) => (
            <button key={m.key} type="button" onClick={() => onPickMood(m.key)} className="mood-chip">{m.label}</button>
          ))}
        </nav>
      </article>
    </section>
  )
}

export default Hero
