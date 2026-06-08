/**
 * One regional pronunciation card — type label, phonetic text, speaker icon.
 * Only rendered for entries that have audio (no "unavailable" state).
 */
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { colors, spacing } from '../utils/theme';

const TYPE_STYLES = {
  us: { bg: '#DBEAFE', border: '#93C5FD', text: '#1D4ED8' },
  uk: { bg: '#FEE2E2', border: '#FCA5A5', text: '#B91C1C' },
  au: { bg: '#D1FAE5', border: '#6EE7B7', text: '#047857' },
  general: { bg: colors.primaryLight, border: colors.primary, text: colors.primary },
};

export default function PronunciationItem({
  text,
  audioUrl,
  typeLabel,
  typeCode,
  typeShort,
  typeFlag,
}) {
  const player = useAudioPlayer(audioUrl);
  const { playing, currentTime, duration, didJustFinish } =
    useAudioPlayerStatus(player);

  const typeStyle = TYPE_STYLES[typeCode] || {
    bg: colors.primaryLight,
    border: colors.primary,
    text: colors.primary,
  };

  const handleSpeakerPress = () => {
    try {
      if (playing) {
        player.pause();
        return;
      }
      const atEnd =
        didJustFinish ||
        (duration > 0 && currentTime >= duration - 0.05);
      if (atEnd) {
        player.seekTo(0);
      }
      player.play();
    } catch {
      // Playback failed — fail silently
    }
  };

  const handleStop = () => {
    try {
      player.pause();
      player.seekTo(0);
    } catch {
      // ignore
    }
  };

  return (
    <View style={[styles.card, { borderColor: typeStyle.border }]}>
      <View style={styles.topRow}>
        <View style={[styles.typeBlock, { backgroundColor: typeStyle.bg }]}>
          <Text style={styles.flag}>{typeFlag}</Text>
          <View>
            {typeShort ? (
              <Text style={[styles.typeShort, { color: typeStyle.text }]}>
                {typeShort}
              </Text>
            ) : null}
            <Text
              style={[
                styles.typeLabel,
                { color: typeStyle.text },
                !typeShort && styles.typeLabelOnly,
              ]}
            >
              {typeLabel}
            </Text>
          </View>
        </View>

        <Pressable
          style={[styles.speakerButton, playing && styles.speakerButtonActive]}
          onPress={handleSpeakerPress}
          accessibilityLabel={`Play ${typeLabel}`}
        >
          {playing ? (
            <ActivityIndicator size="small" color={colors.card} />
          ) : (
            <Ionicons name="volume-high" size={28} color={colors.card} />
          )}
        </Pressable>
      </View>

      {text ? <Text style={styles.phonetic}>{text}</Text> : null}

      {playing ? (
        <Pressable style={styles.stopLink} onPress={handleStop}>
          <Ionicons name="stop-circle-outline" size={16} color={colors.primary} />
          <Text style={styles.stopText}>Stop</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  typeBlock: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    marginRight: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  flag: {
    fontSize: 28,
  },
  typeShort: {
    fontSize: 18,
    fontWeight: '800',
  },
  typeLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  typeLabelOnly: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 0,
  },
  speakerButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 24,
    elevation: 3,
    height: 48,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    width: 48,
  },
  speakerButtonActive: {
    backgroundColor: '#4338CA',
  },
  phonetic: {
    color: colors.text,
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 26,
    paddingLeft: spacing.xs,
  },
  stopLink: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
    paddingLeft: spacing.xs,
  },
  stopText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});
