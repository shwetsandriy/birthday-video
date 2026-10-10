import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The repository name is used automatically on GitHub Pages.
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS && repository ? `/${repository}/` : '/',
})
