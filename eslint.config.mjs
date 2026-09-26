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
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      // В тестах фикстуры заведомо существуют, а ref создаются вне компонентов.
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@eslint-react/no-create-ref': 'off',
      // Произвольные классы — тестовые данные, а не разметка.
      'better-tailwindcss/no-unknown-classes': 'off',
    },
  },
]);
