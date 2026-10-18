import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import hooks from 'eslint-plugin-react-hooks';
import refresh from 'eslint-plugin-react-refresh';
import boundaries from 'eslint-plugin-boundaries';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

const root = fileURLToPath(new URL('.', import.meta.url));
const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': hooks, 'react-refresh': refresh, boundaries },
    settings: {
      'boundaries/root-path': root,
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        { type: 'entry', pattern: 'src/main.tsx', mode: 'full' },
        { type: 'app', pattern: 'src/app', mode: 'folder' },
        ...['pages', 'widgets', 'features', 'entities'].map((type) => ({
          type,
          pattern: `src/${type}/*`,
          mode: 'folder',
          capture: ['slice'],
        })),
        { type: 'shared', pattern: 'src/shared', mode: 'folder' },
      ],
      'import/resolver': {
        typescript: { project: `${root}tsconfig.app.json` },
      },
    },
    rules: {
      ...hooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'error',
        { allowConstantExport: true },
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: ['entry'], allow: ['app'] },
            ...layers.map((layer, index) => ({
              from: [layer],
              allow: layers.slice(index + 1),
            })),
          ],
        },
      ],
      'boundaries/entry-point': [
        'error',
        {
          default: 'disallow',
          rules: [
            { target: ['app', 'shared'], allow: ['**'] },
            {
              target: ['pages', 'widgets', 'features', 'entities'],
              allow: ['index.ts', 'index.tsx'],
            },
          ],
        },
      ],
      'boundaries/no-unknown': 'error',
      'boundaries/no-unknown-files': 'error',
    },
  },
  prettier,
];
