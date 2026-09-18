import { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
}
