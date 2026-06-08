/** Centered spinner shown while the API request is in progress. */
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../utils/theme';

export default function LoadingIndicator({ message = 'Searching...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  message: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.textMuted,
  },
});
