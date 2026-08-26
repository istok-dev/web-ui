import type { Meta, StoryObj } from '@storybook/react-vite';

import type { AvatarShape, AvatarSize } from './avatar.types';
import { Avatar } from './index';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Имя для инициалов (без изображения)',
    },
    src: {
      control: 'text',
      description: 'URL изображения',
    },
    alt: {
      control: 'text',
      description: 'Альтернативный текст для изображения',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as AvatarSize[],
      description: 'Размер аватара',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'] as AvatarShape[],
      description: 'Форма аватара',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'Иван Иванов',
    size: 'md',
    shape: 'circle',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    alt: 'Avatar',
    size: 'md',
    shape: 'circle',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar name="Алексей Петров" size="sm" />
      <Avatar name="Алексей Петров" size="md" />
      <Avatar name="Алексей Петров" size="lg" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Мария Сидорова" size="md" shape="circle" />
      <Avatar name="Мария Сидорова" size="md" shape="square" />
    </div>
  ),
};

export const Initials: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar name="Иван Иванов" size="md" />
      <Avatar name="Анна" size="md" />
      <Avatar size="md" />
    </div>
  ),
};
