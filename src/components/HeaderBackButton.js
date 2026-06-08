import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../utils/theme';

/** Navigates back to the search screen from word detail. */
export default function HeaderBackButton({
  navigation,
  color = colors.card,
  targetScreen = 'SearchHome',
}) {
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate(targetScreen);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={goBack}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        accessibilityLabel="Back to search"
        hitSlop={8}
      >
        <Ionicons name="arrow-back" size={24} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
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
