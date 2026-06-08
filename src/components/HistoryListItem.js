/**
 * Reusable history row — used in the drawer and History screen.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows, spacing } from '../utils/theme';

export default function HistoryListItem({
  word,
  onPress,
  onDelete,
  compact = false,
}) {
  return (
    <View style={[styles.row, compact && styles.rowCompact]}>
      <Pressable
        style={styles.mainArea}
        onPress={() => onPress(word)}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
        </View>
        <Text style={styles.word} numberOfLines={1}>
          {word}
        </Text>
        <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
      </Pressable>

      {onDelete ? (
        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(word)}
          accessibilityLabel={`Delete ${word} from history`}
          hitSlop={6}
        >
          <Ionicons name="close-circle" size={22} color={colors.error} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: spacing.sm,
    overflow: 'hidden',
    ...shadows.card,
  },
  rowCompact: {
    backgroundColor: colors.primaryLight,
    elevation: 0,
    shadowOpacity: 0,
  },
  mainArea: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  word: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  deleteButton: {
    alignItems: 'center',
    borderLeftColor: colors.border,
    borderLeftWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
});
