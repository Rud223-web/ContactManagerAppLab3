import { StyleSheet, Dimensions, TextStyle, ViewStyle } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Colors = {
  primary: '#1976d2',
  secondary: '#9c27b0',
  accent: '#ff9800',
  background: '#f5f5f5',
  surface: '#ffffff',
  border: '#e0e0e0',
  text: {
    primary: '#212121',
    secondary: '#757575',
    light: '#ffffff',
  },
  error: '#d32f2f',
};

export const Fonts = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const SCREEN = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

interface GlobalStyleTypes {
  container: ViewStyle;
  centered: ViewStyle;
  card: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  input: TextStyle;
  inputFocused: ViewStyle;
  inputError: ViewStyle;
  errorText: TextStyle;
}

export const GlobalStyles = StyleSheet.create<GlobalStyleTypes>({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.text.light,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: Fonts.medium,
    backgroundColor: Colors.surface,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: Colors.accent,
  },
  errorText: {
    color: Colors.accent,
    fontSize: Fonts.small,
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  deleteButton: {
  marginTop: Spacing.lg,
  paddingVertical: Spacing.sm,
  paddingHorizontal: Spacing.md,
  backgroundColor: Colors.error,
  borderRadius: 8,
  alignItems: 'center',
},
deleteText: {
  color: Colors.text.light,
  fontSize: Fonts.medium,
  fontWeight: 'bold',
},
});