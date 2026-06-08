/**
 * Global state for the dictionary app (React Context API).
 *
 * Holds: history, currentWord, wordData, loading, error
 * All screens access this via the useDictionary() hook.
 */
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { fetchWord } from '../services/dictionaryApi';
import {
  clearSearchHistoryStorage,
  loadSearchHistory,
  saveSearchHistory,
} from '../services/historyStorage';
import { validateSearchInput } from '../utils/validators';

export const SearchHistoryContext = createContext(null);

const MAX_HISTORY = 20;

export function SearchHistoryProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [historyReady, setHistoryReady] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Restore saved history when the app starts or refreshes
  useEffect(() => {
    let active = true;

    loadSearchHistory().then((saved) => {
      if (active) {
        setHistory(saved);
        setHistoryReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // Keep AsyncStorage in sync whenever history changes
  useEffect(() => {
    if (!historyReady) return;
    saveSearchHistory(history);
  }, [history, historyReady]);

  // Adds word to top of history; removes duplicates; keeps max 20 items
  const addToHistory = useCallback((word) => {
    const normalized = word.trim().toLowerCase();
    setHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== normalized
      );
      return [word.trim(), ...filtered].slice(0, MAX_HISTORY);
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const removeFromHistory = useCallback((word) => {
    const normalized = word.trim().toLowerCase();
    setHistory((prev) =>
      prev.filter((item) => item.toLowerCase() !== normalized)
    );
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    clearSearchHistoryStorage();
  }, []);

  // Main search action: validates input, calls API, updates state
  const searchWord = useCallback(
    async (word) => {
      const validation = validateSearchInput(word);
      if (!validation.isValid) {
        setError({ name: 'ValidationError', message: validation.message });
        return { success: false };
      }

      const trimmed = validation.trimmed;
      setLoading(true);
      setError(null);
      setCurrentWord(trimmed);
      setWordData(null); // Clear previous results while loading

      try {
        const data = await fetchWord(trimmed);
        setWordData(data);
        addToHistory(trimmed);
        return { success: true, data };
      } catch (err) {
        setWordData(null);
        setError(err);
        return { success: false, error: err };
      } finally {
        setLoading(false);
      }
    },
    [addToHistory]
  );

  // Re-runs the last failed search using currentWord
  const retry = useCallback(() => {
    if (currentWord) {
      return searchWord(currentWord);
    }
    return Promise.resolve({ success: false });
  }, [currentWord, searchWord]);

  const value = {
    history,
    currentWord,
    wordData,
    loading,
    error,
    searchWord,
    addToHistory,
    removeFromHistory,
    clearHistory,
    retry,
    clearError,
  };

  return (
    <SearchHistoryContext.Provider value={value}>
      {children}
    </SearchHistoryContext.Provider>
  );
}
