function WatchlistDrawer({ watchlist, onClose, onRemove, onClear }) {
  return (
    <aside className="drawer-overlay" onClick={onClose}>
      <article className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <header className="drawer-header">
          <section className="drawer-title-group">
            <i className="fa-solid fa-bookmark icon-gold"></i>
            <h3>My Saved Watchlist</h3>
          </section>
          <button type="button" onClick={onClose} className="btn-close-simple"><i className="fa-solid fa-xmark"></i></button>
        </header>

        <section className="drawer-body">
          {watchlist.length === 0 ? (
            <section className="empty-state">
              <i className="fa-solid fa-bookmark icon-gold"></i>
              <p>Your watchlist is empty!</p>
            </section>
          ) : (
            watchlist.map((item) => (
              <article key={item.id} className="watchlist-item">
                <img src={item.poster} className="watchlist-poster" alt="" />
                <section className="watchlist-info">
                  <h5 className="watchlist-title">{item.title}</h5>
                  <span className="watchlist-meta">★ {item.rating} • {item.year}</span>
                </section>
                <button type="button" onClick={() => onRemove(item)} className="btn-delete">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </article>
            ))
          )}
        </section>

        <footer className="drawer-footer">
          <button type="button" onClick={onClear} className="app-btn-danger">Clear Watchlist</button>
        </footer>
      </article>
    </aside>
  )
}

export default WatchlistDrawer
