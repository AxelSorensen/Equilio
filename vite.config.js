import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Equilio/',
  plugins: [vue(),VitePWA({registerType: 'autoUpdate', manifest: {
    "icons": [
      {
        "src": "icons/512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  }})],
  
})
