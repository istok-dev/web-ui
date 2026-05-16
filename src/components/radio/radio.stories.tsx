import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Radio } from './index';
import type { RadioSize } from './radio.types';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultSize: {
      control: 'select',
      options: ['s', 'm', 'l'] as RadioSize[],
      description: 'Размер радио-кнопок',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('2');

    return (
      <div className="w-100">
        <Radio {...args}>
          <Radio.Item
            label="Опция 1"
            name="default"
            value="1"
            checked={value === '1'}
            onChange={() => setValue('1')}
          />
          <Radio.Item
            label="Опция 2"
            name="default"
            value="2"
            checked={value === '2'}
            onChange={() => setValue('2')}
          />
          <Radio.Item
            label="Опция 3"
            name="default"
            value="3"
            checked={value === '3'}
            onChange={() => setValue('3')}
          />
        </Radio>
      </div>
    );
  },
  args: {
    defaultSize: 'm',
  },
};

export const WithDescription: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('2');

    return (
      <div className="w-100">
        <Radio {...args}>
          <Radio.Item
            label="Базовый тариф"
            description="Подходит для ознакомления с платформой"
            name="with-desc"
            value="1"
            checked={value === '1'}
            onChange={() => setValue('1')}
          />
          <Radio.Item
            label="Стандарт"
            description="Рекомендуемый вариант для большинства"
            name="with-desc"
            value="2"
            checked={value === '2'}
            onChange={() => setValue('2')}
          />
          <Radio.Item
            label="Расширенный"
            description="Все возможности без ограничений"
            name="with-desc"
            value="3"
            checked={value === '3'}
            onChange={() => setValue('3')}
          />
        </Radio>
      </div>
    );
  },
  args: {
    defaultSize: 'm',
  },
};

export const Sizes: Story = {
  render: () => {
    const [s, setS] = useState('2');
    const [m, setM] = useState('1');
    const [l, setL] = useState('2');

    return (
      <div className="flex w-100 flex-col gap-8">
        <div>
          <p className="mb-3 text-body-sm font-medium text-neutral-700">Size S</p>
          <Radio defaultSize="s">
            <Radio.Item
              label="Маленький 1"
              name="size-s"
              value="1"
              checked={s === '1'}
              onChange={() => setS('1')}
            />
            <Radio.Item
              label="Маленький 2"
              name="size-s"
              value="2"
              checked={s === '2'}
              onChange={() => setS('2')}
            />
          </Radio>
        </div>
        <div>
          <p className="mb-3 text-body-sm font-medium text-neutral-700">Size M</p>
          <Radio defaultSize="m">
            <Radio.Item
              label="Средний 1"
              name="size-m"
              value="1"
              checked={m === '1'}
              onChange={() => setM('1')}
            />
            <Radio.Item
              label="Средний 2"
              name="size-m"
              value="2"
              checked={m === '2'}
              onChange={() => setM('2')}
            />
          </Radio>
        </div>
        <div>
          <p className="mb-3 text-body-sm font-medium text-neutral-700">Size L</p>
          <Radio defaultSize="l">
            <Radio.Item
              label="Большой 1"
              name="size-l"
              value="1"
              checked={l === '1'}
              onChange={() => setL('1')}
            />
            <Radio.Item
              label="Большой 2"
              name="size-l"
              value="2"
              checked={l === '2'}
              onChange={() => setL('2')}
            />
          </Radio>
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    return (
      <div className="w-100">
        <Radio defaultSize="m">
          <Radio.Item label="Unchecked" name="states" value="1" checked={false} readOnly />
          <Radio.Item label="Checked" name="states" value="2" checked={true} readOnly />
          <Radio.Item
            label="Disabled Unchecked"
            disabled
            name="states"
            value="3"
            checked={false}
            readOnly
          />
          <Radio.Item
            label="Disabled Checked"
            disabled
            name="states"
            value="4"
            checked={true}
            readOnly
          />
        </Radio>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <div className="w-100">
        <Radio {...args}>
          <Radio.Item label="Disabled Unchecked" disabled name="disabled" value="1" checked={false} />
          <Radio.Item label="Disabled Checked" disabled name="disabled" value="2" checked={true} />
        </Radio>
      </div>
    );
  },
  args: {
    defaultSize: 'm',
  },
};

export const WithInfoIcon: Story = {
  render: (args) => {
    const [value, setValue] = useState('1');

    return (
      <div className="w-100">
        <Radio {...args}>
          <Radio.Item
            label="Опция с подсказкой"
            description="Нажмите на иконку для справки"
            showInfoIcon
            onInfoClick={() => alert('Справка по опции')}
            name="info"
            value="1"
            checked={value === '1'}
            onChange={() => setValue('1')}
          />
          <Radio.Item
            label="Обычная опция"
            name="info"
            value="2"
            checked={value === '2'}
            onChange={() => setValue('2')}
          />
        </Radio>
      </div>
    );
  },
  args: {
    defaultSize: 'm',
  },
};
