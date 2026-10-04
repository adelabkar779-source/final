import { typeLabels } from './MovieGrid'

function DetailModal({ item, isSaved, onClose, onToggleSave, onPlayTrailer }) {
  if (!item) return null

  return (
    <aside className="overlay" onClick={onClose}>
      <article className="glass-panel modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="app-btn-close"><i className="fa-solid fa-xmark"></i></button>

        <figure className="modal-backdrop-bg" style={{ backgroundImage: `url('${item.backdrop}')` }}>
          <span className="backdrop-gradient"></span>
          <button type="button" onClick={onPlayTrailer} className="play-overlay-btn">
            <span className="play-circle"><i className="fa-solid fa-play"></i></span>
          </button>
        </figure>

        <section className="app-modal-body">
          <section className="modal-content-grid">
            <img src={item.poster} alt={item.title} className="modal-poster" />
            <section className="modal-details">
              <section className="modal-meta-row">
                <span className="badge-type">{typeLabels[item.type] || 'Title'}</span>
                <span className="meta-item">{item.year}</span>
                <span className="meta-item">{item.duration}</span>
                <span className="badge-age">{item.age}</span>
              </section>
              <h2 className="app-modal-title">{item.title}</h2>
              <section className="modal-rating-row">
                <span className="rating-chip">
                  <i className="fa-solid fa-star"></i> <span>{item.rating}</span>
                  <span className="rating-max">/ 10 IMDb</span>
                </span>
                <section className="platform-chips">
                  {item.platforms.map((p) => <span key={p} className="badge-type">{p}</span>)}
                </section>
              </section>
              <p className="modal-description">{item.overview}</p>
              <section className="modal-info-box">
                <section><span className="info-label">Cast:</span> <span className="info-val">{item.cast}</span></section>
                <section><span className="info-label">Recommended Mood:</span> <span className="info-val gold">{item.moodLabel}</span></section>
              </section>
              <section className="modal-action-btns">
                <button type="button" onClick={() => onToggleSave(item)} className="app-btn app-btn-secondary">
                  <i className="fa-solid fa-bookmark"></i> <span>{isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                </button>
                <button type="button" onClick={onPlayTrailer} className="app-btn btn-gradient">
                  <i className="fa-solid fa-play"></i> Watch Trailer
                </button>
              </section>
            </section>
          </section>
        </section>
      </article>
    </aside>
  )
}

export default DetailModal
