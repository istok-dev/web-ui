import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, Settings, User } from 'lucide-react';
import { useState } from 'react';

import { TABS_VARIANTS, type TabItemSize } from './tabs.type';
import { Tabs } from './ui/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies TabItemSize[],
      description: 'Размер табов',
    },
    variant: {
      control: 'select',
      options: TABS_VARIANTS,
      description: 'Визуальный вариант табов',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('tab1');
    return (
      <Tabs {...args} value={value} onValueChange={setValue}>
        <Tabs.Item value="tab1" label="Вкладка 1" />
        <Tabs.Item value="tab2" label="Вкладка 2" />
        <Tabs.Item value="tab3" label="Вкладка 3" />
      </Tabs>
    );
  },
  args: {
    size: 'md',
    variant: 'line',
  },
};

export const Variants: Story = {
  render: () => {
    const [line, setLine] = useState('one');
    const [inverse, setInverse] = useState('one');
    const [solid, setSolid] = useState('one');
    return (
      <div className="flex flex-col gap-8">
        <div>
          <p className="mb-2 text-body-sm text-neutral-500">Line</p>
          <Tabs value={line} onValueChange={setLine} variant="line">
            <Tabs.Item value="one" label="Один" />
            <Tabs.Item value="two" label="Два" />
            <Tabs.Item value="three" label="Три" />
          </Tabs>
        </div>
        <div className="rounded-2xl bg-primary-700 p-4">
          <p className="mb-2 text-body-sm text-neutral-50">
            Inverse — на тёмном или цветном фоне
          </p>
          <Tabs value={inverse} onValueChange={setInverse} variant="inverse">
            <Tabs.Item value="one" label="Один" />
            <Tabs.Item value="two" label="Два" />
            <Tabs.Item value="three" label="Три" disabled />
          </Tabs>
        </div>
        <div>
          <p className="mb-2 text-body-sm text-neutral-500">Solid</p>
          <Tabs value={solid} onValueChange={setSolid} variant="solid">
            <Tabs.Item value="one" label="Один" />
            <Tabs.Item value="two" label="Два" />
            <Tabs.Item value="three" label="Три" />
          </Tabs>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [s, setS] = useState('a');
    const [m, setM] = useState('a');
    const [l, setL] = useState('a');
    return (
      <div className="flex flex-col gap-8">
        <div>
          <p className="mb-2 text-body-sm text-neutral-500">Size S</p>
          <Tabs size="sm" value={s} onValueChange={setS}>
            <Tabs.Item value="a" label="Маленький" />
            <Tabs.Item value="b" label="Таб" />
          </Tabs>
        </div>
        <div>
          <p className="mb-2 text-body-sm text-neutral-500">Size M</p>
          <Tabs size="md" value={m} onValueChange={setM}>
            <Tabs.Item value="a" label="Средний" />
            <Tabs.Item value="b" label="Таб" />
          </Tabs>
        </div>
        <div>
          <p className="mb-2 text-body-sm text-neutral-500">Size L</p>
          <Tabs size="lg" value={l} onValueChange={setL}>
            <Tabs.Item value="a" label="Большой" />
            <Tabs.Item value="b" label="Таб" />
          </Tabs>
        </div>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState<string>('profile');
    return (
      <Tabs value={value} onValueChange={setValue}>
        <Tabs.Item value="profile" label="Профиль" startIcon={User} />
        <Tabs.Item value="documents" label="Документы" startIcon={FileText} />
        <Tabs.Item value="settings" label="Настройки" startIcon={Settings} />
      </Tabs>
    );
  },
};

export const WithDisabledTab: Story = {
  render: () => {
    const [value, setValue] = useState<string>('first');
    return (
      <Tabs value={value} onValueChange={setValue}>
        <Tabs.Item value="first" label="Активная" />
        <Tabs.Item value="second" label="Недоступная" disabled />
        <Tabs.Item value="third" label="Третья" />
      </Tabs>
    );
  },
};
