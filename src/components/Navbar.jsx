import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Clapperboard, Home, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020b16]/90 backdrop-blur-md border-b border-white/10 shadow-[0_8px_24px_rgba(2,11,22,0.55)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="MovieExplorer Home">
            <div className="p-2 bg-linear-to-tr from-purple-700 to-purple-500 rounded-xl group-hover:from-purple-600 group-hover:to-pink-500 transition-all shadow-md shadow-purple-900/40">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-black text-xl tracking-tight">
              Movie<span className="text-purple-400">Explorer</span>
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                location.pathname === '/'
                  ? 'text-white bg-purple-600/20 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/80 border border-transparent'
              }`}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/movies"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all shadow-sm ${
                location.pathname === '/movies'
                  ? 'bg-purple-600 text-white shadow-purple-900/50 ring-2 ring-purple-400/30'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/30 active:scale-95'
              }`}>
              <Clapperboard className="w-4 h-4" />
              <span>Movies</span>
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/80 rounded-xl transition-colors focus:outline-none border border-gray-800 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-purple-400" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="sm:hidden border-b border-gray-800 bg-gray-950/98 backdrop-blur-xl px-4 pt-3 pb-4 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === '/'
                  ? 'text-white bg-purple-600/25 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-900 border border-transparent'
              }`}>
              <Home className="w-4 h-4 text-purple-400" />
              <span>Home</span>
            </Link>

            <Link
              to="/movies"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === '/movies'
                  ? 'text-white bg-purple-600/25 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-900 border border-transparent'
              }`}>
              <Clapperboard className="w-4 h-4 text-purple-400" />
              <span>Movies</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
