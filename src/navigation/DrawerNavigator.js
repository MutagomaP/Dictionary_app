/**
 * App navigation structure:
 *   Drawer (custom sidebar with history)
 *     └── Main (Bottom Tabs)
 *           ├── SearchTab (Stack) → SearchHome, WordDetail
 *           ├── HistoryTab → HistoryScreen
 *           └── BookmarksTab → BookmarksScreen
 */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import WordDetailScreen from '../screens/WordDetailScreen';
import HistoryScreen from '../screens/HistoryScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import CustomTabBar from '../components/CustomTabBar';
import DrawerMenuButton from '../components/DrawerMenuButton';
import HeaderBackButton from '../components/HeaderBackButton';
import HeaderSearchButton from '../components/HeaderSearchButton';
import { APP_HEADER_TITLE, stackHeaderOptions } from './headerOptions';
import { colors } from '../utils/theme';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function getMainHeaderOptions(navigation) {
  return {
    title: APP_HEADER_TITLE,
    headerLeft: () => (
      <DrawerMenuButton navigation={navigation} align="left" />
    ),
    headerRight: () => (
      <HeaderSearchButton navigation={navigation} />
    ),
  };
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={stackHeaderOptions}>
      <Stack.Screen
        name="SearchHome"
        component={SearchScreen}
        options={({ navigation }) => getMainHeaderOptions(navigation)}
      />
      <Stack.Screen
        name="WordDetail"
        component={WordDetailScreen}
        options={({ navigation, route }) => ({
          title: route.params?.word || APP_HEADER_TITLE,
          headerLeft: () => (
            <HeaderBackButton navigation={navigation} />
          ),
          headerBackVisible: false,
          headerRight: () => (
            <HeaderSearchButton navigation={navigation} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={stackHeaderOptions}>
      <Stack.Screen
        name="HistoryHome"
        component={HistoryScreen}
        options={({ navigation }) => getMainHeaderOptions(navigation)}
      />
    </Stack.Navigator>
  );
}

function BookmarksStack() {
  return (
    <Stack.Navigator screenOptions={stackHeaderOptions}>
      <Stack.Screen
        name="BookmarksHome"
        component={BookmarksScreen}
        options={({ navigation }) => getMainHeaderOptions(navigation)}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: { backgroundColor: colors.background },
      }}
    >
      <Tab.Screen name="SearchTab" component={SearchStack} />
      <Tab.Screen name="HistoryTab" component={HistoryStack} />
      <Tab.Screen name="BookmarksTab" component={BookmarksStack} />
    </Tab.Navigator>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
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
        name="Main"
        component={MainTabs}
        options={{
          title: 'LexiTech Dictionary',
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
