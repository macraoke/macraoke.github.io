import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Served as a project site under https://ultragaucheforce.github.io/macraoke/
export default defineConfig({
  base: '/macraoke/',
  plugins: [react()]
})
