/**
 * Shows past successful searches (most recent first).
 * Tapping an item re-fetches the word and opens WordDetailScreen.
 */
import React, { useEffect, useRef } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HistoryListItem from '../components/HistoryListItem';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { useDictionary } from '../hooks/useDictionary';
import { colors, spacing } from '../utils/theme';

export default function HistoryScreen({ navigation }) {
  const {
    history,
    wordData,
    loading,
    error,
    searchWord,
    removeFromHistory,
    clearHistory,
    retry,
  } = useDictionary();
  const pendingNavigation = useRef(null);

  const handleHistoryPress = async (word) => {
    pendingNavigation.current = word;
    await searchWord(word);
  };

  useEffect(() => {
    if (pendingNavigation.current && wordData && !loading && !error) {
      const word = pendingNavigation.current;
      pendingNavigation.current = null;
      navigation.navigate('Search', {
        screen: 'WordDetail',
        params: { word },
      });
    }

    if (!loading && error) {
      pendingNavigation.current = null;
    }
  }, [wordData, loading, error, navigation]);

  const handleClearHistory = () => {
    if (history.length === 0) return;

    Alert.alert(
      'Clear search history',
      'Remove all saved searches?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear all',
          style: 'destructive',
          onPress: clearHistory,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Search History</Text>
          <Text style={styles.subtitle}>Tap a word to search again</Text>
        </View>
        {history.length > 0 ? (
          <Pressable style={styles.clearButton} onPress={handleClearHistory}>
            <Ionicons name="trash-outline" size={18} color={colors.error} />
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        ) : null}
      </View>

      {loading ? <LoadingIndicator message="Loading word..." /> : null}

      {error && !loading ? (
        <ErrorMessage error={error} onRetry={retry} />
      ) : null}

      {!loading && history.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="book-outline" size={40} color={colors.primary} />
          </View>
          <Text style={styles.emptyText}>No search history yet.</Text>
          <Text style={styles.emptyHint}>
            Search for a word to see it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <HistoryListItem
              word={item}
              onPress={handleHistoryPress}
              onDelete={removeFromHistory}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  headerText: {
    flex: 1,
    paddingRight: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
  },
  clearButton: {
    alignItems: 'center',
    backgroundColor: colors.errorBg,
    borderRadius: 10,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  clearText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    paddingBottom: spacing.lg,
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyIcon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 40,
    height: 80,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 80,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  emptyHint: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
