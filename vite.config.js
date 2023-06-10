import { defineConfig } from 'vite';

export default defineConfig({
  base: '/3D-art-gallery',
  build: {
    rollupOptions: {
      input: '/main.js',
    },
  },
});
