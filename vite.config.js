import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src/client/src');

export default defineConfig({
  root,
  build: {
    outDir: resolve(__dirname, 'src/client/dist'),
    emptyOutDir: true
  }
});