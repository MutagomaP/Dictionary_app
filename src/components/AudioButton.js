/**
 * Shows all pronunciations with audio — US, UK, Australian, or general (no region).
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PronunciationItem from './PronunciationItem';
import { getPhoneticEntries } from '../utils/pronunciationUtils';
import { colors, spacing } from '../utils/theme';

export default function AudioButton({ phonetics }) {
  const entries = getPhoneticEntries(phonetics);

  if (entries.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        Pronunciations ({entries.length})
      </Text>

      {entries.map((entry) => (
        <PronunciationItem
          key={entry.id}
          text={entry.text}
          audioUrl={entry.audioUrl}
          typeLabel={entry.typeLabel}
          typeCode={entry.typeCode}
          typeShort={entry.typeShort}
          typeFlag={entry.typeFlag}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
});
