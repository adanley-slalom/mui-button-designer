import { createContext, useContext } from 'react';
import type { ColorMode } from '../theme';

export interface ColorModeContextValue {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
}

export const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'light',
  setMode: () => {},
});

export function useColorMode(): ColorModeContextValue {
  return useContext(ColorModeContext);
}
