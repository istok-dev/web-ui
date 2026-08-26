import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Field } from '../field';
import { Textarea } from './index';
import { TEXTAREA_SIZES, TEXTAREA_VARIANTS } from './textarea.types';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: TEXTAREA_SIZES,
    },
    variant: {
      control: 'select',
      options: TEXTAREA_VARIANTS,
    },
    rows: {
      control: { type: 'number', min: 2, max: 12 },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <Textarea {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder:
      'Пара слов о поводе — что за встреча, нужен ли подарок вообще',
    size: 'md',
    variant: 'outline',
    rows: 3,
  },
};

export const WithField: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <Field>
          <Field.Label className="
            mb-1.5 block text-control-md font-medium text-neutral-950
          "
          >
            Описание для гостей
          </Field.Label>
          <Textarea
            value={value}
            onChange={setValue}
            placeholder="Пара слов о поводе — что за встреча, нужен ли подарок вообще"
            rows={3}
          />
        </Field>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    return (
      <div className="flex w-96 flex-col gap-4">
        <Textarea
          value={a}
          onChange={setA}
          variant="outline"
          placeholder="Outline"
        />
        <Textarea
          value={b}
          onChange={setB}
          variant="neutral"
          placeholder="Neutral"
        />
        <Textarea
          value={c}
          onChange={setC}
          variant="solid"
          placeholder="Solid"
        />
      </div>
    );
  },
};
