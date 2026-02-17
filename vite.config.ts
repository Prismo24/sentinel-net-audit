import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    proxy: {
      // Proxy para Shodan (Interconectividad Eficiente)
      '/api-shodan': {
        target: 'https://api.shodan.io',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-shodan/, ''),
      },
      // Proxy para NIST (Diagnóstico e Innovación)
      '/api-nist': {
        target: 'https://services.nvd.nist.gov',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-nist/, ''),
      }
    }
  }
});