import { create } from 'zustand';
import { type ButtonConfig, defaultButtonConfig } from '../types/buttonConfig';

interface ButtonConfigStore {
  config: ButtonConfig;
  set: <K extends keyof ButtonConfig>(key: K, value: ButtonConfig[K]) => void;
  reset: () => void;
}

export const useButtonConfigStore = create<ButtonConfigStore>((set) => ({
  config: { ...defaultButtonConfig },
  set: (key, value) =>
    set((state) => ({ config: { ...state.config, [key]: value } })),
  reset: () => set({ config: { ...defaultButtonConfig } }),
}));
