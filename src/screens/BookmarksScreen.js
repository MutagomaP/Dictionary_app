/**
 * Bookmarks screen — placeholder for saved words.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../utils/theme';

export default function BookmarksScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.empty}>
        <View style={styles.iconWrap}>
          <Ionicons name="bookmark-outline" size={40} color={colors.primary} />
        </View>
        <Text style={styles.title}>No bookmarks yet</Text>
        <Text style={styles.subtitle}>
          Save words here to find them quickly later.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: spacing.lg,
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 40,
    height: 80,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 80,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
