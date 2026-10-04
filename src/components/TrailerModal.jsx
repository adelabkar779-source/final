function TrailerModal({ url, onClose }) {
  if (!url) return null

  return (
    <aside className="overlay" onClick={onClose}>
      <article className="trailer-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="app-btn-close"><i className="fa-solid fa-xmark"></i></button>
        <figure className="trailer-aspect">
          <iframe src={url + '?autoplay=1'} title="Trailer Preview" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </figure>
      </article>
    </aside>
  )
}

export default TrailerModal
