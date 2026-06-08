/**
 * Validates search input before making an API request.
 * Allows a single English word (letters, hyphens, apostrophes).
 */
import { validationMessages } from './errorMessages';

// Letters plus hyphen/apostrophe for words like "well-being" or "don't"
const SINGLE_WORD_PATTERN = /^[a-zA-Z]+(?:[-'][a-zA-Z]+)*$/;

const QUOTE_PAIRS = {
  '"': '"',
  "'": "'",
  '\u201C': '\u201D', // “
  '\u2018': '\u2019', // ‘
};

function isQuoteChar(char) {
  return char in QUOTE_PAIRS || char === '"' || char === "'";
}

function areMatchingQuotes(open, close) {
  return QUOTE_PAIRS[open] === close;
}

/**
 * Accepts plain words or a fully quoted word ("beautiful").
 * Rejects mismatched or partial quotes ("dirty').
 */
function parseQuotedInput(input) {
  const trimmed = (input || '').trim();

  if (!trimmed) {
    return { ok: true, value: '' };
  }

  const first = trimmed[0];
  const last = trimmed[trimmed.length - 1];
  const startsWithQuote = isQuoteChar(first);
  const endsWithQuote = isQuoteChar(last);

  if (!startsWithQuote && !endsWithQuote) {
    return { ok: true, value: trimmed };
  }

  if (startsWithQuote !== endsWithQuote) {
    return { ok: false };
  }

  if (!areMatchingQuotes(first, last)) {
    return { ok: false };
  }

  const inner = trimmed.slice(1, -1).trim();
  if (!inner) {
    return { ok: false };
  }

  return { ok: true, value: inner };
}

/** Returns cleaned word text when quoting is valid; otherwise the raw trim. */
export function normalizeInput(input) {
  const trimmed = (input || '').trim();
  const parsed = parseQuotedInput(trimmed);
  return parsed.ok ? parsed.value : trimmed;
}

export function validateSearchInput(input) {
  const raw = (input || '').trim();
  const parsed = parseQuotedInput(raw);

  if (!parsed.ok) {
    return {
      isValid: false,
      trimmed: raw,
      message: validationMessages.invalidQuotes,
    };
  }

  const trimmed = parsed.value;

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
