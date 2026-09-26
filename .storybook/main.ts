import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  viteFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.tsconfigPaths = true;

    try {
      const { default: tailwindcss } = await import('@tailwindcss/vite');
      config.plugins = [...(config.plugins ?? []), tailwindcss()];
    }
    catch {
      // Tailwind Vite plugin is optional for Storybook startup.
    }

    return config;
  },
};

export default config;
