import { createTheme } from '@mui/material/styles';
import type { ThemeColorName } from '../types/buttonConfig';

const theme = createTheme();

export function getThemePaletteColor(color: ThemeColorName): {
  main: string;
  contrastText: string;
} {
  const palette = theme.palette[color];
  return { main: palette.main, contrastText: palette.contrastText };
}

export const canvasBackground = {
  light: '#ffffff',
  dark: '#121212',
};
