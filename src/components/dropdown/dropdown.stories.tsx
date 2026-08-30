import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChevronDown,
  Copy,
  FolderOpen,
  LogOut,
  MoreHorizontal,
  Settings,
  Trash2,
  User,
} from 'lucide-react';
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
    <Dropdown>
      <Dropdown.Item
        label="Профиль"
        startIcon={User}
        variant="brand"
        size="md"
        onClick={() => {}}
      />
      <Dropdown.Item
        label="Настройки"
        startIcon={Settings}
        variant="brand"
        size="md"
        onClick={() => {}}
      />
      <Dropdown.Item
        label="Выйти"
        startIcon={LogOut}
        variant="brand"
        size="md"
        onClick={() => {}}
      />
    </Dropdown>
  ),
};

export const BaseVariant: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Item
        label="Профиль"
        startIcon={User}
        size="md"
        onClick={() => {}}
      />
      <Dropdown.Item
        label="Настройки"
        startIcon={Settings}
        size="md"
        onClick={() => {}}
      />
      <Dropdown.Separator />
      <Dropdown.Item
        label="Выйти"
        startIcon={LogOut}
        variant="danger"
        size="md"
        onClick={() => {}}
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
        <div className="absolute top-full left-0 z-50 mt-2">
          <Dropdown
            open={open}
            onOpenChange={setOpen}
            style={{ width: 248 }}
          >
            <Dropdown.Item
              label="Профиль"
              startIcon={User}
              size="md"
            />
            <Dropdown.Item
              label="Настройки"
              startIcon={Settings}
              size="md"
            />
            <Dropdown.Separator />
            <Dropdown.Item
              label="Выйти"
              startIcon={LogOut}
              variant="danger"
              size="md"
            />
          </Dropdown>
        </div>
      </div>
    );
  },
};

export const ItemSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown className="min-w-45">
        <Dropdown.Item label="Размер SM" variant="brand" size="sm" onClick={() => {}} />
        <Dropdown.Item label="Размер SM" variant="brand" size="sm" onClick={() => {}} />
      </Dropdown>
      <Dropdown>
        <Dropdown.Item label="Размер MD" variant="brand" size="md" onClick={() => {}} />
        <Dropdown.Item label="Размер MD" variant="brand" size="md" onClick={() => {}} />
      </Dropdown>
      <Dropdown className="min-w-55">
        <Dropdown.Item label="Размер LG" variant="brand" size="lg" onClick={() => {}} />
        <Dropdown.Item label="Размер LG" variant="brand" size="lg" onClick={() => {}} />
      </Dropdown>
    </div>
  ),
};

export const BrandVariant: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Item
        label="Пункт меню"
        variant="brand"
        size="md"
        onClick={() => {}}
      />
      <Dropdown.Item
        label="Ещё пункт"
        variant="brand"
        size="md"
        onClick={() => {}}
      />
    </Dropdown>
  ),
};

export const DangerVariant: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Item
        label="Редактировать"
        startIcon={Settings}
        size="md"
        onClick={() => {}}
      />
      <Dropdown.Separator />
      <Dropdown.Item
        label="Удалить"
        startIcon={Trash2}
        variant="danger"
        size="md"
        onClick={() => {}}
      />
    </Dropdown>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Item
        label="Активный пункт"
        variant="brand"
        size="md"
        onClick={() => {}}
      />
      <Dropdown.Item
        label="Неактивный пункт"
        variant="brand"
        size="md"
        disabled
        onClick={() => {}}
      />
      <Dropdown.Item label="Ещё активный" variant="brand" size="md" onClick={() => {}} />
    </Dropdown>
  ),
};

export const NestedMenu: Story = {
  render: function NestedMenuStory() {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative">
        <Button variant="secondary" onClick={() => setOpen(v => !v)}>
          Меню
          <ChevronDown className={open ? 'rotate-180' : ''} />
        </Button>
        <div className="absolute top-full left-0 z-50 mt-2">
          <Dropdown
            open={open}
            onOpenChange={setOpen}
            header={(
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="size-11 shrink-0 rounded-xl bg-neutral-200" />
                <div className="min-w-0 flex-1">
                  <div className="
                    truncate text-control-md font-semibold text-text-strong
                  "
                  >
                    Кофемолка Timemore
                  </div>
                  <div className="truncate text-control-sm text-text-muted">
                    6 900 ₽ · свободно
                  </div>
                </div>
              </div>
            )}
            classes={{
              header: 'tablet:hidden',
            }}
          >
            <Dropdown.Item label="Профиль" startIcon={User} size="md" />
            <Dropdown.Item label="Настройки" startIcon={Settings} size="md" />
            <Dropdown.Submenu label="Ещё" startIcon={MoreHorizontal} size="md">
              <Dropdown.Item label="Дублировать" startIcon={Copy} size="md" />
              <Dropdown.Submenu label="Переместить" startIcon={FolderOpen} size="md">
                <Dropdown.Item label="В архив" size="md" />
                <Dropdown.Item label="В избранное" size="md" />
              </Dropdown.Submenu>
              <Dropdown.Separator />
              <Dropdown.Item
                label="Удалить"
                startIcon={Trash2}
                variant="danger"
                size="md"
              />
            </Dropdown.Submenu>
            <Dropdown.Separator />
            <Dropdown.Item
              label="Выйти"
              startIcon={LogOut}
              variant="danger"
              size="md"
            />
          </Dropdown>
        </div>
      </div>
    );
  },
};
