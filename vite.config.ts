import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components' : path.resolve(__dirname, './src/components'),
      'assets' : path.resolve(__dirname, './src/assets')
    },
  },
  plugins: [react()],
})
