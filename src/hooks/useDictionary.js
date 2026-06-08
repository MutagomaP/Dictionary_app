/**
 * Custom hook — the single entry point for screens to read/update dictionary state.
 * Returns: history, wordData, loading, error, searchWord, retry, clearError, etc.
 */
import { useContext } from 'react';
import { SearchHistoryContext } from '../context/SearchHistoryContext';

export function useDictionary() {
  const context = useContext(SearchHistoryContext);

  if (!context) {
    throw new Error('useDictionary must be used within a SearchHistoryProvider');
  }

  return context;
}
