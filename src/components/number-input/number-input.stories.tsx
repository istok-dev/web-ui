import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { NumberInput } from './index';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Значение (controlled)',
    },
    onValueChange: {
      control: false,
      description: 'Колбэк при изменении значения',
    },
    suffix: {
      control: 'text',
      description: 'Суффикс (например, единица измерения)',
    },
    defaultSize: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Размер',
    },
    variant: {
      control: 'select',
      options: ['neutral', 'solid', 'outline'],
      description: 'Вариант стиля',
    },
    invalid: {
      control: 'boolean',
      description: 'Состояние ошибки',
    },
    disabled: {
      control: 'boolean',
      description: 'Заблокированное состояние',
    },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | null>(100);

    return (
      <div className="w-64">
        <NumberInput {...args} value={value} onValueChange={setValue} />
      </div>
    );
  },
  args: {
    defaultSize: 'm',
    variant: 'neutral',
  },
};

export const WithSuffix: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | null>(100);

    return (
      <div className="w-64">
        <NumberInput
          {...args}
          value={value}
          onValueChange={setValue}
          suffix="P"
        />
      </div>
    );
  },
  args: {
    defaultSize: 'm',
    variant: 'neutral',
    suffix: 'P',
  },
};

export const Sizes: Story = {
  render: () => {
    const [v1, setV1] = useState<number | null>(100);
    const [v2, setV2] = useState<number | null>(100);
    const [v3, setV3] = useState<number | null>(100);

    return (
      <div className="flex w-64 flex-col gap-4">
        <NumberInput
          value={v1}
          onValueChange={setV1}
          defaultSize="s"
          suffix="P"
        />
        <NumberInput
          value={v2}
          onValueChange={setV2}
          defaultSize="m"
          suffix="P"
        />
        <NumberInput
          value={v3}
          onValueChange={setV3}
          defaultSize="l"
          suffix="P"
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [v1, setV1] = useState<number | null>(100);
    const [v2, setV2] = useState<number | null>(100);
    const [v3, setV3] = useState<number | null>(100);

    return (
      <div className="flex w-64 flex-col gap-4">
        <div>
          <label className="mb-1 block text-body-sm text-neutral-600">Neutral</label>
          <NumberInput
            value={v1}
            onValueChange={setV1}
            variant="neutral"
            suffix="P"
          />
        </div>
        <div>
          <label className="mb-1 block text-body-sm text-neutral-600">Solid</label>
          <NumberInput
            value={v2}
            onValueChange={setV2}
            variant="solid"
            suffix="P"
          />
        </div>
        <div>
          <label className="mb-1 block text-body-sm text-neutral-600">Outline</label>
          <NumberInput
            value={v3}
            onValueChange={setV3}
            variant="outline"
            suffix="P"
          />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(100);

    return (
      <div className="flex w-64 flex-col gap-4">
        <NumberInput
          value={value}
          onValueChange={setValue}
          disabled
          suffix="P"
        />
      </div>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(100);

    return (
      <div className="w-64">
        <NumberInput
          value={value}
          onValueChange={setValue}
          invalid
          suffix="P"
        />
      </div>
    );
  },
};

export const MinMaxStep: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(50);

    return (
      <div className="w-64">
        <NumberInput
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={5}
          suffix="%"
        />
      </div>
    );
  },
};
