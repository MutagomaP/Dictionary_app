/**
 * Root application component.
 * Wraps the app in providers (safe area, global state) then renders navigation.
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchHistoryProvider } from './context/SearchHistoryContext';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Global state: search history, word data, loading, errors */}
      <SearchHistoryProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
        <StatusBar style="light" />
      </SearchHistoryProvider>
    </SafeAreaProvider>
  );
}
