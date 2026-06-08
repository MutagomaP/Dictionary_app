import { colors, spacing } from '../utils/theme';

/** Shared stack / drawer header styling with comfortable spacing. */
export const stackHeaderOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTintColor: colors.card,
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 20,
  },
  headerTitleAlign: 'left',
  headerLeftContainerStyle: {
    paddingLeft: spacing.md,
    minWidth: 56,
  },
  headerRightContainerStyle: {
    paddingRight: spacing.md,
    minWidth: 56,
  },
  headerTitleContainerStyle: {
    paddingLeft: spacing.sm,
    paddingRight: spacing.lg,
  },
};

export const APP_HEADER_TITLE = 'Lexicon';
