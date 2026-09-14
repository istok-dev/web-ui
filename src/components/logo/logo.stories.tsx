import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

import { Logo } from './index';
import { LOGO_SIZES, LOGO_VARIANTS } from './logo.types';

const primaryBackgroundDecorator = (Story: () => ReactNode) => (
  <div className="rounded-xl bg-primary-600 p-8">
    <Story />
  </div>
);

const lightBackgroundDecorator = (Story: () => ReactNode) => (
  <div className="rounded-xl bg-neutral-50 p-8">
    <Story />
  </div>
);

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  decorators: [primaryBackgroundDecorator],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: LOGO_SIZES,
      description: 'Высота логотипа: sm — 32px, md — 48px, lg — 80px',
    },
    variant: {
      control: 'select',
      options: LOGO_VARIANTS,
      description:
        'default — полный логотип, icon — только знак, dev — с пометкой dev, text — текстовый, text-dev — текстовый с пометкой dev',
    },
    inverse: {
      control: 'boolean',
      description: 'Инверсивный логотип (primary-600) для светлого фона',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'default',
  },
};

export const Icon: Story = {
  args: {
    size: 'md',
    variant: 'icon',
  },
};

export const Dev: Story = {
  args: {
    size: 'md',
    variant: 'dev',
  },
};

export const Text: Story = {
  args: {
    size: 'md',
    variant: 'text',
  },
};

export const TextDev: Story = {
  args: {
    size: 'md',
    variant: 'text-dev',
  },
};

export const DefaultInverse: Story = {
  decorators: [lightBackgroundDecorator],
  args: {
    size: 'md',
    variant: 'default',
    inverse: true,
  },
};

export const IconInverse: Story = {
  decorators: [lightBackgroundDecorator],
  args: {
    size: 'md',
    variant: 'icon',
    inverse: true,
  },
};

export const TextInverse: Story = {
  decorators: [lightBackgroundDecorator],
  args: {
    size: 'md',
    variant: 'text',
    inverse: true,
  },
};

export const TextDevInverse: Story = {
  decorators: [lightBackgroundDecorator],
  args: {
    size: 'md',
    variant: 'text-dev',
    inverse: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      {LOGO_SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-body-sm text-on-accent/60">
            {size}
            {' '}
            (
            {size === 'sm' ? '32px' : size === 'md' ? '48px' : '80px'}
            )
          </span>
          <Logo size={size} variant="default" />
        </div>
      ))}
    </div>
  ),
};

export const IconAllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      {LOGO_SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-body-sm text-on-accent/60">{size}</span>
          <Logo size={size} variant="icon" />
        </div>
      ))}
    </div>
  ),
};

export const AllSizesInverse: Story = {
  decorators: [lightBackgroundDecorator],
  render: () => (
    <div className="flex flex-col items-start gap-8">
      {LOGO_SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-body-sm text-neutral-600">
            {size}
            {' '}
            (
            {size === 'sm' ? '32px' : size === 'md' ? '48px' : '80px'}
            )
          </span>
          <Logo size={size} variant="default" inverse />
        </div>
      ))}
    </div>
  ),
};

export const IconAllSizesInverse: Story = {
  decorators: [lightBackgroundDecorator],
  render: () => (
    <div className="flex flex-col items-start gap-8">
      {LOGO_SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-body-sm text-neutral-600">{size}</span>
          <Logo size={size} variant="icon" inverse />
        </div>
      ))}
    </div>
  ),
};

export const TextAllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      {LOGO_SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-body-sm text-on-accent/60">
            {size}
            {' '}
            (
            {size === 'sm' ? '32px' : size === 'md' ? '48px' : '80px'}
            )
          </span>
          <Logo size={size} variant="text" />
        </div>
      ))}
    </div>
  ),
};

export const TextDevAllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      {LOGO_SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-body-sm text-on-accent/60">
            {size}
            {' '}
            (
            {size === 'sm' ? '32px' : size === 'md' ? '48px' : '80px'}
            )
          </span>
          <Logo size={size} variant="text-dev" />
        </div>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <span className="text-body-sm text-on-accent/60">На primary-600</span>
        <div className="flex flex-wrap items-center gap-8">
          <Logo variant="default" />
          <Logo variant="icon" />
          <Logo variant="dev" />
          <Logo variant="text" />
          <Logo variant="text-dev" />
        </div>
      </div>
      <div className={cn('flex flex-col gap-3 rounded-xl bg-neutral-50 p-6')}>
        <span className="text-body-sm text-neutral-600">Инверсивные на светлом</span>
        <div className="flex flex-wrap items-center gap-8">
          <Logo variant="default" inverse />
          <Logo variant="icon" inverse />
          <Logo variant="dev" inverse />
          <Logo variant="text" inverse />
          <Logo variant="text-dev" inverse />
        </div>
      </div>
    </div>
  ),
};
