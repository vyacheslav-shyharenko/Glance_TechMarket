import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import eslint from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-react-components/vite';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      sourcemap: true,
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      esbuild: {
        drop: command === 'build' ? ['console', 'debugger'] : [],
      },
    },
    plugins: [
      command === 'serve' && eslint({ cache: false }),
      injectHTML({
        injectData: {
          title: 'My Electro Shop',
          description: 'Купуйте електроніку онлайн легко і швидко!',
        },
      }),
      FullReload(['./src/**/*.html']),
      SortCss({
        sort: 'mobile-first',
      }),
      AutoImport({
        imports: ['react', 'react-router-dom'],
        dts: 'src/auto-imports.d.ts',
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['jsx'],
        dts: 'src/components.d.ts',
      }),
      viteImagemin({
        gifsicle: { optimizationLevel: 7 },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 70 },
        svgo: true,
      }),
    ],
  };
});
