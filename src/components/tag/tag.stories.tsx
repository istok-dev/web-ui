import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';

import { Tag } from './index';
import { TAG_COLORS, TAG_SIZES, TAG_VARIANTS } from './tag.types';

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
    size: {
      control: 'select',
      options: TAG_SIZES,
      description: 'Размер тега',
    },
    variant: {
      control: 'select',
      options: TAG_VARIANTS,
      description: 'Вариант оформления',
    },
    color: {
      control: 'select',
      options: TAG_COLORS,
      description: 'Цвет тега',
    },
    onRemove: {
      action: 'onRemove',
      description: 'Колбэк при нажатии на кнопку удаления',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'Тег',
    size: 'md',
    variant: 'solid',
    color: 'primary',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {TAG_VARIANTS.map(variant => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          {TAG_COLORS.map(color => (
            <Tag key={color} variant={variant} color={color}>
              {variant}
              -
              {color}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Tag size="sm">Маленький</Tag>
      <Tag size="md">Средний</Tag>
      <Tag size="lg">Большой</Tag>
    </div>
  ),
};

export const Removeable: Story = {
  args: {
    children: 'Удаляемый тег',
    onRemove: () => {
      alert('Тег удален');
    },
  },
};

export const WithIconAndClose: Story = {
  render: () => (
    <Tag startIcon={Info} onRemove={() => {}}>
      Иконка и закрытие
    </Tag>
  ),
};

export const WithRender: Story = {
  render: () => (
    <Tag render={<a href="#tag" />}>
      Ссылка
    </Tag>
  ),
};
