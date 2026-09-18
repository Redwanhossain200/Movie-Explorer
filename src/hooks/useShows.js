import { useState, useEffect, useRef } from 'react'

const ALL_SHOWS_URL = 'https://api.tvmaze.com/shows'
const SEARCH_URL = (q) => `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(q)}`

export function useShows(searchQuery = '') {
  const [allShows, setAllShows] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(ALL_SHOWS_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load shows from the database')
        return res.json()
      })
      .then((data) => {
        setAllShows(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Failed to fetch shows. Please check your network and try again.')
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const trimmedQuery = searchQuery.trim()

    if (!trimmedQuery) {
      setSearchResults([])
      setSearching(false)
      return
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller
    setSearching(true)

    fetch(SEARCH_URL(trimmedQuery), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Search request failed')
        return res.json()
      })
      .then((data) => {
        setSearchResults(data.map((item) => item.show))
        setSearching(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setSearching(false)
        }
      })

    return () => controller.abort()
  }, [searchQuery])

  const isSearchMode = searchQuery.trim().length > 0
  const displayShows = isSearchMode ? searchResults : allShows
  const isLoading = isSearchMode ? searching : loading

  return {
    allShows,
    searchResults,
    displayShows,
    loading: isLoading,
    error,
    isSearchMode,
  }
}