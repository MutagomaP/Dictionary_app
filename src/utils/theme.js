import { Platform } from 'react-native';

/** Shared colors, spacing, and shadow styles used across the app. */
export const colors = {
  primary: '#4F46E5',
  primaryLight: '#EEF2FF',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#1E293B',
  textMuted: '#64748B',
  border: '#E2E8F0',
  error: '#DC2626',
  errorBg: '#FEF2F2',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Web uses boxShadow; iOS/Android use shadow* and elevation
export const shadows = {
  card: Platform.select({
    web: {
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
  }),
};
