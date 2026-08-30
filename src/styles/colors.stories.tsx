import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC, ReactNode } from 'react';

const Swatch: FC<{
  label: string;
  token: string;
  children: ReactNode;
}> = ({ label, token, children }) => (
  <div className="flex w-20 flex-col gap-2">
    {children}
    <div className="flex flex-col gap-0.5">
      <span className="text-control-sm font-semibold text-text-strong">
        {label}
      </span>
      <span className="truncate text-control-xs text-text-muted">
        {token}
      </span>
    </div>
  </div>
);

const ColorSquare: FC<{ className: string }> = ({ className }) => (
  <div
    className={`
      size-20 rounded-lg outline outline-neutral-200
      ${className}
    `}
  />
);

const PaletteRow: FC<{
  title: string;
  children: ReactNode;
}> = ({ title, children }) => (
  <section className="flex flex-col gap-3">
    <h3 className="text-title-md font-bold text-text-strong">
      {title}
    </h3>
    <div className="flex flex-wrap gap-3">
      {children}
    </div>
  </section>
);

const ColorsPage: FC = () => (
  <div className="flex w-full max-w-6xl flex-col gap-10 p-2">
    <header className="flex flex-col gap-1">
      <h2 className="text-headline-sm font-bold text-text-strong">
        Colors
      </h2>
      <p className="text-body-md text-text-secondary">
        Палитра токенов из
        {' '}
        <code className="text-control-sm">theme.css</code>
      </p>
    </header>

    <PaletteRow title="Surfaces">
      <Swatch label="Page" token="--color-surface-page">
        <ColorSquare className="bg-surface-page" />
      </Swatch>
      <Swatch label="Card" token="--color-surface-card">
        <ColorSquare className="bg-surface-card" />
      </Swatch>
      <Swatch label="Muted" token="--color-surface-muted">
        <ColorSquare className="bg-surface-muted" />
      </Swatch>
    </PaletteRow>

    <section className="flex flex-col gap-3">
      <h3 className="text-title-md font-bold text-text-strong">
        Text
      </h3>
      <div className="flex flex-wrap gap-3">
        <div className="
          flex w-20 flex-col gap-2 rounded-xl bg-(--color-surface-card) p-3
        "
        >
          <span className="text-title-lg font-bold text-text-strong">Aa</span>
          <span className="text-control-sm font-semibold text-text-strong">
            Strong
          </span>
          <span className="truncate text-control-xs text-text-muted">--color-text-strong</span>
        </div>
        <div className="
          flex w-20 flex-col gap-2 rounded-xl bg-(--color-surface-card) p-3
        "
        >
          <span className="text-title-lg font-bold text-text-body">Aa</span>
          <span className="text-control-sm font-semibold text-text-strong">
            Body
          </span>
          <span className="truncate text-control-xs text-text-muted">--color-text-body</span>
        </div>
        <div className="
          flex w-20 flex-col gap-2 rounded-xl bg-(--color-surface-card) p-3
        "
        >
          <span className="text-title-lg font-bold text-text-secondary">
            Aa
          </span>
          <span className="text-control-sm font-semibold text-text-strong">
            Secondary
          </span>
          <span className="truncate text-control-xs text-text-muted">--color-text-secondary</span>
        </div>
        <div className="
          flex w-20 flex-col gap-2 rounded-xl bg-(--color-surface-card) p-3
        "
        >
          <span className="text-title-lg font-bold text-text-muted">Aa</span>
          <span className="text-control-sm font-semibold text-text-strong">
            Muted
          </span>
          <span className="truncate text-control-xs text-text-muted">--color-text-muted</span>
        </div>
      </div>
    </section>

    <PaletteRow title="Special">
      <Swatch label="Aqua 400" token="--color-aqua-400">
        <ColorSquare className="bg-aqua-400" />
      </Swatch>
      <Swatch label="Water gradient" token="--gradient-water">
        <ColorSquare className="bg-(image:--gradient-water)" />
      </Swatch>
    </PaletteRow>

    <PaletteRow title="Primary">
      <Swatch label="50" token="--color-primary-50">
        <ColorSquare className="bg-primary-50" />
      </Swatch>
      <Swatch label="100" token="--color-primary-100">
        <ColorSquare className="bg-primary-100" />
      </Swatch>
      <Swatch label="200" token="--color-primary-200">
        <ColorSquare className="bg-primary-200" />
      </Swatch>
      <Swatch label="300" token="--color-primary-300">
        <ColorSquare className="bg-primary-300" />
      </Swatch>
      <Swatch label="400" token="--color-primary-400">
        <ColorSquare className="bg-primary-400" />
      </Swatch>
      <Swatch label="500" token="--color-primary-500">
        <ColorSquare className="bg-primary-500" />
      </Swatch>
      <Swatch label="600" token="--color-primary-600">
        <ColorSquare className="bg-primary-600" />
      </Swatch>
      <Swatch label="700" token="--color-primary-700">
        <ColorSquare className="bg-primary-700" />
      </Swatch>
      <Swatch label="800" token="--color-primary-800">
        <ColorSquare className="bg-primary-800" />
      </Swatch>
      <Swatch label="900" token="--color-primary-900">
        <ColorSquare className="bg-primary-900" />
      </Swatch>
      <Swatch label="950" token="--color-primary-950">
        <ColorSquare className="bg-primary-950" />
      </Swatch>
    </PaletteRow>

    <PaletteRow title="Neutral">
      <Swatch label="50" token="--color-neutral-50">
        <ColorSquare className="bg-neutral-50" />
      </Swatch>
      <Swatch label="100" token="--color-neutral-100">
        <ColorSquare className="bg-neutral-100" />
      </Swatch>
      <Swatch label="200" token="--color-neutral-200">
        <ColorSquare className="bg-neutral-200" />
      </Swatch>
      <Swatch label="300" token="--color-neutral-300">
        <ColorSquare className="bg-neutral-300" />
      </Swatch>
      <Swatch label="400" token="--color-neutral-400">
        <ColorSquare className="bg-neutral-400" />
      </Swatch>
      <Swatch label="500" token="--color-neutral-500">
        <ColorSquare className="bg-neutral-500" />
      </Swatch>
      <Swatch label="600" token="--color-neutral-600">
        <ColorSquare className="bg-neutral-600" />
      </Swatch>
      <Swatch label="700" token="--color-neutral-700">
        <ColorSquare className="bg-neutral-700" />
      </Swatch>
      <Swatch label="800" token="--color-neutral-800">
        <ColorSquare className="bg-neutral-800" />
      </Swatch>
      <Swatch label="900" token="--color-neutral-900">
        <ColorSquare className="bg-neutral-900" />
      </Swatch>
      <Swatch label="950" token="--color-neutral-950">
        <ColorSquare className="bg-neutral-950" />
      </Swatch>
    </PaletteRow>

    <PaletteRow title="Accent">
      <Swatch label="50" token="--color-accent-50">
        <ColorSquare className="bg-accent-50" />
      </Swatch>
      <Swatch label="100" token="--color-accent-100">
        <ColorSquare className="bg-accent-100" />
      </Swatch>
      <Swatch label="200" token="--color-accent-200">
        <ColorSquare className="bg-accent-200" />
      </Swatch>
      <Swatch label="300" token="--color-accent-300">
        <ColorSquare className="bg-accent-300" />
      </Swatch>
      <Swatch label="400" token="--color-accent-400">
        <ColorSquare className="bg-accent-400" />
      </Swatch>
      <Swatch label="500" token="--color-accent-500">
        <ColorSquare className="bg-accent-500" />
      </Swatch>
      <Swatch label="600" token="--color-accent-600">
        <ColorSquare className="bg-accent-600" />
      </Swatch>
      <Swatch label="700" token="--color-accent-700">
        <ColorSquare className="bg-accent-700" />
      </Swatch>
      <Swatch label="800" token="--color-accent-800">
        <ColorSquare className="bg-accent-800" />
      </Swatch>
      <Swatch label="900" token="--color-accent-900">
        <ColorSquare className="bg-accent-900" />
      </Swatch>
      <Swatch label="950" token="--color-accent-950">
        <ColorSquare className="bg-accent-950" />
      </Swatch>
    </PaletteRow>

    <PaletteRow title="Positive">
      <Swatch label="50" token="--color-positive-50">
        <ColorSquare className="bg-positive-50" />
      </Swatch>
      <Swatch label="100" token="--color-positive-100">
        <ColorSquare className="bg-positive-100" />
      </Swatch>
      <Swatch label="200" token="--color-positive-200">
        <ColorSquare className="bg-positive-200" />
      </Swatch>
      <Swatch label="300" token="--color-positive-300">
        <ColorSquare className="bg-positive-300" />
      </Swatch>
      <Swatch label="400" token="--color-positive-400">
        <ColorSquare className="bg-positive-400" />
      </Swatch>
      <Swatch label="500" token="--color-positive-500">
        <ColorSquare className="bg-positive-500" />
      </Swatch>
      <Swatch label="600" token="--color-positive-600">
        <ColorSquare className="bg-positive-600" />
      </Swatch>
      <Swatch label="700" token="--color-positive-700">
        <ColorSquare className="bg-positive-700" />
      </Swatch>
      <Swatch label="800" token="--color-positive-800">
        <ColorSquare className="bg-positive-800" />
      </Swatch>
      <Swatch label="900" token="--color-positive-900">
        <ColorSquare className="bg-positive-900" />
      </Swatch>
      <Swatch label="950" token="--color-positive-950">
        <ColorSquare className="bg-positive-950" />
      </Swatch>
    </PaletteRow>

    <PaletteRow title="Negative">
      <Swatch label="50" token="--color-negative-50">
        <ColorSquare className="bg-negative-50" />
      </Swatch>
      <Swatch label="100" token="--color-negative-100">
        <ColorSquare className="bg-negative-100" />
      </Swatch>
      <Swatch label="200" token="--color-negative-200">
        <ColorSquare className="bg-negative-200" />
      </Swatch>
      <Swatch label="300" token="--color-negative-300">
        <ColorSquare className="bg-negative-300" />
      </Swatch>
      <Swatch label="400" token="--color-negative-400">
        <ColorSquare className="bg-negative-400" />
      </Swatch>
      <Swatch label="500" token="--color-negative-500">
        <ColorSquare className="bg-negative-500" />
      </Swatch>
      <Swatch label="600" token="--color-negative-600">
        <ColorSquare className="bg-negative-600" />
      </Swatch>
      <Swatch label="700" token="--color-negative-700">
        <ColorSquare className="bg-negative-700" />
      </Swatch>
      <Swatch label="800" token="--color-negative-800">
        <ColorSquare className="bg-negative-800" />
      </Swatch>
      <Swatch label="900" token="--color-negative-900">
        <ColorSquare className="bg-negative-900" />
      </Swatch>
      <Swatch label="950" token="--color-negative-950">
        <ColorSquare className="bg-negative-950" />
      </Swatch>
    </PaletteRow>

    <PaletteRow title="Warning">
      <Swatch label="50" token="--color-warning-50">
        <ColorSquare className="bg-warning-50" />
      </Swatch>
      <Swatch label="100" token="--color-warning-100">
        <ColorSquare className="bg-warning-100" />
      </Swatch>
      <Swatch label="200" token="--color-warning-200">
        <ColorSquare className="bg-warning-200" />
      </Swatch>
      <Swatch label="300" token="--color-warning-300">
        <ColorSquare className="bg-warning-300" />
      </Swatch>
      <Swatch label="400" token="--color-warning-400">
        <ColorSquare className="bg-warning-400" />
      </Swatch>
      <Swatch label="500" token="--color-warning-500">
        <ColorSquare className="bg-warning-500" />
      </Swatch>
      <Swatch label="600" token="--color-warning-600">
        <ColorSquare className="bg-warning-600" />
      </Swatch>
      <Swatch label="700" token="--color-warning-700">
        <ColorSquare className="bg-warning-700" />
      </Swatch>
      <Swatch label="800" token="--color-warning-800">
        <ColorSquare className="bg-warning-800" />
      </Swatch>
      <Swatch label="900" token="--color-warning-900">
        <ColorSquare className="bg-warning-900" />
      </Swatch>
      <Swatch label="950" token="--color-warning-950">
        <ColorSquare className="bg-warning-950" />
      </Swatch>
    </PaletteRow>

    <PaletteRow title="Info">
      <Swatch label="50" token="--color-info-50">
        <ColorSquare className="bg-info-50" />
      </Swatch>
      <Swatch label="100" token="--color-info-100">
        <ColorSquare className="bg-info-100" />
      </Swatch>
      <Swatch label="200" token="--color-info-200">
        <ColorSquare className="bg-info-200" />
      </Swatch>
      <Swatch label="300" token="--color-info-300">
        <ColorSquare className="bg-info-300" />
      </Swatch>
      <Swatch label="400" token="--color-info-400">
        <ColorSquare className="bg-info-400" />
      </Swatch>
      <Swatch label="500" token="--color-info-500">
        <ColorSquare className="bg-info-500" />
      </Swatch>
      <Swatch label="600" token="--color-info-600">
        <ColorSquare className="bg-info-600" />
      </Swatch>
      <Swatch label="700" token="--color-info-700">
        <ColorSquare className="bg-info-700" />
      </Swatch>
      <Swatch label="800" token="--color-info-800">
        <ColorSquare className="bg-info-800" />
      </Swatch>
      <Swatch label="900" token="--color-info-900">
        <ColorSquare className="bg-info-900" />
      </Swatch>
      <Swatch label="950" token="--color-info-950">
        <ColorSquare className="bg-info-950" />
      </Swatch>
    </PaletteRow>
  </div>
);

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const Palette: Story = {
  render: () => <ColorsPage />,
};
