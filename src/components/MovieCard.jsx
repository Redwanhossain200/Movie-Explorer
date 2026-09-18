import { useState } from 'react'
import { Star, Calendar, Eye, Film } from 'lucide-react'

export default function MovieCard({ show, onSelect }) {
  const [imageError, setImageError] = useState(false)
  const { name, image, rating, premiered, genres } = show

  const posterUrl =
    !imageError && (image?.medium || image?.original)
      ? image?.medium || image?.original
      : null
  const ratingVal = rating?.average ? Number(rating.average).toFixed(1) : 'N/A'
  const year = premiered ? premiered.slice(0, 4) : 'N/A'
  const genre = genres && genres.length > 0 ? genres[0] : null

  return (
    <div className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1 flex flex-col w-full mx-auto">
      {/* Poster area */}
      <div className="relative overflow-hidden aspect-2/3 bg-gray-800/80">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 p-2 sm:p-4 text-center">
            <Film className="w-8 h-8 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 opacity-30 text-purple-400" />
            <span className="text-[10px] sm:text-xs opacity-60">No Poster</span>
          </div>
        )}

        {/* Top gradient shadow for badge readability */}
        <div className="absolute inset-x-0 top-0 h-12 sm:h-16 bg-linear-to-b from-black/60 to-transparent pointer-events-none" />

        {/* Genre badge */}
        {genre && (
          <span className="absolute top-2 left-2 text-[10px] sm:text-xs font-medium bg-purple-600/90 text-white px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm border border-purple-400/20">
            {genre}
          </span>
        )}
      </div>

      {/* Details info */}
      <div className="p-2.5 sm:p-3.5 md:p-4 flex flex-col flex-1 gap-1.5 sm:gap-2.5">
        <h3
          className="text-white font-semibold text-xs sm:text-sm md:text-base leading-snug line-clamp-1 sm:line-clamp-2 group-hover:text-purple-300 transition-colors"
          title={name}
        >
          {name}
        </h3>

        {/* Rating and Year meta row */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-400">
          <span className="inline-flex items-center gap-1 bg-gray-800/80 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border border-gray-700/50">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-semibold">{ratingVal}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-gray-400">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
            <span>{year}</span>
          </span>
        </div>

        {/* See Details Button */}
        <button
          onClick={() => onSelect(show)}
          className="mt-auto w-full flex items-center justify-center gap-1.5 sm:gap-2 min-h-8.5 sm:min-h-9.5 py-1.5 sm:py-2 px-2 sm:px-3 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white text-[11px] sm:text-xs md:text-sm font-medium rounded-lg transition-all shadow-md shadow-purple-900/20 active:scale-[0.98] cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>See Details</span>
        </button>
      </div>
    </div>
  )
}