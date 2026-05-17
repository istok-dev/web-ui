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
    defaultSize: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Размер',
    },
    variant: {
      control: 'select',
      options: ['neutral', 'solid', 'outline', 'opacity'],
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
    defaultSize: 'm',
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
          defaultSize="s"
        />
        <PasswordInput
          value={valueM}
          onChange={setValueM}
          placeholder="Размер M"
          defaultSize="m"
        />
        <PasswordInput
          value={valueL}
          onChange={setValueL}
          placeholder="Размер L"
          defaultSize="l"
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [neutral, setNeutral] = useState('');
    const [solid, setSolid] = useState('');
    const [outline, setOutline] = useState('');

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
          value={outline}
          onChange={setOutline}
          placeholder="Outline"
          variant="outline"
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
