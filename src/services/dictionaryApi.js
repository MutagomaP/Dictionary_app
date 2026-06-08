/**
 * Dictionary API Service
 *
 * All HTTP requests to the Free Dictionary API are handled here.
 * Screens and context never call the API directly — they use fetchWord().
 */

import axios from 'axios';

// API URL: append the searched word to this base path.
// Full example: https://api.dictionaryapi.dev/api/v2/entries/en/hello
const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

/** Thrown when the API returns 404 or "No Definitions Found". */
export class WordNotFoundError extends Error {
  constructor(message = 'Word not found') {
    super(message);
    this.name = 'WordNotFoundError';
  }
}

/** Thrown when the request was sent but no response was received (offline, timeout). */
export class NetworkError extends Error {
  constructor(message = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

/** Thrown for any other HTTP or unexpected failure. */
export class ApiError extends Error {
  constructor(message = 'Unable to fetch data') {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Fetches word definitions from the Free Dictionary API.
 * Throws typed errors for not-found, network, and general API failures.
 */
export async function fetchWord(word) {
  // encodeURIComponent keeps special characters safe in the URL
  const url = `${BASE_URL}/${encodeURIComponent(word)}`;

  try {
    const response = await axios.get(url);
    return response.data; // Array of word entries from the API
  } catch (error) {
    // Server responded with an error status (4xx / 5xx)
    if (error.response) {
      const { status, data } = error.response;

      if (
        status === 404 ||
        data?.title === 'No Definitions Found'
      ) {
        throw new WordNotFoundError();
      }

      throw new ApiError();
    }

    // Request was made but no response arrived (network issue)
    if (error.request) {
      throw new NetworkError();
    }

    throw new ApiError();
  }
}
