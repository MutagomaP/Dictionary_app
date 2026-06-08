/**
 * Displays warm, helpful error messages based on error type.
 * Validation hints use a softer style; API failures offer a retry action.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiMessages } from '../utils/errorMessages';
import { colors, spacing } from '../utils/theme';

function getErrorContent(error) {
  if (!error) {
    return {
      tone: 'error',
      icon: 'alert-circle-outline',
      title: apiMessages.general.title,
      message: apiMessages.general.message,
    };
  }

  if (error.name === 'ValidationError') {
    return {
      tone: 'info',
      icon: 'bulb-outline',
      title: 'Just a quick tip',
      message: error.message,
    };
  }

  if (error.name === 'WordNotFoundError') {
    return {
      tone: 'error',
      icon: 'search-outline',
      title: apiMessages.wordNotFound.title,
      message: apiMessages.wordNotFound.message,
    };
  }

  if (error.name === 'NetworkError') {
    return {
      tone: 'error',
      icon: 'cloud-offline-outline',
      title: apiMessages.network.title,
      message: apiMessages.network.message,
    };
  }

  return {
    tone: 'error',
    icon: 'alert-circle-outline',
    title: apiMessages.general.title,
    message: apiMessages.general.message,
  };
}

export default function ErrorMessage({ error, onRetry, showRetry = true }) {
  if (!error) return null;

  const { tone, icon, title, message } = getErrorContent(error);
  const isValidation = error.name === 'ValidationError';
  const isInfo = tone === 'info';

  return (
    <View style={[styles.container, isInfo && styles.containerInfo]}>
      <Ionicons
        name={icon}
        size={40}
        color={isInfo ? colors.primary : colors.error}
      />
      <Text style={[styles.title, isInfo && styles.titleInfo]}>{title}</Text>
      <Text style={[styles.message, isInfo && styles.messageInfo]}>
        {message}
      </Text>
      {showRetry && !isValidation && onRetry ? (
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Ionicons name="refresh" size={18} color={colors.card} />
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.errorBg,
    borderRadius: 14,
    marginVertical: spacing.md,
    padding: spacing.lg,
  },
  containerInfo: {
    backgroundColor: colors.primaryLight,
  },
  title: {
    color: colors.error,
    fontSize: 17,
    fontWeight: '700',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  titleInfo: {
    color: colors.primary,
  },
  message: {
    color: colors.error,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  messageInfo: {
    color: colors.text,
  },
  retryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  retryText: {
    color: colors.card,
    fontSize: 15,
    fontWeight: '600',
  },
});
