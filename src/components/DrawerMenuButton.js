import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../utils/theme';

/** Opens the side drawer from nested stack screens. */
export default function DrawerMenuButton({
  navigation,
  color = colors.card,
  align = 'left',
}) {
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      style={[
        styles.wrapper,
        align === 'right' ? styles.wrapperRight : styles.wrapperLeft,
      ]}
    >
      <Pressable
        onPress={openDrawer}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        accessibilityLabel="Open menu"
        hitSlop={8}
      >
        <Ionicons name="menu" size={24} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperLeft: {
    marginRight: spacing.sm,
  },
  wrapperRight: {
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
