import { Platform } from 'react-native';

/** Shared colors, spacing, and shadow styles used across the app. */
export const colors = {
  primary: '#5B5FEF',
  primaryDark: '#4F46E5',
  primaryLight: '#EEF0FF',
  primaryMuted: '#C7CCFF',
  background: '#F5F6FA',
  card: '#FFFFFF',
  text: '#1A1D26',
  textMuted: '#6B7280',
  border: '#E2E8F0',
  tabBar: '#FFFFFF',
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
