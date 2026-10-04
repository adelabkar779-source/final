function Footer({ onOpenWheel, onOpenWatchlist, onGoHome }) {
  const go = (fn) => (e) => { e.preventDefault(); fn() }

  return (
    <footer className="footer">
      <section className="footer-container">
        <section className="footer-brand">
          <span className="footer-logo"><i className="fa-solid fa-clapperboard"></i></span>
          <section>
            <span className="footer-title">WHAT SHOULD I WATCH?</span>
            <p className="footer-subtitle">Your intelligent cinema companion for movie nights.</p>
          </section>
        </section>
        <nav className="footer-links">
          <a href="#" onClick={go(onOpenWheel)}>Surprise Wheel</a>
          <a href="#" onClick={go(onOpenWatchlist)}>Watchlist</a>
          <a href="#" onClick={go(onGoHome)}>Browse Catalog</a>
        </nav>
        <p className="footer-copy">&copy; 2026 What Should I Watch. All rights reserved.</p>
      </section>
    </footer>
  )
}

export default Footer
