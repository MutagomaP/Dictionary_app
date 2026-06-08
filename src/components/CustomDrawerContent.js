/**
 * Custom drawer sidebar — navigation, recent searches, and clear history.
 */
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import HistoryListItem from './HistoryListItem';
import { useDictionary } from '../hooks/useDictionary';
import { colors, spacing } from '../utils/theme';

export default function CustomDrawerContent(props) {
  const { navigation } = props;
  const { history, searchWord, removeFromHistory, clearHistory } =
    useDictionary();

  const handleHistoryPress = async (word) => {
    navigation.closeDrawer();
    const result = await searchWord(word);
    if (result?.success) {
      navigation.navigate('Search', {
        screen: 'WordDetail',
        params: { word },
      });
    }
  };

  const handleClearHistory = () => {
    if (history.length === 0) return;

    Alert.alert(
      'Clear search history',
      'Remove all recent searches from the drawer?',
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
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.brand}>
        <View style={styles.brandIcon}>
          <Ionicons name="book" size={26} color={colors.primary} />
        </View>
        <View style={styles.brandText}>
          <Text style={styles.brandTitle}>Dictionary</Text>
          <Text style={styles.brandSubtitle}>LexiTech Solutions</Text>
        </View>
      </View>

      <View style={styles.navSection}>
        <DrawerItem
          label="Search"
          icon={({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          )}
          labelStyle={styles.drawerLabel}
          style={styles.drawerItem}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textMuted}
          onPress={() =>
            navigation.navigate('Search', { screen: 'SearchHome' })
          }
        />
        <DrawerItem
          label="History"
          icon={({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          )}
          labelStyle={styles.drawerLabel}
          style={styles.drawerItem}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textMuted}
          onPress={() => navigation.navigate('History')}
        />
      </View>

      <View style={styles.historySection}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyHeading}>Recent Searches</Text>
          {history.length > 0 ? (
            <Pressable
              style={styles.clearButton}
              onPress={handleClearHistory}
            >
              <Ionicons name="trash-outline" size={16} color={colors.error} />
              <Text style={styles.clearText}>Clear all</Text>
            </Pressable>
          ) : null}
        </View>

        {history.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons
              name="search-outline"
              size={32}
              color={colors.textMuted}
            />
            <Text style={styles.emptyHistory}>
              No search history yet.{'\n'}Search for a word first.
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.historyList}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {history.map((word, index) => (
              <HistoryListItem
                key={`${word}-${index}`}
                word={word}
                compact
                onPress={handleHistoryPress}
                onDelete={removeFromHistory}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  brand: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  brandIcon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  brandText: {
    flex: 1,
  },
  brandTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  brandSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  navSection: {
    paddingHorizontal: spacing.sm,
  },
  drawerItem: {
    borderRadius: 10,
    marginHorizontal: spacing.sm,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: -spacing.sm,
  },
  historySection: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flex: 1,
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  historyHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  historyHeading: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  clearButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  clearText: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: spacing.lg,
  },
  emptyHistory: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  historyList: {
    maxHeight: 340,
  },
});
