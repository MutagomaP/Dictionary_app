/**
 * Persists search history locally with AsyncStorage.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@dictionary_search_history';

export async function loadSearchHistory() {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveSearchHistory(history) {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Storage failures should not break the app.
  }
}

export async function clearSearchHistoryStorage() {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch {
    // Storage failures should not break the app.
  }
}
