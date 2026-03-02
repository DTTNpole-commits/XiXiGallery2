import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/XiXiGallery2/',   // ← 必须改成你的仓库名
})