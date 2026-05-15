import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Switch } from './index';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Включён (контролируемый режим)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Включён по умолчанию (неконтролируемый режим)',
    },
    onChange: {
      action: 'changed',
      description: 'Колбэк при переключении',
    },
    disabled: {
      control: 'boolean',
      description: 'Заблокирован',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер',
    },
    className: {
      control: 'text',
      description: 'Дополнительные классы',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        {...args}
        checked={args.checked ?? checked}
        onChange={args.onChange ?? setChecked}
      />
    );
  },
  args: {
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => {
    const [s, setS] = useState(false);
    const [m, setM] = useState(false);
    const [l, setL] = useState(false);
    return (
      <div className="flex items-center gap-6">
        <Switch size="sm" checked={s} onChange={setS} />
        <Switch size="md" checked={m} onChange={setM} />
        <Switch size="lg" checked={l} onChange={setL} />
      </div>
    );
  },
};

/* Grid as on the design: rows = sm, md, lg; columns = Off, Hover (off), On, Disabled off, Disabled on */
export const AllStates: Story = {
  render: () => {
    const [checkedL, setCheckedL] = useState(false);
    const [checkedM, setCheckedM] = useState(false);
    const [checkedS, setCheckedS] = useState(false);
    const sizes: Array<{
      size: 'sm' | 'md' | 'lg';
      checked: boolean;
      setChecked: (v: boolean) => void;
    }> = [
      { size: 'lg', checked: checkedL, setChecked: setCheckedL },
      { size: 'md', checked: checkedM, setChecked: setCheckedM },
      { size: 'sm', checked: checkedS, setChecked: setCheckedS },
    ];
    return (
      <div className="rounded-xl bg-[#282828] p-6">
        <div className="grid grid-cols-5 place-items-center gap-8">
          <div className="text-body-sm text-neutral-400">Выкл</div>
          <div className="text-body-sm text-neutral-400">Ховер</div>
          <div className="text-body-sm text-neutral-400">Вкл</div>
          <div className="text-body-sm text-neutral-400">Выкл (disabled)</div>
          <div className="text-body-sm text-neutral-400">Вкл (disabled)</div>
          {sizes.map(({ size, checked, setChecked }) => (
            <React.Fragment key={size}>
              <Switch size={size} checked={false} onChange={() => {}} />
              <Switch
                size={size}
                checked={false}
                onChange={() => {}}
                className="istok-switch--hover"
              />
              <Switch size={size} checked={checked} onChange={setChecked} />
              <Switch size={size} checked={false} disabled />
              <Switch size={size} checked disabled />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};
