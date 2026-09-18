import { useNavigate } from 'react-router-dom';
import { Play, ChevronRight, Star, Tv, Popcorn, Sparkles } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const STATS = [
  { icon: Tv, label: 'TV Shows', value: '10,000+' },
  { icon: Star, label: 'Top Rated', value: '500+' },
  { icon: Popcorn, label: 'Genres', value: '20+' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex items-center justify-center relative overflow-hidden pt-20 sm:pt-28 pb-14 sm:pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 pointer-events-none opacity-75 sm:opacity-80 transition-transform duration-1000"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-gray-950/60 via-gray-950/40 to-gray-950 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-gray-950/70 via-gray-950/25 to-purple-950/40 pointer-events-none" />

        <div className="absolute top-1/4 -left-20 sm:-left-32 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 sm:-right-32 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 bg-purple-900/50 border border-purple-500/40 px-3.5 py-1.5 rounded-full mb-4 sm:mb-6 shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Discover Top Movies &amp; TV Series</span>
          </div>

          <h1 className="text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl font-black text-white mb-3 sm:mb-5 leading-[1.15] tracking-tight drop-shadow-md">
            DISCOVER{' '}
            <span className="block sm:inline bg-linear-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              MOVIES
            </span>
          </h1>

          <p className="text-xs min-[400px]:text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto leading-relaxed drop-shadow">
            Explore and discover your favorite movies and TV shows from around
            the world. Search, browse, and dive into detailed information — all
            in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-xs sm:max-w-none">
            <button
              onClick={() => navigate('/movies')}
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-xl shadow-purple-900/50 hover:shadow-purple-700/60 cursor-pointer">
              <Play className="w-4 h-4 fill-white" />
              <span>Explore Now</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/movies')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-gray-600 hover:border-purple-400 hover:bg-gray-800/70 active:scale-95 text-gray-200 hover:text-white font-medium text-sm sm:text-base rounded-xl transition-all cursor-pointer backdrop-blur-md shadow-lg">
              Browse All Shows
            </button>
          </div>

          <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg w-full">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-1 p-2.5 sm:p-4 bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-700/60 shadow-lg">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mb-0.5 sm:mb-1" />
                <span className="text-white font-bold text-xs min-[400px]:text-sm sm:text-lg">
                  {value}
                </span>
                <span className="text-gray-300 text-[10px] min-[400px]:text-xs text-center truncate w-full">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
