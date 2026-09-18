import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'
import { useMovieContext } from '../hooks/useMovieContext'
import { Loader2, SearchX, Film, AlertCircle, RefreshCw } from 'lucide-react'

export default function MoviesPage() {
  const {
    searchQuery,
    setSearchQuery,
    clearSearch,
    handleSearch,
    displayShows,
    loading,
    error,
    isSearchMode,
    selectedMovie,
    openModal,
    closeModal,
  } = useMovieContext()

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        <div className="bg-linear-to-b from-gray-900/90 via-gray-900/50 to-gray-950 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">
              <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              <span>Movie &amp; Show Database</span>
            </div>

            <h1 className="text-2xl min-[480px]:text-3xl sm:text-4xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight">
              {isSearchMode ? (
                <>
                  Results for <span className="text-purple-400 wrap-break-word">"{searchQuery}"</span>
                </>
              ) : (
                'Browse All Shows'
              )}
            </h1>

            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={clearSearch}
              onSearch={handleSearch}
            />

            {!loading && !error && (
              <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4 text-center sm:text-left">
                {isSearchMode ? (
                  <>
                    Found <span className="text-purple-400 font-semibold">{displayShows.length}</span>{' '}
                    matching {displayShows.length === 1 ? 'title' : 'titles'}
                  </>
                ) : (
                  <>
                    Showing <span className="text-purple-400 font-semibold">{displayShows.length}</span> shows
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10">
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
              <div className="p-3.5 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-4">
                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
              </div>
              <h2 className="text-white font-bold text-base sm:text-lg mb-2">
                Unable to load shows
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {loading && !error && (
            <div className="flex flex-col items-center justify-center py-20 sm:py-28 text-center">
              <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 animate-spin mb-4" />
              <p className="text-gray-300 text-sm font-medium">
                {isSearchMode ? 'Searching shows...' : 'Loading movies and shows...'}
              </p>
              <p className="text-gray-500 text-xs mt-1">Please wait a moment</p>
            </div>
          )}

          {!loading && !error && isSearchMode && displayShows.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
              <div className="p-4 bg-gray-900 border border-gray-800 rounded-2xl mb-4">
                <SearchX className="w-10 h-10 text-purple-400/80" />
              </div>
              <h2 className="text-white font-bold text-lg sm:text-xl mb-2">
                No shows found
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                We couldn't find any results for "{searchQuery}". Try searching with different keywords.
              </p>
              <button
                onClick={clearSearch}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer shadow-md shadow-purple-900/30"
              >
                Browse All Shows
              </button>
            </div>
          )}

          {/* 2 columns on mobile so cards are sleek & compact, not huge! */}
          {!loading && !error && displayShows.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 md:gap-6">
              {displayShows.map((show) => (
                <MovieCard key={show.id} show={show} onSelect={openModal} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {selectedMovie && (
        <MovieModal show={selectedMovie} onClose={closeModal} />
      )}
    </div>
  )
}