import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExternalLink, Plus, Settings, Trash2 } from 'lucide-react';

import type {
  IconButtonColor,
  IconButtonVariant,
  IconButtonSize,
  IconButtonShape,
} from './icon-button.types';
import { IconButton } from './ui/icon-button';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Иконка (Lucide)',
      table: {
        type: { summary: 'LucideIcon' },
        disable: true,
      },
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'clear',
        'clear-inverse',
        'opacity',
      ] as IconButtonVariant[],
      description: 'Визуальный вариант',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'neutral',
        'negative',
        'warning',
        'info',
        'success',
        'accent',
      ] as IconButtonColor[],
      description: 'Цветовая палитра',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'] as IconButtonShape[],
      description: 'Форма кнопки',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as IconButtonSize[],
      description: 'Размер',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: Plus,
    variant: 'primary',
    shape: 'circle',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <IconButton icon={Plus} variant="primary" aria-label="Primary" />
      <IconButton icon={Plus} variant="secondary" aria-label="Secondary" />
      <IconButton icon={Plus} variant="clear" aria-label="Clear" />
      <IconButton
        icon={Plus}
        variant="clear-inverse"
        className="bg-primary-600"
        aria-label="Clear inverse"
      />
      <IconButton
        icon={Plus}
        variant="opacity"
        className="bg-primary-600"
        aria-label="Opacity"
      />
    </div>
  ),
};

const iconButtonColors: IconButtonColor[] = [
  'primary',
  'neutral',
  'negative',
  'warning',
  'info',
  'success',
  'accent',
];

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <section>
        <h3 className="mb-3 text-body-sm font-medium text-neutral-600">
          variant="primary"
        </h3>
        <div className="flex flex-wrap gap-4">
          {iconButtonColors.map(color => (
            <IconButton
              key={color}
              icon={Plus}
              variant="primary"
              color={color}
              aria-label={color}
            />
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-body-sm font-medium text-neutral-600">
          variant="secondary"
        </h3>
        <div className="flex flex-wrap gap-4">
          {iconButtonColors.map(color => (
            <IconButton
              key={color}
              icon={Plus}
              variant="secondary"
              color={color}
              aria-label={color}
            />
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-body-sm font-medium text-neutral-600">
          variant="clear"
        </h3>
        <div className="flex flex-wrap gap-4">
          {iconButtonColors.map(color => (
            <IconButton
              key={color}
              icon={Plus}
              variant="clear"
              color={color}
              aria-label={color}
            />
          ))}
        </div>
      </section>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <IconButton icon={Settings} shape="circle" aria-label="Circle" />
      <IconButton icon={Settings} shape="square" aria-label="Square" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <IconButton icon={Trash2} size="sm" aria-label="Small" />
      <IconButton icon={Trash2} size="md" aria-label="Medium" />
      <IconButton icon={Trash2} size="lg" aria-label="Large" />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    'icon': Plus,
    'loading': true,
    'aria-label': 'Loading',
  },
};

export const Disabled: Story = {
  args: {
    'icon': Plus,
    'disabled': true,
    'aria-label': 'Disabled',
  },
};

export const CustomRender: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <p className="w-full text-body-sm text-neutral-600">
        Рендер как ссылка через
        {' '}
        <code>render</code>
        {' '}
        (Base UI):
      </p>
      <IconButton
        icon={ExternalLink}
        variant="primary"
        aria-label="Открыть в новой вкладке"
        render={props => (
          <a
            {...props}
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
      />
      <IconButton
        icon={ExternalLink}
        variant="clear"
        color="primary"
        aria-label="Ссылка clear"
        render={props => (
          <a
            {...props}
            href="#custom-render"
            onClick={(e) => {
              e.preventDefault();
              alert('Кастомный обработчик (ссылка)');
            }}
          />
        )}
      />
    </div>
  ),
};
