import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  CARD_PADDINGS,
  CARD_RADIUS,
  CARD_VARIANTS,
} from './card.types';
import { Card } from './index';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: CARD_PADDINGS,
      description: 'Внутренний отступ: sm=16, md=20, lg=24',
    },
    radius: {
      control: 'select',
      options: CARD_RADIUS,
      description: 'Радиус скругления',
    },
    variant: {
      control: 'select',
      options: CARD_VARIANTS,
      description: 'default — surface-card; soft — нейтральный фон плашки',
    },
    hoverable: {
      control: 'boolean',
      description: 'Тень при наведении',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    padding: 'lg',
    radius: '2xl',
    variant: 'default',
    children: (
      <div className="flex flex-col gap-1">
        <span className="text-title-md font-medium text-neutral-950">
          Секция профиля
        </span>
        <span className="text-body-md text-neutral-500">
          Карточка с паддингом 24px и радиусом 2xl
        </span>
      </div>
    ),
    className: 'w-96',
  },
};

export const Soft: Story = {
  args: {
    padding: 'md',
    radius: 'xl',
    variant: 'soft',
    children: (
      <span className="text-control-md font-medium text-neutral-950">
        Плашка настройки
      </span>
    ),
    className: 'w-96',
  },
};

export const Hoverable: Story = {
  args: {
    padding: 'md',
    radius: '2xl',
    hoverable: true,
    children: (
      <span className="text-title-sm font-medium text-neutral-950">
        Строка списка — наведите
      </span>
    ),
    className: 'w-96',
  },
};
