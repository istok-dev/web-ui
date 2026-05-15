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
    defaultSize: {
      control: 'select',
      options: ['s', 'm', 'l'] as AvatarSize[],
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
    defaultSize: 'm',
    shape: 'circle',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    alt: 'Avatar',
    defaultSize: 'm',
    shape: 'circle',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar name="Алексей Петров" defaultSize="s" />
      <Avatar name="Алексей Петров" defaultSize="m" />
      <Avatar name="Алексей Петров" defaultSize="l" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Мария Сидорова" defaultSize="m" shape="circle" />
      <Avatar name="Мария Сидорова" defaultSize="m" shape="square" />
    </div>
  ),
};

export const Initials: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar name="Иван Иванов" defaultSize="m" />
      <Avatar name="Анна" defaultSize="m" />
      <Avatar defaultSize="m" />
    </div>
  ),
};
