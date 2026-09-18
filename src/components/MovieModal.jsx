import { useEffect, useRef, useState } from 'react';
import { X, Star, Calendar, Tv, Globe, Clock, Tag } from 'lucide-react';

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function MovieModal({ show, onClose }) {
  const overlayRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  if (!show) return null;

  const {
    name,
    image,
    rating,
    premiered,
    summary,
    genres = [],
    network,
    webChannel,
    runtime,
    averageRuntime,
    status,
    language,
    type,
  } = show;

  const posterUrl =
    !imageError && (image?.original || image?.medium)
      ? image?.original || image?.medium
      : null;

  const ratingVal = rating?.average ? Number(rating.average).toFixed(1) : 'N/A';
  const networkName = network?.name || webChannel?.name || 'N/A';
  const duration = runtime || averageRuntime || null;
  const cleanSummary =
    stripHtml(summary) || 'No description available for this show.';

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/90 w-full max-w-4xl max-h-[94vh] sm:max-h-[90vh] flex flex-col my-auto transition-all">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800 bg-gray-950/80 shrink-0">
          <div className="flex items-center gap-2 pr-2 min-w-0">
            <span className="text-xs font-semibold bg-purple-600/30 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-md shrink-0">
              {type || 'Show'}
            </span>
            <h2
              id="modal-title"
              className="text-white font-bold text-base sm:text-xl truncate">
              {name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-3.5 sm:p-6 overscroll-contain">
          <div className="sm:hidden flex flex-col gap-3.5">
            <div className="flex items-start gap-3">
              <div className="w-24 min-[380px]:w-28 aspect-2/3 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 shadow-lg shrink-0">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 p-2 text-center">
                    <Tv className="w-8 h-8 opacity-30 text-purple-400 mb-1" />
                    <span className="text-[10px]">No Poster</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <h3 className="text-white font-extrabold text-base min-[380px]:text-lg leading-tight line-clamp-2">
                  {name}
                </h3>

                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="inline-flex items-center gap-1 bg-yellow-500/15 text-yellow-400 px-2 py-0.5 rounded-md border border-yellow-500/25 font-semibold">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{ratingVal}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-md border border-purple-500/25 font-medium">
                    <Calendar className="w-3 h-3" />
                    <span>{premiered?.slice(0, 4) || 'N/A'}</span>
                  </span>

                  {duration && (
                    <span className="inline-flex items-center gap-1 bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded-md border border-blue-500/25 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{duration}m</span>
                    </span>
                  )}
                </div>

                {status && (
                  <span
                    className={`self-start text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      status === 'Running'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                        : 'bg-gray-950/80 text-gray-300 border-gray-600/40'
                    }`}>
                    {status}
                  </span>
                )}
              </div>
            </div>

            {genres.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <Tag className="w-3 h-3 text-gray-500" />
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-[11px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-md border border-gray-700/60">
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-800/60 rounded-xl p-2.5 border border-gray-800">
                <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold mb-0.5">
                  Network
                </p>
                <p className="text-gray-200 font-medium flex items-center gap-1.5 truncate">
                  <Tv className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">{networkName}</span>
                </p>
              </div>

              <div className="bg-gray-800/60 rounded-xl p-2.5 border border-gray-800">
                <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold mb-0.5">
                  Language
                </p>
                <p className="text-gray-200 font-medium flex items-center gap-1.5 truncate">
                  <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">{language || 'English'}</span>
                </p>
              </div>
            </div>

            <div className="space-y-1 pt-1.5 border-t border-gray-800/80">
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
                Overview
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed whitespace-normal wrap-break-word">
                {cleanSummary}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex flex-row items-start gap-6 md:gap-8">
            <div className="sm:w-56 md:w-64 lg:w-72 shrink-0 sticky top-0">
              <div className="relative w-full aspect-2/3 rounded-xl overflow-hidden bg-gray-800 border border-gray-700/80 shadow-2xl shadow-purple-950/30">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 p-3 text-center">
                    <Tv className="w-16 h-16 opacity-30 text-purple-400 mb-2" />
                    <span className="text-xs">No Poster Available</span>
                  </div>
                )}
                {status && (
                  <div className="absolute top-2 left-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold backdrop-blur-md border ${
                        status === 'Running'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                          : 'bg-gray-950/80 text-gray-300 border-gray-600/40'
                      }`}>
                      {status}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-4">
              <div>
                <h3 className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl leading-tight">
                  {name}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 bg-yellow-500/15 text-yellow-400 px-2.5 py-1 rounded-lg border border-yellow-500/25 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span>Rating: {ratingVal}</span>
                </span>

                <span className="inline-flex items-center gap-1 bg-purple-500/15 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-500/25 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Release: {premiered || 'N/A'}</span>
                </span>

                {duration && (
                  <span className="inline-flex items-center gap-1 bg-blue-500/15 text-blue-300 px-2.5 py-1 rounded-lg border border-blue-500/25 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{duration} min</span>
                  </span>
                )}
              </div>

              {genres.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gray-500" />
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="text-xs bg-gray-800/90 text-gray-300 px-2 py-0.5 rounded-md border border-gray-700/60">
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-800">
                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-0.5">
                    Network
                  </p>
                  <p className="text-gray-200 font-medium flex items-center gap-1.5 truncate">
                    <Tv className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{networkName}</span>
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-800">
                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-0.5">
                    Language
                  </p>
                  <p className="text-gray-200 font-medium flex items-center gap-1.5 truncate">
                    <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{language || 'English'}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1 border-t border-gray-800/60">
                <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider">
                  Overview
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-normal wrap-break-word">
                  {cleanSummary}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-3.5 border-t border-gray-800 bg-gray-950/80 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 sm:py-2 bg-gray-800 hover:bg-gray-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all border border-gray-700 cursor-pointer">
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
