import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../utils/theme';

/** Header search icon — jumps to the search tab. */
export default function HeaderSearchButton({ navigation, color = colors.card }) {
  const goToSearch = () => {
    navigation.navigate('SearchTab', { screen: 'SearchHome' });
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={goToSearch}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        accessibilityLabel="Go to search"
        hitSlop={8}
      >
        <Ionicons name="search" size={22} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  buttonPressed: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
});
