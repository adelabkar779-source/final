const types = [
  ['all', 'All Formats'], ['movie', 'Movies 🎬'], ['series', 'TV Shows 📺'], ['anime', 'Anime 🎌'], ['doc', 'Documentaries 🌍'],
]
const genres = [
  ['all', 'All Genres'], ['action', 'Action & Adventure 💥'], ['comedy', 'Comedy & Satire 🎭'], ['drama', 'Drama & Mystery 🎭'],
  ['scifi', 'Sci-Fi & Cyberpunk 🚀'], ['horror', 'Horror & Thriller 🧟'], ['romance', 'Romance & Heartfelt 💕'],
  ['animation', 'Animation & Fantasy 🎨'], ['crime', 'Crime & Mystery 🔍'],
]
const moods = [
  ['all', 'Any Mood'], ['excited', 'High adrenaline'], ['laugh', 'Need a Laugh'], ['relaxed', 'Chilling'],
  ['mindblowing', 'Deep Thinking'], ['scared', 'Spooky & Tense'], ['family', 'Family Night'],
]
const platforms = [
  ['all', 'All Platforms'], ['netflix', 'Netflix'], ['hbo', 'Max / HBO'], ['apple', 'Apple TV+'],
  ['disney', 'Disney+'], ['prime', 'Prime Video'], ['hulu', 'Hulu'],
]

function Options({ list }) {
  return list.map(([value, label]) => <option key={value} value={value}>{label}</option>)
}

function Filters({ filters, setFilter, resultsCount, isCustom, onReset }) {
  return (
    <section className="filter-wrapper">
      <form className="glass-panel filter-panel" onSubmit={(e) => e.preventDefault()}>
        <header className="filter-header">
          <section className="filter-title-group">
            <i className="fa-solid fa-sliders"></i>
            <h2>Smart Filters</h2>
            <span className={isCustom ? 'status-badge' : 'status-badge hidden'}>Filters Applied</span>
          </section>
          <nav className="type-tabs">
            {types.map(([value, label]) => (
              <button key={value} type="button" onClick={() => setFilter('type', value)}
                className={filters.type === value ? 'type-btn active' : 'type-btn'}>{label}</button>
            ))}
          </nav>
        </header>

        <fieldset className="filter-grid">
          <section className="filter-group">
            <label htmlFor="genreSelect"><i className="fa-solid fa-tags icon-purple"></i> Genre</label>
            <select id="genreSelect" value={filters.genre} onChange={(e) => setFilter('genre', e.target.value)} className="custom-select">
              <Options list={genres} />
            </select>
          </section>
          <section className="filter-group">
            <label htmlFor="moodSelect"><i className="fa-solid fa-face-smile icon-gold"></i> Mood</label>
            <select id="moodSelect" value={filters.mood} onChange={(e) => setFilter('mood', e.target.value)} className="custom-select">
              <Options list={moods} />
            </select>
          </section>
          <section className="filter-group">
            <label htmlFor="platformSelect"><i className="fa-solid fa-tv icon-pink"></i> Platform</label>
            <select id="platformSelect" value={filters.platform} onChange={(e) => setFilter('platform', e.target.value)} className="custom-select">
              <Options list={platforms} />
            </select>
          </section>
          <section className="filter-group">
            <label htmlFor="ratingRange" className="label-with-value">
              <span><i className="fa-solid fa-star icon-gold"></i> Min IMDb Rating:</span>
              <span className="range-val">{filters.minRating.toFixed(1)}+</span>
            </label>
            <section className="range-wrapper">
              <input type="range" id="ratingRange" min="5" max="9" step="0.5" value={filters.minRating}
                onChange={(e) => setFilter('minRating', parseFloat(e.target.value))} className="custom-range" />
            </section>
          </section>
        </fieldset>

        <footer className="filter-footer">
          <span className="results-text">Showing <strong>{resultsCount}</strong> recommendations</span>
          <button type="button" onClick={onReset} className="btn-reset">
            <i className="fa-solid fa-rotate-right"></i> Reset All Filters
          </button>
        </footer>
      </form>
    </section>
  )
}

export default Filters
