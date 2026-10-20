import { defineConfig } from 'vite';
export default defineConfig({
  server: { proxy: { '/api': 'http://127.0.0.1:3000' } },
  build: { rollupOptions: { output: { inlineDynamicImports: true } } },
  worker: { format: 'iife' }
});
