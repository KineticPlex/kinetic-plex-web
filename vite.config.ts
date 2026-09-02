import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' with { type: 'json' }

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = parseInt(env.VITE_PORT || '5173')

  return {
    plugins: [
      react(),
      crx({ manifest }),
    ],
    server: {
      port: port,
      strictPort: true,
      hmr: {
        port: port,
      },
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      },
      origin: `http://localhost:${port}`,
      watch: {
        usePolling: true
      }
    },
  }
})