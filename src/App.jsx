import { useState, useEffect, useMemo } from 'react'
import { catalogData } from './data'
import Header from './components/Header'
import Hero from './components/Hero'
import Filters from './components/Filters'
import MovieGrid from './components/MovieGrid'
import Footer from './components/Footer'
import DetailModal from './components/DetailModal'
import TrailerModal from './components/TrailerModal'
import SpinWheel from './components/SpinWheel'
import WatchlistDrawer from './components/WatchlistDrawer'
import TrendingNow from './components/TrendingNow'

const defaultFilters = { type: 'all', genre: 'all', mood: 'all', platform: 'all', minRating: 5.0 }

function App() {
  // ---- state (replaces activeFilters, watchlist, activeCurrentItem ...) ----
  const [filters, setFilters] = useState(defaultFilters)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem('wsiw_watchlist_en')) || [])
  const [detailItem, setDetailItem] = useState(null)
  const [trailerUrl, setTrailerUrl] = useState(null)
  const [showWheel, setShowWheel] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  // save the watchlist whenever it changes
  useEffect(() => {
    localStorage.setItem('wsiw_watchlist_en', JSON.stringify(watchlist))
  }, [watchlist])

  // ---- filtering + sorting (replaces applyFilters) ----
  const visibleItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return catalogData
      .filter((item) => {
        if (filters.type !== 'all' && item.type !== filters.type) return false
        if (filters.genre !== 'all' && item.genre !== filters.genre) return false
        if (filters.mood !== 'all' && item.mood !== filters.mood) return false
        if (filters.platform !== 'all' && !item.platforms.includes(filters.platform)) return false
        if (item.rating < filters.minRating) return false
        if (q && !item.title.toLowerCase().includes(q) && !item.overview.toLowerCase().includes(q) && !item.cast.toLowerCase().includes(q)) return false
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'year') return b.year - a.year
        return a.title.localeCompare(b.title)
      })
  }, [filters, searchQuery, sortBy])

  const isCustom = filters.type !== 'all' || filters.genre !== 'all' || filters.mood !== 'all' ||
    filters.platform !== 'all' || filters.minRating > 5

  // ---- handlers ----
  const setFilter = (key, value) => setFilters({ ...filters, [key]: value })

  function resetFilters() {
    setFilters(defaultFilters)
    setSearchQuery('')
  }

  function goHome() {
    resetFilters()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function pickMood(mood) {
    setFilter('mood', mood)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  function toggleSave(item) {
    const saved = watchlist.some((w) => w.id === item.id)
    setWatchlist(saved ? watchlist.filter((w) => w.id !== item.id) : [...watchlist, item])
  }

  function pickRandom() {
    const randomItem = catalogData[Math.floor(Math.random() * catalogData.length)]
    setShowWheel(false)
    setDetailItem(randomItem)
  }

   return (
    <>
      <Header searchQuery={searchQuery} onSearch={setSearchQuery} watchlistCount={watchlist.length}
        onOpenWheel={() => setShowWheel(true)} onOpenWatchlist={() => setShowDrawer(true)} onGoHome={goHome} />

      <main className="main-content">
        <Hero onPickMood={pickMood} />
        <TrendingNow />
        <Filters filters={filters} setFilter={setFilter} resultsCount={visibleItems.length}
          isCustom={isCustom} onReset={resetFilters} />
        <MovieGrid items={visibleItems} watchlist={watchlist} sortBy={sortBy} onSort={setSortBy}
          onOpen={setDetailItem} onToggleSave={toggleSave} onReset={resetFilters} />
      </main>

      <Footer onOpenWheel={() => setShowWheel(true)} onOpenWatchlist={() => setShowDrawer(true)} onGoHome={goHome} />

      <DetailModal item={detailItem} isSaved={detailItem ? watchlist.some((w) => w.id === detailItem.id) : false}
        onClose={() => setDetailItem(null)} onToggleSave={toggleSave}
        onPlayTrailer={() => setTrailerUrl(detailItem.trailerUrl)} />
      <TrailerModal url={trailerUrl} onClose={() => setTrailerUrl(null)} />
      {showWheel && <SpinWheel onClose={() => setShowWheel(false)} onPick={pickRandom} />}
      {showDrawer && <WatchlistDrawer watchlist={watchlist} onClose={() => setShowDrawer(false)}
        onRemove={toggleSave} onClear={() => setWatchlist([])} />}
    </>
  )
}

export default App
