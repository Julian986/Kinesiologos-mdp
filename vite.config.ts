import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4300, 
    host: true, 
    open: true, 
    proxy: {
      // Proxy para funciones serverless locales (vercel dev corre en 3000)
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

})
