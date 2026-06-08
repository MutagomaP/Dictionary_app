/**
 * Main search screen — user enters a word, triggers API lookup,
 * and navigates to WordDetailScreen on success.
 */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { useDictionary } from '../hooks/useDictionary';
import { validateSearchInput } from '../utils/validators';
import { colors, shadows, spacing } from '../utils/theme';

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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="book" size={28} color={colors.primary} />
        </View>
        <Text style={styles.company}>LexiTech Solutions Ltd</Text>
        <Text style={styles.title}>Dictionary Mobile App</Text>
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
            size={22}
            color={colors.primary}
            style={styles.hintIcon}
          />
          <Text style={styles.hintText}>
            Try searching for words like hello, dictionary, or beautiful
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  heroIcon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    height: 64,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 64,
    ...shadows.card,
  },
  company: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 26,
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
    backgroundColor: colors.card,
    borderRadius: 14,
    flex: 1,
    justifyContent: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
    padding: spacing.lg,
    ...shadows.card,
  },
  hintIcon: {
    marginBottom: spacing.sm,
  },
  hintText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
