import { create } from 'zustand';

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

// Añadimos 'get' aquí para poder consultar el estado actual
export const useAppStore = create<AppState>((set, get) => ({
  isDarkMode: true,
  
  toggleDarkMode: () => {
    // Ahora 'get()' funcionará correctamente
    const isDark = !get().isDarkMode;
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    set({ isDarkMode: isDark });
  }, // <-- No olvides esta coma

  activeModule: 'scout',
  setActiveModule: (module) => set({ activeModule: module }),
}));