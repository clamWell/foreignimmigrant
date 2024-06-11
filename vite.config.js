import fs from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  base: './',
  server: {
    port: 8888,
  },
  plugins: [
    handlebars({
      partialDirectory: [
        resolve(__dirname, '../../includes'),
        resolve(__dirname, './sections'),
      ],
      helpers: {
        svg(filename) {
          return fs.readFileSync(resolve(__dirname, './assets/svg/', filename), 'utf8');
        },
        datetime(dotformat) {
          return dotformat.replace(/\./g, '-');
        }
      }
    }),
  ],
})