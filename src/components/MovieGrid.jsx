export const typeLabels = { movie: 'Movie', series: 'TV Show', anime: 'Anime', doc: 'Documentary' }

function MovieCard({ item, isSaved, onOpen, onToggleSave }) {
  return (
    <article className="movie-card" onClick={() => onOpen(item)}>
      <figure className="card-poster-wrapper">
        <img src={item.poster} alt={item.title} className="card-poster" loading="lazy" />
        <span className="card-rating"><i className="fa-solid fa-star"></i> {item.rating}</span>
        <button type="button" className={isSaved ? 'card-bookmark saved' : 'card-bookmark'}
          onClick={(e) => { e.stopPropagation(); onToggleSave(item) }}>
          <i className="fa-solid fa-bookmark"></i>
        </button>
        <section className="card-meta-bottom">
          <span className="badge-type">{typeLabels[item.type] || 'Title'}</span>
          <span>{item.year}</span>
        </section>
      </figure>
      <section className="card-info">
        <section>
          <h4 className="card-title">{item.title}</h4>
          <p className="card-genres">{item.genresList.join(' • ')}</p>
        </section>
        <span className="card-mood-tag">{item.moodLabel}</span>
      </section>
    </article>
  )
}

function MovieGrid({ items, watchlist, sortBy, onSort, onOpen, onToggleSave, onReset }) {
  return (
    <section className="catalog-section">
      <header className="catalog-header">
        <section className="catalog-title-group">
          <h3>Top Recommendations <span className="ping-dot"></span></h3>
          <p>Curated selection matching your preferences</p>
        </section>
        <section className="sort-group">
          <label htmlFor="sortBy">Sort by:</label>
          <select id="sortBy" value={sortBy} onChange={(e) => onSort(e.target.value)} className="custom-select select-sm">
            <option value="rating">Highest Rated ★</option>
            <option value="year">Newest First 📅</option>
            <option value="title">Title A - Z 🔤</option>
          </select>
        </section>
      </header>

      <section className="catalog-grid">
        {items.map((item) => (
          <MovieCard key={item.id} item={item} isSaved={watchlist.some((w) => w.id === item.id)}
            onOpen={onOpen} onToggleSave={onToggleSave} />
        ))}
      </section>

      {items.length === 0 && (
        <section className="glass-panel empty-state">
          <figure className="empty-icon"><i className="fa-solid fa-film-slash"></i></figure>
          <h4>No Matches Found!</h4>
          <p>Try broadening your selected mood or lowering the IMDb rating slider.</p>
          <button type="button" onClick={onReset} className="app-btn btn-gradient">Reset Filters</button>
        </section>
      )}
    </section>
  )
}

export default MovieGrid
