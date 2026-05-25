import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import "testing-maybe-become-a-crash"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
