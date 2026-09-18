import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a movie or TV show..."
          className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 rounded-xl py-3 sm:py-3.5 pl-10 sm:pl-12 pr-20 sm:pr-28 text-xs sm:text-sm transition-all shadow-inner"
        />

        <div className="absolute right-1.5 sm:right-2 flex items-center gap-1 sm:gap-1.5">
          {value && (
            <button
              type="button"
              onClick={onClear}
              className="p-1 sm:p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800 focus:outline-none"
              aria-label="Clear search">
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          <button
            type="submit"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white text-xs sm:text-sm font-medium rounded-lg transition-all shadow-sm cursor-pointer">
            <Search className="w-3.5 h-3.5 sm:hidden" />
            <span className="hidden min-[420px]:inline">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
