import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';

import { Tag } from './index';
import type { TagSize, TagVariant } from './tag.types';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Контент тега',
    },
    defaultSize: {
      control: 'select',
      options: ['s', 'm', 'l'] as TagSize[],
      description: 'Размер тега',
    },
    variant: {
      control: 'select',
      options: [
        'solid-brand',
        'solid-neutral',
        'solid-black',
        'ghost-brand',
        'ghost-neutral',
      ] as TagVariant[],
      description: 'Вариант оформления',
    },
    onClose: {
      action: 'onClose',
      description: 'Колбэк при нажатии на кнопку удаления',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'Тег',
    defaultSize: 'm',
    variant: 'solid-brand',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Tag variant="solid-brand">solid-brand</Tag>
      <Tag variant="solid-neutral">solid-neutral</Tag>
      <Tag variant="solid-black">solid-black</Tag>
      <Tag variant="ghost-brand">ghost-brand</Tag>
      <Tag variant="ghost-neutral">ghost-neutral</Tag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Tag defaultSize="s">Маленький</Tag>
      <Tag defaultSize="m">Средний</Tag>
      <Tag defaultSize="l">Большой</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: 'С иконкой',
    startIcon: Info,
  },
};

export const Closable: Story = {
  args: {
    children: 'Удаляемый тег',
    onClose: () => {},
  },
};

export const WithIconAndClose: Story = {
  render: () => (
    <Tag startIcon={Info} onClose={() => {}}>
      Иконка и закрытие
    </Tag>
  ),
};
