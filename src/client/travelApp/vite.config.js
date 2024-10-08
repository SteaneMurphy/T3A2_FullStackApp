import { defineConfig } from 'vitest/config';
import { imagetools } from 'vite-imagetools';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), imagetools()],
  assetsInclude: ['**/*.PNG'],
  server: {
    historyApiFallback: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js',
  },
})