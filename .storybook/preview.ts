import type { Preview } from '@storybook/react-vite';

import './preview.css';

const preview: Preview = {
  parameters: {
    a11y: {
      // Нарушения показываются во вкладке Accessibility; 'error' — чтобы валить test-runner.
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
