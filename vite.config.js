import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './eventEmitter.ts'),
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    sourcemap: true,
  },
})
