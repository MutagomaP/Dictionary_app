/**
 * Helpers for parsing phonetics from the dictionary API response.
 */

const REGION_ORDER = ['us', 'uk', 'au'];

export const PRONUNCIATION_TYPES = {
  us: { code: 'us', short: 'US', label: 'US Pronunciation', flag: '🇺🇸' },
  uk: { code: 'uk', short: 'UK', label: 'UK Pronunciation', flag: '🇬🇧' },
  au: {
    code: 'au',
    short: 'AU',
    label: 'Australian Pronunciation',
    flag: '🇦🇺',
  },
  general: {
    code: 'general',
    short: '',
    label: 'Pronunciation',
    flag: '🔊',
  },
};

/** Normalizes a single audio URL (handles protocol-relative // URLs). */
export function normalizeAudioUrl(raw) {
  if (!raw) return null;
  const url = raw.trim();
  if (!url) return null;
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('http')) return url;
  return null;
}

/**
 * Detects pronunciation region from API audio filenames.
 * Falls back to general when audio exists but has no region tag.
 */
export function getPronunciationType(audioUrl) {
  if (!audioUrl) return null;

  const lower = audioUrl.toLowerCase();

  if (/-us\.mp3/.test(lower) || /-us-/.test(lower)) {
    return PRONUNCIATION_TYPES.us;
  }
  if (/-uk\.mp3/.test(lower) || /-uk-/.test(lower)) {
    return PRONUNCIATION_TYPES.uk;
  }
  if (/-au\.mp3/.test(lower) || /-au-/.test(lower)) {
    return PRONUNCIATION_TYPES.au;
  }

  return PRONUNCIATION_TYPES.general;
}

/**
 * Returns all pronunciations that have audio — regional (US, UK, AU) plus
 * general audio with no region in the filename. Text-only entries are skipped.
 */
export function getPhoneticEntries(phonetics = []) {
  const withAudio = phonetics
    .map((phonetic, index) => {
      const audioUrl = normalizeAudioUrl(phonetic?.audio);
      const type = getPronunciationType(audioUrl);

      if (!type || !audioUrl) {
        return null;
      }

      return {
        id: `${type.code}-${phonetic?.text || ''}-${audioUrl}-${index}`,
        text: phonetic?.text?.trim() || null,
        audioUrl,
        typeCode: type.code,
        typeShort: type.short,
        typeLabel: type.label,
        typeFlag: type.flag,
      };
    })
    .filter(Boolean);

  const regional = [];
  const general = [];

  for (const entry of withAudio) {
    if (entry.typeCode === 'general') {
      general.push(entry);
    } else {
      regional.push(entry);
    }
  }

  // One card per region; prefer entry that includes phonetic text
  const byRegion = new Map();
  for (const entry of regional) {
    const existing = byRegion.get(entry.typeCode);
    if (!existing || (!existing.text && entry.text)) {
      byRegion.set(entry.typeCode, entry);
    }
  }

  const regionalEntries = REGION_ORDER.filter((code) =>
    byRegion.has(code)
  ).map((code) => byRegion.get(code));

  // One card per unique general audio URL
  const byUrl = new Map();
  for (const entry of general) {
    if (!byUrl.has(entry.audioUrl)) {
      byUrl.set(entry.audioUrl, entry);
    }
  }

  const generalEntries = Array.from(byUrl.values());

  return [...regionalEntries, ...generalEntries];
}
