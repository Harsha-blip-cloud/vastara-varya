import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
// The admin panel is deployed on its OWN subdomain (adminvastaravaraya.spectranox.com),
// served at the root — so base is '/'. Dev (npm run dev) and the production build now match;
// no --base override is needed at build time.
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': fileURLToPath(new URL('../shared/src', import.meta.url)),
    },
    // shared/ lives outside this app root; force its bare imports to resolve from
    // this app's node_modules (and guarantee a single React instance).
    dedupe: ['react', 'react-dom', 'react-router-dom', 'react-icons', 'axios'],
  },
  server: {
    // allow the dev server to read the sibling shared/ folder
    fs: { allow: ['..'] },
  },
})
