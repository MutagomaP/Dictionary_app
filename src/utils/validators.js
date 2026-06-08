/**
 * Validates search input before making an API request.
 * Allows a single English word (letters, hyphens, apostrophes).
 */
import { validationMessages } from './errorMessages.js';

// Letters plus hyphen/apostrophe for words like "well-being" or "don't"
const SINGLE_WORD_PATTERN = /^[a-zA-Z]+(?:[-'][a-zA-Z]+)*$/;

function isQuoteChar(char) {
  const code = char.charCodeAt(0);
  return (
    code === 34 ||
    code === 39 ||
    code === 0x201c ||
    code === 0x201d ||
    code === 0x2018 ||
    code === 0x2019
  );
}

function areMatchingQuotes(open, close) {
  const openCode = open.charCodeAt(0);
  const closeCode = close.charCodeAt(0);

  return (
    (openCode === 34 && closeCode === 34) ||
    (openCode === 39 && closeCode === 39) ||
    (openCode === 0x201c && closeCode === 0x201d) ||
    (openCode === 0x2018 && closeCode === 0x2019)
  );
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
