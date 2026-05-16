import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';

import { Dropdown } from './index';
import { Button } from '../button';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Дополнительные классы контейнера',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown className="
      min-w-50 overflow-hidden rounded-2xl border border-neutral-200
      bg-neutral-50 py-2 shadow-lg
    "
    >
      <Dropdown.Item
        label="Профиль"
        startIcon={User}
        defaultSize="m"
        onClick={() => {}}
      />
      <Dropdown.Item
        label="Настройки"
        startIcon={Settings}
        defaultSize="m"
        onClick={() => {}}
      />
      <Dropdown.Item
        label="Выйти"
        startIcon={LogOut}
        defaultSize="m"
        onClick={() => {}}
        startIconProps={{ className: 'text-negative-600' }}
        classes={{ label: '!text-negative-600' }}
        className="
          bg-transparent!
          hover:bg-negative-50!
        "
      />
    </Dropdown>
  ),
};

export const WithTrigger: Story = {
  render: function WithTriggerStory() {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative">
        <Button variant="secondary" onClick={() => setOpen(v => !v)}>
          Меню
          <ChevronDown className={open ? 'rotate-180' : ''} />
        </Button>
        {open && (
          <div
            className="
              absolute top-full left-0 z-50 mt-2 opacity-100 transition-opacity
              duration-200
            "
            onBlur={() => setOpen(false)}
          >
            <Dropdown className="
              min-w-50 overflow-hidden rounded-2xl border border-neutral-200
              bg-neutral-50 py-2 shadow-lg
            "
            >
              <Dropdown.Item
                label="Профиль"
                startIcon={User}
                defaultSize="m"
                onClick={() => setOpen(false)}
              />
              <Dropdown.Item
                label="Настройки"
                startIcon={Settings}
                defaultSize="m"
                onClick={() => setOpen(false)}
              />
              <Dropdown.Item
                label="Выйти"
                startIcon={LogOut}
                defaultSize="m"
                onClick={() => setOpen(false)}
              />
            </Dropdown>
          </div>
        )}
      </div>
    );
  },
};

export const ItemSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown className="
        min-w-45 overflow-hidden rounded-2xl border border-neutral-200
        bg-neutral-50 py-2 shadow-lg
      "
      >
        <Dropdown.Item label="Размер S" defaultSize="s" onClick={() => {}} />
        <Dropdown.Item label="Размер S" defaultSize="s" onClick={() => {}} />
      </Dropdown>
      <Dropdown className="
        min-w-50 overflow-hidden rounded-2xl border border-neutral-200
        bg-neutral-50 py-2 shadow-lg
      "
      >
        <Dropdown.Item label="Размер M" defaultSize="m" onClick={() => {}} />
        <Dropdown.Item label="Размер M" defaultSize="m" onClick={() => {}} />
      </Dropdown>
      <Dropdown className="
        min-w-55 overflow-hidden rounded-2xl border border-neutral-200
        bg-neutral-50 py-2 shadow-lg
      "
      >
        <Dropdown.Item label="Размер L" defaultSize="l" onClick={() => {}} />
        <Dropdown.Item label="Размер L" defaultSize="l" onClick={() => {}} />
      </Dropdown>
    </div>
  ),
};

export const BrandVariant: Story = {
  render: () => (
    <Dropdown className="
      min-w-50 overflow-hidden rounded-2xl bg-primary-600 py-2
    "
    >
      <Dropdown.Item
        label="Пункт меню"
        variant="brand"
        defaultSize="m"
        onClick={() => {}}
      />
      <Dropdown.Item
        label="Ещё пункт"
        variant="brand"
        defaultSize="m"
        onClick={() => {}}
      />
    </Dropdown>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Dropdown className="
      min-w-50 overflow-hidden rounded-2xl border border-neutral-200
      bg-neutral-50 py-2 shadow-lg
    "
    >
      <Dropdown.Item
        label="Активный пункт"
        defaultSize="m"
        onClick={() => {}}
      />
      <Dropdown.Item
        label="Неактивный пункт"
        defaultSize="m"
        disabled
        onClick={() => {}}
      />
      <Dropdown.Item label="Ещё активный" defaultSize="m" onClick={() => {}} />
    </Dropdown>
  ),
};
