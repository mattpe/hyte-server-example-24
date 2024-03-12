// vite.config.js
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // List your html files here, e.g:
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        info: resolve(__dirname, 'info.html'),
      },
    },
  },
  // base: '/~username/my-app/',
});
