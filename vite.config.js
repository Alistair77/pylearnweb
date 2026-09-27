import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
// GitHub Pages serves the site from /pylearnweb/; dev stays at the root
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/pylearnweb/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
