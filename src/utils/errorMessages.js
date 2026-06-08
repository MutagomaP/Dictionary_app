/**
 * Friendly, user-facing error copy used across the app.
 */

export const validationMessages = {
  empty: 'Type a word in the search box and we’ll look it up for you.',
  multipleWords:
    'We can search one word at a time. Try entering just a single word.',
  numbers:
    'It looks like you entered numbers. Try an English word instead, like hello or beautiful.',
  invalidCharacters:
    'That doesn’t look quite right. Use letters only — for example, dictionary or world.',
  invalidQuotes:
    'Your quotes don’t match. Type the word without quotes, or wrap it fully — like beautiful or "beautiful".',
};

export const apiMessages = {
  wordNotFound: {
    title: 'Hmm, we couldn’t find that word',
    message:
      'Double-check the spelling, or try searching for a similar word.',
  },
  network: {
    title: 'No internet connection',
    message:
      'Please check your connection and try again when you’re back online.',
  },
  general: {
    title: 'Something went wrong',
    message:
      'We couldn’t load the definition right now. Please try again in a moment.',
  },
};
