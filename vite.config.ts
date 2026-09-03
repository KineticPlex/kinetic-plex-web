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
      host: true,
      port: port,
      strictPort: true,
      hmr: {
        host: 'localhost',
        clientPort: port,
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