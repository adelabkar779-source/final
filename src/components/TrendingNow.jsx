import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_TMDB_KEY
const IMG = 'https://image.tmdb.org/t/p/w500'

function TrendingNow() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
        if (!res.ok) throw new Error('Request failed: ' + res.status)
        const data = await res.json()
        setMovies(data.results.slice(0, 10))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p>Loading trending movies...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section className="catalog-section">
      <header className="catalog-header">
        <section className="catalog-title-group">
          <h3>Trending This Week</h3>
          <p>Live data from TMDB</p>
        </section>
      </header>

        <section className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
         {movies.map((m) => (
        <section key={m.id} className="col">
         <article className="movie-card">
         <figure className="card-poster-wrapper">
          {m.poster_path && <img src={IMG + m.poster_path} alt={m.title} className="card-poster" />}
          <span className="card-rating">
            <i className="fa-solid fa-star"></i> {m.vote_average.toFixed(1)}
          </span>
        </figure>
        <section className="card-info">
          <h4 className="card-title">{m.title}</h4>
          <p className="card-genres">{m.release_date?.slice(0, 4)}</p>
        </section>
             </article>
         </section>
          ))}
    </section>
     </section>
  )
}

export default TrendingNow