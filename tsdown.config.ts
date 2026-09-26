import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/utils/index.ts',
    'src/components/calendar/index.ts',
    'src/components/date-input/index.ts',
    'src/components/date-picker/index.ts',
  ],
  target: 'es2022',
  format: ['esm'],
  outDir: 'lib',
  dts: true,
  sourcemap: true,
  minify: true,
  clean: true,
  treeshake: true,
  // Сохраняем структуру модулей, чтобы директивы 'use client' не терялись при склейке чанков.
  unbundle: true,
  tsconfig: 'tsconfig.build.json',
  platform: 'browser',
  fixedExtension: false,
  deps: {
    neverBundle: true,
  },
  copy: [
    {
      from: 'src/components/**/*.css',
      to: 'lib/styles',
      flatten: false,
    },
    {
      from: 'src/styles/**/*.css',
      to: 'lib',
      flatten: false,
    },
  ],
});
