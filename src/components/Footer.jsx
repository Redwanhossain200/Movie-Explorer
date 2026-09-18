import { Film } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
            <Link
              to="/"
              className="flex items-center gap-2 group"
              aria-label="MovieExplorer">
              <div className="p-1.5 bg-purple-600 rounded-lg group-hover:bg-purple-500 transition-colors">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Movie<span className="text-purple-400">Explorer</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm max-w-sm">
              Discover and explore movies &amp; TV shows from around the world.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/80 rounded-xl transition-all border border-transparent hover:border-gray-700"
              aria-label="GitHub">
              <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/80 rounded-xl transition-all border border-transparent hover:border-gray-700"
              aria-label="Twitter / X">
              <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <Link
              to="/movies"
              className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/80 rounded-xl transition-all border border-transparent hover:border-gray-700"
              aria-label="Browse Movies">
              <Film className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} MovieExplorer. All rights
            reserved.
          </p>
          <p className="text-gray-500 text-xs flex items-center justify-center sm:justify-end gap-1">
            <span>Created for movie enthusiasts</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
