import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const env = dotenv.config().parsed

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: env?.PORT ? parseInt(env.PORT) : 5173,
  },
  plugins: [react(), tailwindcss()],
})
