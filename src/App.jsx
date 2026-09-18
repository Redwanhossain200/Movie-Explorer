import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieProvider';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';

function App() {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;
