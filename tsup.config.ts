import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/utils/index.ts'],
  target: 'es2022',
  format: ['esm'],
  outDir: 'lib',
  dts: true,
  sourcemap: true,
  minify: true,
  clean: true,
  splitting: false,
  treeshake: true,
  tsconfig: 'tsconfig.build.json',
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react-day-picker',
    /^@base-ui\//,
    'clsx',
    'lucide-react',
    'tailwind-merge',
    'tailwind-variants',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
