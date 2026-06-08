/**
 * Root application component.
 * Wraps the app in providers (safe area, global state) then renders navigation.
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchHistoryProvider } from './context/SearchHistoryContext';
import DrawerNavigator from './navigation/DrawerNavigator';
import { colors } from './utils/theme';

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Global state: search history, word data, loading, errors */}
      <SearchHistoryProvider>
        <NavigationContainer theme={navigationTheme}>
          <DrawerNavigator />
        </NavigationContainer>
        <StatusBar style="light" />
      </SearchHistoryProvider>
    </SafeAreaProvider>
  );
}
