import { useState } from 'react'

function Header({ searchQuery, onSearch, watchlistCount, onOpenWheel, onOpenWatchlist, onGoHome }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  return (
    <header className="navbar-header">
      <section className="navbar-container">
        <nav className="app-navbar">
          <section className="brand-logo" onClick={onGoHome}>
            <span className="logo-icon"><i className="fa-solid fa-film"></i></span>
            <section className="logo-text">
              <span className="logo-title">WHAT SHOULD I WATCH?</span>
              <span className="logo-subtitle">Smart Cinema Recommender</span>
            </section>
          </section>

          <form className="search-form desktop-search" onSubmit={(e) => e.preventDefault()}>
            <input type="text" value={searchQuery} onChange={(e) => onSearch(e.target.value)}
              placeholder="Search by title, genre, actor..." className="search-input" />
            <button type="button" className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>

          <nav className="header-actions">
            <button type="button" onClick={onOpenWheel} className="app-btn btn-gradient">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span className="btn-text">Surprise Me!</span>
            </button>
            <button type="button" onClick={onOpenWatchlist} className="btn-icon">
              <i className="fa-solid fa-bookmark"></i>
              <span className={watchlistCount === 0 ? 'badge-count hidden' : 'badge-count'}>{watchlistCount}</span>
            </button>
            <button type="button" onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className="btn-icon mobile-only">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </nav>
        </nav>

        <form className={mobileSearchOpen ? 'search-form mobile-search' : 'search-form mobile-search hidden'}
          onSubmit={(e) => e.preventDefault()}>
          <section className="search-input-wrapper">
            <input type="text" value={searchQuery} onChange={(e) => onSearch(e.target.value)}
              placeholder="Search movies, TV shows..." className="search-input" />
            <button type="button" className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
          </section>
        </form>
      </section>
    </header>
  )
}

export default Header
