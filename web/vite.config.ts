import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'

const viteConfig = defineConfig({
  plugins: [react()],
})

const vitestConfig = defineVitestConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
})

export default mergeConfig(viteConfig, vitestConfig)