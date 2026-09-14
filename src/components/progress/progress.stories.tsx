import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './index';
import { PROGRESS_COLORS } from './progress.types';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Прогресс 0–100',
    },
    label: {
      control: 'text',
      description: 'Подпись справа от полосы',
    },
    color: {
      control: 'select',
      options: PROGRESS_COLORS,
      description: 'Цвет заполнения',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 58,
    label: '7 из 12 выполнено',
    color: 'accent',
    className: 'w-[320px]',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Progress value={58} color="accent" label="7 из 12" />
      <Progress value={73} color="success" label="11 из 15" />
      <Progress value={25} color="warning" label="2 из 8" />
      <Progress value={41} color="primary" label="12 400 из 30 000" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    value: 40,
    color: 'primary',
    className: 'w-[220px]',
  },
};
