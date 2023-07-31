import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  /** @ts-expect-error forcing compiler to behave with vitest */
  test: {
    globals: true,
    environment: "jsdom",
  },
  plugins: [vue()],
})
