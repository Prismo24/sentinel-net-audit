import { create } from 'zustand';

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDarkMode: true,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    document.documentElement.classList.toggle('light', !newMode);
    return { isDarkMode: newMode };
  }),
  activeModule: 'scout',
  setActiveModule: (module) => set({ activeModule: module }),
}));