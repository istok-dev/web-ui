import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер',
    },
    variant: {
      control: 'select',
      options: ['neutral', 'solid'],
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
    size: 'md',
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
          suffix="кг"
        />
      </div>
    );
  },
  args: {
    size: 'md',
    variant: 'neutral',
    suffix: 'кг',
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
          size="sm"
          suffix="кг"
        />
        <NumberInput
          value={v2}
          onValueChange={setV2}
          size="md"
          suffix="кг"
        />
        <NumberInput
          value={v3}
          onValueChange={setV3}
          size="lg"
          suffix="кг"
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [v1, setV1] = useState<number | null>(100);
    const [v2, setV2] = useState<number | null>(100);

    return (
      <div className="flex w-64 flex-col gap-4">
        <div>
          <label className="mb-1 block text-body-sm text-neutral-600">Neutral</label>
          <NumberInput
            value={v1}
            onValueChange={setV1}
            variant="neutral"
            suffix="кг"
          />
        </div>
        <div>
          <label className="mb-1 block text-body-sm text-neutral-600">Solid</label>
          <NumberInput
            value={v2}
            onValueChange={setV2}
            variant="solid"
            suffix="кг"
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
          suffix="кг"
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
          suffix="кг"
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
