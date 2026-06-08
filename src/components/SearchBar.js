/**
 * Reusable search input with a Search button and optional validation message.
 */
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows, spacing } from '../utils/theme';

export default function SearchBar({
  value,
  onChangeText,
  onSearch,
  validationMessage,
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Ionicons
          name="search"
          size={20}
          color={colors.textMuted}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter a word..."
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSearch}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable style={styles.button} onPress={onSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>
      {validationMessage ? (
        <Text style={styles.validation}>{validationMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    ...shadows.card,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    paddingVertical: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    color: colors.card,
    fontSize: 15,
    fontWeight: '600',
  },
  validation: {
    color: colors.error,
    fontSize: 14,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
});
