import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // The published app lives under the repository path on GitHub Pages.
  base: '/hussain-ahmad-brain-atlas-lab/',
  plugins: [react()],
})
