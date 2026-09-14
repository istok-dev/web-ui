import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Input } from '../input';
import { RadioCard } from './index';

const meta: Meta<typeof RadioCard> = {
  title: 'Components/RadioCard',
  component: RadioCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['m', 'l'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioCard>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('email');
    return (
      <RadioCard.Group
        value={value}
        onChange={setValue}
        className="w-96"
      >
        <RadioCard
          {...args}
          value="email"
          label="Email"
          description="Уведомления на почту"
        />
        <RadioCard
          {...args}
          value="push"
          label="Push"
          description="Уведомления в приложении"
        />
      </RadioCard.Group>
    );
  },
  args: {
    size: 'm',
  },
};

export const WithExpandableContent: Story = {
  render: () => {
    const [value, setValue] = useState('email');
    const [address, setAddress] = useState('');

    return (
      <RadioCard.Group
        value={value}
        onChange={setValue}
        className="w-96"
        gap={12}
      >
        <RadioCard
          value="email"
          label="Email"
          description="На указанный адрес"
          size="l"
        >
          <Input
            value={address}
            onChange={setAddress}
            placeholder="Адрес почты"
            variant="filled"
            size="xl"
          />
        </RadioCard>
        <RadioCard
          value="sms"
          label="SMS"
          description="На номер телефона"
          size="l"
        />
      </RadioCard.Group>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioCard.Group
      value="a"
      onChange={() => {}}
      disabled
      className="w-96"
    >
      <RadioCard value="a" label="Вариант A" />
      <RadioCard value="b" label="Вариант B" />
    </RadioCard.Group>
  ),
};
