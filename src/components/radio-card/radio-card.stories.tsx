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
    const [value, setValue] = useState('delivery');
    return (
      <RadioCard.Group
        value={value}
        onChange={setValue}
        className="w-96"
      >
        <RadioCard
          {...args}
          value="delivery"
          label="Доставка"
          description="Курьер привезёт заказ"
        />
        <RadioCard
          {...args}
          value="pickup"
          label="Самовывоз"
          description="Заберу из пункта выдачи"
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
    const [value, setValue] = useState('online');
    const [card, setCard] = useState('');

    return (
      <RadioCard.Group
        value={value}
        onChange={setValue}
        className="w-96"
        gap={12}
      >
        <RadioCard
          value="online"
          label="Онлайн-оплата"
          description="Картой на сайте"
          size="l"
        >
          <Input
            value={card}
            onChange={setCard}
            placeholder="Номер карты"
            variant="filled"
            size="xl"
          />
        </RadioCard>
        <RadioCard
          value="cash"
          label="Наличными"
          description="При получении"
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
