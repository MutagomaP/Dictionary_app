/**
 * Card displaying one part of speech (noun, verb, etc.)
 * with numbered definitions and example sentences.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, shadows, spacing } from '../utils/theme';

export default function MeaningCard({ meaning }) {
  const partOfSpeech = meaning.partOfSpeech || 'Unknown';
  const definitions = meaning.definitions || [];

  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.partOfSpeech}>
          {partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)}
        </Text>
      </View>

      {definitions.map((def, index) => (
        <View key={index} style={styles.definitionBlock}>
          <Text style={styles.definitionNumber}>{index + 1}.</Text>
          <View style={styles.definitionContent}>
            <Text style={styles.definition}>{def.definition}</Text>
            {def.example ? (
              <Text style={styles.example}>"{def.example}"</Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: 6,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  partOfSpeech: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  definitionBlock: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  definitionNumber: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '600',
    marginRight: spacing.sm,
    minWidth: 24,
  },
  definitionContent: {
    flex: 1,
  },
  definition: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  example: {
    color: colors.textMuted,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
    marginTop: spacing.sm,
  },
});
