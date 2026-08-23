import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info, Tag, X } from 'lucide-react';

import { Tooltip } from '../tooltip';
import {
  BADGE_COLORS,
  BADGE_SHAPES,
  BADGE_SIZES,
  BADGE_VARIANTS,
} from './badge.types';
import { Badge } from './index';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст бейджа',
    },
    size: {
      control: 'select',
      options: BADGE_SIZES,
      description: 'Размер бейджа',
    },
    variant: {
      control: 'select',
      options: BADGE_VARIANTS,
      description: 'Вариант оформления',
    },
    color: {
      control: 'select',
      options: BADGE_COLORS,
      description: 'Цвет бейджа',
    },
    shape: {
      control: 'select',
      options: BADGE_SHAPES,
      description: 'Форма бейджа',
    },
    circle: {
      control: 'boolean',
      description: 'Круглый бейдж без паддингов (ширина = высота)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: 'Бейдж',
    size: 'md',
    variant: 'solid',
    color: 'primary',
    shape: 'square',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge label="Маленький" size="sm" />
      <Badge label="Средний" size="md" />
      <Badge label="Большой" size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {BADGE_VARIANTS.map(variant => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          {BADGE_COLORS.map(color => (
            <Badge
              key={color}
              label={`${variant}-${color}`}
              variant={variant}
              color={color}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge label="Квадратный" shape="square" />
      <Badge label="Скруглённый" shape="rounded" />
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    label: 'С иконкой',
    startIcon: Tag,
    size: 'md',
    variant: 'solid',
    color: 'primary',
  },
};

export const IconAndNumber: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge label="" startIcon={Tag} circle />
      <Badge label="12" circle />
    </div>
  ),
};

export const WithIconAllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge label="Категория" startIcon={Tag} variant="solid" />
      <Badge label="Метка" startIcon={Tag} variant="ghost" />
      <Badge label="Тег" startIcon={Tag} variant="outline" />
    </div>
  ),
};

export const WithEndAdornment: Story = {
  args: {
    label: 'С элементом справа',
    endAdornment: <X size={14} />,
    size: 'md',
    variant: 'solid',
    color: 'primary',
  },
};

export const WithEndAdornmentExamples: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge
        label="Закрыть"
        endAdornment={<X size={14} />}
        variant="solid"
      />
      <Badge
        label="5"
        endAdornment={<span className="ml-1">шт</span>}
        variant="ghost"
      />
      <Badge
        label="Новое"
        endAdornment={<span className="ml-1 text-control-xs">!</span>}
        variant="outline"
      />
    </div>
  ),
};

export const WithStartIconAndEndAdornment: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge
        label="Тег"
        startIcon={Tag}
        endAdornment={<X size={14} />}
        variant="solid"
      />
      <Badge
        label="Категория"
        startIcon={Tag}
        endAdornment={<span className="ml-1 text-control-xs">×</span>}
        variant="ghost"
      />
    </div>
  ),
};

export const WithEndAdornmentTooltip: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge
        label="Подсказка"
        endAdornment={(
          <Tooltip
            description="Дополнительная информация о бейдже"
            placement="top"
            open
          >
            <span className="inline-flex cursor-help">
              <Info size={14} />
            </span>
          </Tooltip>
        )}
        variant="solid"
      />
      <Badge
        label="Закрыть"
        endAdornment={(
          <Tooltip description="Удалить этот тег" placement="top">
            <span className="inline-flex cursor-pointer">
              <X size={14} />
            </span>
          </Tooltip>
        )}
        variant="ghost"
      />
    </div>
  ),
};

export const WithRender: Story = {
  render: () => (
    <Badge label="Ссылка" render={<a href="#badge" />} />
  ),
};
