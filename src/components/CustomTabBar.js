import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../utils/theme';

const TABS = {
  SearchTab: { icon: 'search', label: 'SEARCH' },
  HistoryTab: { icon: 'time-outline', label: 'HISTORY' },
  BookmarksTab: { icon: 'bookmark-outline', label: 'BOOKMARKS' },
};

export default function CustomTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tab = TABS[route.name];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            <View style={[styles.iconPill, isFocused && styles.iconPillActive]}>
              <Ionicons
                name={tab.icon}
                size={22}
                color={isFocused ? colors.primary : colors.textMuted}
              />
            </View>
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    backgroundColor: colors.tabBar,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingTop: spacing.sm,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs,
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  iconPill: {
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    minWidth: 56,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  iconPillActive: {
    backgroundColor: colors.primaryLight,
  },
  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  labelActive: {
    color: colors.primary,
  },
});
