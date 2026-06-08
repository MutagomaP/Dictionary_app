/**
 * Displays full word details for the currently selected word.
 * Refreshes whenever currentWord changes (search, history, or drawer).
 */
import React, { useLayoutEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AudioButton from '../components/AudioButton';
import LoadingIndicator from '../components/LoadingIndicator';
import MeaningCard from '../components/MeaningCard';
import { useDictionary } from '../hooks/useDictionary';
import { colors, spacing } from '../utils/theme';

export default function WordDetailScreen({ navigation, route }) {
  const { wordData, currentWord, loading } = useDictionary();
  const scrollRef = useRef(null);

  const selectedWord = currentWord || route.params?.word || '';
  const entry = wordData?.[0];
  const displayWord = entry?.word || selectedWord;

  // Show the searched word in the navigation header instead of "Word Details"
  useLayoutEffect(() => {
    navigation.setOptions({
      title: displayWord || 'Search',
      headerTitleContainerStyle: {
        paddingLeft: 8,
        paddingRight: 16,
      },
    });
  }, [navigation, displayWord]);

  // Scroll to top when a new word is loaded
  useLayoutEffect(() => {
    if (wordData && selectedWord) {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [selectedWord, wordData]);

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingIndicator
          message={selectedWord ? `Loading "${selectedWord}"...` : 'Loading word...'}
        />
      </View>
    );
  }

  if (!wordData || wordData.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No word data available.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        key={selectedWord}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AudioButton key={selectedWord} phonetics={entry.phonetics} />

        <Text style={styles.sectionTitle}>Meanings</Text>

        {entry.meanings?.map((meaning, index) => (
          <MeaningCard
            key={`${selectedWord}-${meaning.partOfSpeech}-${index}`}
            meaning={meaning}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 16,
  },
});
