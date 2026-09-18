import { useState } from 'react';
import { MovieContext } from './MovieContext';
import { useDebounce } from '../hooks/useDebounce';
import { useShows } from '../hooks/useShows';

export function MovieProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const debouncedSearch = useDebounce(submittedSearch, 400);

  const { displayShows, loading, error } =
    useShows(debouncedSearch);

  const clearSearch = () => {
    setSearchQuery('');
    setSubmittedSearch('');
  };

  const handleSearch = (queryText) => {
    const trimmedQuery = queryText.trim();
    setSearchQuery(trimmedQuery);
    setSubmittedSearch(trimmedQuery);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const value = {
    searchQuery,
    setSearchQuery,
    clearSearch,
    handleSearch,
    displayShows,
    loading,
    error,
    isSearchMode: submittedSearch.trim().length > 0,
    selectedMovie,
    openModal,
    closeModal,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}
