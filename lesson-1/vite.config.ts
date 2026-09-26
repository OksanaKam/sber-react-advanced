import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import tsconfig from './tsconfig.json' with { type: 'json' };

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: Object.fromEntries(
      Object.entries(tsconfig.compilerOptions.paths).map(
        ([alias, [target]]) => [
          alias.replace('/*', ''),
          fileURLToPath(
            new URL(`./src/${target.replace('/*', '')}`, import.meta.url),
          ),
        ],
      ),
    ),
  },
});
