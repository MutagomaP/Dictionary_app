/**
 * Validates search input before making an API request.
 * Allows a single English word (letters, hyphens, apostrophes).
 */
import { validationMessages } from './errorMessages';

// Letters plus hyphen/apostrophe for words like "well-being" or "don't"
const SINGLE_WORD_PATTERN = /^[a-zA-Z]+(?:[-'][a-zA-Z]+)*$/;

/** Removes surrounding whitespace and optional quote characters. */
export function normalizeInput(input) {
  let trimmed = (input || '').trim();
  trimmed = trimmed.replace(/^["'""'']+|["'""'']+$/g, '');
  return trimmed.trim();
}

export function validateSearchInput(input) {
  const trimmed = normalizeInput(input);

  if (!trimmed) {
    return {
      isValid: false,
      trimmed: '',
      message: validationMessages.empty,
    };
  }

  // More than one word (sentence or phrase)
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return {
      isValid: false,
      trimmed,
      message: validationMessages.multipleWords,
    };
  }

  // Numbers in the input
  if (/\d/.test(trimmed)) {
    return {
      isValid: false,
      trimmed,
      message: validationMessages.numbers,
    };
  }

  // Symbols or other non-letter characters (not digits — handled above)
  if (!SINGLE_WORD_PATTERN.test(trimmed)) {
    return {
      isValid: false,
      trimmed,
      message: validationMessages.invalidCharacters,
    };
  }

  return {
    isValid: true,
    trimmed,
    message: '',
  };
}
