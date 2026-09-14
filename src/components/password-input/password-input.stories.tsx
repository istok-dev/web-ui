import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { PasswordInput } from './index';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Значение',
    },
    onChange: {
      control: false,
      description: 'Колбэк при изменении значения',
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер',
    },
    variant: {
      control: 'select',
      options: ['neutral', 'solid', 'opacity'],
      description: 'Вариант стиля',
    },
    endAdornment: {
      control: 'boolean',
      description: 'Элемент справа',
    },
    disabled: {
      control: 'boolean',
      description: 'Заблокированное состояние',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div className="w-80">
        <PasswordInput {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: 'Введите пароль',
    size: 'md',
    variant: 'neutral',
  },
};

export const Sizes: Story = {
  render: () => {
    const [valueS, setValueS] = useState('');
    const [valueM, setValueM] = useState('');
    const [valueL, setValueL] = useState('');

    return (
      <div className="flex w-80 flex-col gap-4">
        <PasswordInput
          value={valueS}
          onChange={setValueS}
          placeholder="Размер S"
          size="sm"
        />
        <PasswordInput
          value={valueM}
          onChange={setValueM}
          placeholder="Размер M"
          size="md"
        />
        <PasswordInput
          value={valueL}
          onChange={setValueL}
          placeholder="Размер L"
          size="lg"
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [neutral, setNeutral] = useState('');
    const [solid, setSolid] = useState('');
    const [opacity, setOpacity] = useState('');

    return (
      <div className="flex w-80 flex-col gap-4">
        <PasswordInput
          value={neutral}
          onChange={setNeutral}
          placeholder="Neutral"
          variant="neutral"
        />
        <PasswordInput
          value={solid}
          onChange={setSolid}
          placeholder="Solid"
          variant="solid"
        />
        <PasswordInput
          value={opacity}
          onChange={setOpacity}
          placeholder="Opacity"
          variant="opacity"
        />
      </div>
    );
  },
};

export const ControlledVisibility: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [visible, setVisible] = useState(false);

    return (
      <div className="flex w-80 flex-col gap-4">
        <PasswordInput
          {...args}
          value={value}
          onChange={setValue}
          visible={visible}
          onVisibleChange={setVisible}
        />
        <button
          type="button"
          className="
            text-body-sm text-neutral-600 underline
            hover:text-neutral-900
          "
          onClick={() => setVisible(v => !v)}
        >
          {visible ? 'Скрыть пароль' : 'Показать пароль'}
        </button>
      </div>
    );
  },
  args: {
    placeholder: 'Введите пароль',
  },
};

export const WithoutToggle: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div className="w-80">
        <PasswordInput {...args} value={value} onChange={setValue} endAdornment={null} />
      </div>
    );
  },
  args: {
    placeholder: 'Пароль без кнопки показа',
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('secret');

    return (
      <div className="w-80">
        <PasswordInput {...args} value={value} onChange={setValue} disabled />
      </div>
    );
  },
  args: {
    placeholder: 'Введите пароль',
  },
};
