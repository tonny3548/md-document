import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mdDocument from "./src/plugin";
import ViteRestart from 'vite-plugin-restart'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mdDocument({
      md: {
        // target: "./README2.md",
        includes: ["./docs/*.md"]
      },
      code: {
        target: "readme.html",
        includes: ["./src/views/demo/*"]
      }
    }),
    ViteRestart({
      restart: [
        "./docs/*.md",
        "./src/views/demo/*"
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
