import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  viteFinal: async (config) => {
    try {
      const { default: tailwindcss } = await import("@tailwindcss/vite");
      return {
        ...config,
        plugins: [...(config.plugins ?? []), tailwindcss(), tsconfigPaths()],
      };
    } catch {
      return config;
    }
  },
};

export default config;
