import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/XiXiGallery2/'  // 必须大小写完全一致
})
