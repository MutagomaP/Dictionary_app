/**
 * Validation cross-check — run with: node src/utils/validators.test.mjs
 */
import { validateSearchInput } from './validators.js';
import { validationMessages } from './errorMessages.js';

const CURLY_OPEN = '\u201C';
const CURLY_CLOSE = '\u201D';

const cases = [
  // Valid
  { input: 'hello', expectValid: true, trimmed: 'hello' },
  { input: 'beautiful', expectValid: true, trimmed: 'beautiful' },
  { input: '  hello  ', expectValid: true, trimmed: 'hello' },
  { input: '"beautiful"', expectValid: true, trimmed: 'beautiful' },
  { input: "'hello'", expectValid: true, trimmed: 'hello' },
  { input: "don't", expectValid: true, trimmed: "don't" },
  { input: 'well-being', expectValid: true, trimmed: 'well-being' },
  { input: "O'Brien", expectValid: true, trimmed: "O'Brien" },

  // Empty
  { input: '', expectValid: false, message: validationMessages.empty },
  { input: '   ', expectValid: false, message: validationMessages.empty },

  // Multiple words
  { input: 'hello world', expectValid: false, message: validationMessages.multipleWords },
  { input: 'hello   world', expectValid: false, message: validationMessages.multipleWords },
  { input: '"hello world"', expectValid: false, message: validationMessages.multipleWords },

  // Numbers
  { input: '123', expectValid: false, message: validationMessages.numbers },
  { input: 'hello123', expectValid: false, message: validationMessages.numbers },
  { input: 'beaut1ful', expectValid: false, message: validationMessages.numbers },
  { input: '"123"', expectValid: false, message: validationMessages.numbers },

  // Invalid characters / symbols
  { input: '@hello', expectValid: false, message: validationMessages.invalidCharacters },
  { input: 'hello!', expectValid: false, message: validationMessages.invalidCharacters },
  { input: 'beautiful!', expectValid: false, message: validationMessages.invalidCharacters },
  { input: 'hel@lo', expectValid: false, message: validationMessages.invalidCharacters },

  // Invalid quotes
  { input: '"dirty\'', expectValid: false, message: validationMessages.invalidQuotes },
  { input: "dirty'", expectValid: false, message: validationMessages.invalidQuotes },
  { input: '"dirty', expectValid: false, message: validationMessages.invalidQuotes },
  { input: 'dirty"', expectValid: false, message: validationMessages.invalidQuotes },
  { input: '""', expectValid: false, message: validationMessages.invalidQuotes },
  { input: "''", expectValid: false, message: validationMessages.invalidQuotes },
  {
    input: CURLY_OPEN + 'beautiful' + CURLY_CLOSE,
    expectValid: true,
    trimmed: 'beautiful',
  },
  {
    input: CURLY_OPEN + 'beautiful"',
    expectValid: false,
    message: validationMessages.invalidQuotes,
  },
];

let passed = 0;
let failed = 0;

for (const { input, expectValid, trimmed, message } of cases) {
  const result = validateSearchInput(input);
  const ok =
    result.isValid === expectValid &&
    (expectValid
      ? result.trimmed === trimmed
      : result.message === message);

  if (ok) {
    passed++;
  } else {
    failed++;
    console.error('FAIL:', JSON.stringify(input));
    console.error('  expected:', { expectValid, trimmed, message });
    console.error('  got:', result);
  }
}

console.log(`\n${passed} passed, ${failed} failed out of ${cases.length}`);
process.exit(failed > 0 ? 1 : 0);
