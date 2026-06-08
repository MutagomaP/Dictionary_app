/**
 * Main search screen — user enters a word, triggers API lookup,
 * and navigates to WordDetailScreen on success.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { useDictionary } from '../hooks/useDictionary';
import { validateSearchInput } from '../utils/validators';
import { colors, spacing } from '../utils/theme';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState(null);
  const { wordData, loading, error, searchWord, retry, clearError, currentWord } =
    useDictionary();
  const pendingNavigation = useRef(false);

  const handleSearch = async () => {
    const validation = validateSearchInput(query);
    if (!validation.isValid) {
      setValidationError({
        name: 'ValidationError',
        message: validation.message,
      });
      return;
    }

    setValidationError(null);
    clearError();
    setQuery(validation.trimmed);
    pendingNavigation.current = true;
    await searchWord(validation.trimmed);
  };

  useEffect(() => {
    if (pendingNavigation.current && wordData && !loading && !error) {
      pendingNavigation.current = false;
      navigation.navigate('WordDetail', { word: currentWord });
    }

    if (!loading && error) {
      pendingNavigation.current = false;
    }
  }, [wordData, loading, error, navigation, currentWord]);

  const displayError =
    validationError ||
    (error && error.name !== 'ValidationError' ? error : null);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="book-outline" size={32} color={colors.primary} />
        </View>
        <Text style={styles.company}>LexiTech Solutions Ltd</Text>
        <Text style={styles.title}>LexiTech Dictionary</Text>
        <Text style={styles.subtitle}>
          Search English words and explore their meanings
        </Text>
      </View>

      <View style={styles.searchCard}>
        <SearchBar
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (validationError) setValidationError(null);
            if (error) clearError();
          }}
          onSearch={handleSearch}
        />
      </View>

      {loading ? (
        <View style={styles.statusArea}>
          <LoadingIndicator message="Looking up word..." />
        </View>
      ) : null}

      {displayError ? (
        <View style={styles.statusArea}>
          <ErrorMessage
            error={displayError}
            onRetry={retry}
            showRetry={displayError.name !== 'ValidationError'}
          />
        </View>
      ) : null}

      {!loading && !displayError ? (
        <View style={styles.hint}>
          <Ionicons
            name="bulb-outline"
            size={28}
            color={colors.primary}
            style={styles.hintIcon}
          />
          <Text style={styles.hintLead}>Try searching for words like</Text>
          <View style={styles.hintWordsRow}>
            <Text style={styles.hintWord}>hello</Text>
            <Text style={styles.hintMuted}>, </Text>
            <Text style={styles.hintWord}>dictionary</Text>
            <Text style={styles.hintMuted}>, or </Text>
            <Text style={styles.hintWord}>beautiful</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  heroIcon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 18,
    height: 72,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 72,
  },
  company: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  searchCard: {
    marginBottom: spacing.lg,
  },
  statusArea: {
    marginTop: spacing.sm,
  },
  hint: {
    alignItems: 'center',
    borderColor: colors.primaryMuted,
    borderRadius: 16,
    borderStyle: 'dashed',
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  hintIcon: {
    marginBottom: spacing.md,
  },
  hintLead: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.xs,
    textAlign: 'center',
    ...Platform.select({ android: { includeFontPadding: false } }),
  },
  hintWordsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  hintMuted: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    ...Platform.select({ android: { includeFontPadding: false } }),
  },
  hintWord: {
    color: colors.primary,
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 22,
    ...Platform.select({ android: { includeFontPadding: false } }),
  },
});
