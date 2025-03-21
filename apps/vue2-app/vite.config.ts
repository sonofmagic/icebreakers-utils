import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    tsconfigPaths(),
  ],
})
