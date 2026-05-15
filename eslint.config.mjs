import istokConfig from '@istok-dev/eslint-react';
import { defineConfig, globalIgnores } from 'eslint/config';

const tailwindEntry = './eslint.entry.css';

export default defineConfig([
  globalIgnores([
    '**/lib/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/storybook-static/**',
    '**/coverage/**',
  ]),
  ...istokConfig,
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: tailwindEntry,
      },
      'eslint-plugin-better-tailwindcss': {
        entryPoint: tailwindEntry,
      },
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      '@eslint-react/rules-of-hooks': 'off',
    },
  },
  {
    files: ['scripts/**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',
    },
  },
]);
