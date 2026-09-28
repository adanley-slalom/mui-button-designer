export type ButtonVariant = 'text' | 'outlined' | 'contained';

export type ThemeColorName =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

export type ButtonSize = 'small' | 'medium' | 'large';

export type IconStyle = 'solid' | 'outlined';

export interface ButtonConfig {
  // Content
  label: string;
  startIcon: string | null;
  endIcon: string | null;
  iconStyle: IconStyle;
  iconOnly: boolean;

  // Variant & Color
  variant: ButtonVariant;
  colorMode: 'theme' | 'custom';
  color: ThemeColorName;
  customColor: string;
  disabled: boolean;
  loading: boolean;

  // Size & Spacing
  size: ButtonSize;
  fullWidth: boolean;
  minWidth: number | null;

  // Shape
  borderRadius: number;

  // Elevation & Effects
  elevation: number;
  disableRipple: boolean;

  // Accessibility
  ariaLabel: string;
}

export const defaultButtonConfig: ButtonConfig = {
  label: 'Button',
  startIcon: null,
  endIcon: null,
  iconStyle: 'solid',
  iconOnly: false,

  variant: 'contained',
  colorMode: 'theme',
  color: 'primary',
  customColor: '#6C5CE7',
  disabled: false,
  loading: false,

  size: 'medium',
  fullWidth: false,
  minWidth: null,

  borderRadius: 4,

  elevation: 2,
  disableRipple: false,

  ariaLabel: '',
};
