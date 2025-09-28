import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve as resolvePath } from 'path'

// https://vite.dev/config/
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': resolvePath(__dirname, './src/shared'),
      '@pages': resolvePath(__dirname, './src/pages'),
      '@core': resolvePath(__dirname, './src/core'),
    },
  },
})
