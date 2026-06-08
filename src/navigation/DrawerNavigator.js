/**
 * App navigation structure:
 *   Drawer (custom sidebar with history)
 *     ├── Search (Stack) → SearchHome, WordDetail
 *     └── History
 */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';
import WordDetailScreen from '../screens/WordDetailScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import DrawerMenuButton from '../components/DrawerMenuButton';
import HeaderBackButton from '../components/HeaderBackButton';
import { stackHeaderOptions } from './headerOptions';
import { colors } from '../utils/theme';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={stackHeaderOptions}>
      <Stack.Screen
        name="SearchHome"
        component={SearchScreen}
        options={({ navigation }) => ({
          title: 'Search',
          headerLeft: () => (
            <DrawerMenuButton navigation={navigation} align="left" />
          ),
        })}
      />
      <Stack.Screen
        name="WordDetail"
        component={WordDetailScreen}
        options={({ navigation, route }) => ({
          title: route.params?.word || 'Search',
          headerLeft: () => (
            <HeaderBackButton navigation={navigation} />
          ),
          headerBackVisible: false,
          headerRight: () => (
            <DrawerMenuButton navigation={navigation} align="right" />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        ...stackHeaderOptions,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
        drawerType: 'front',
        drawerStyle: {
          width: 300,
        },
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen
        name="Search"
        component={SearchStack}
        options={{
          title: 'Search',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={({ navigation }) => ({
          title: 'History',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
          headerLeft: () => (
            <DrawerMenuButton navigation={navigation} align="left" />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}
