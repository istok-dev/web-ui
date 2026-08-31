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
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const WithTrigger: Story = {
  render: function WithTriggerStory() {
    const [open, setOpen] = useState(false);

    return (
      <Dropdown
        open={open}
        onOpenChange={setOpen}
        style={{ width: 248 }}
        trigger={(
          <Button variant="secondary">
            Меню
            <ChevronDown className={open ? 'rotate-180' : ''} />
          </Button>
        )}
      >
        <Dropdown.Item label="Профиль" startIcon={User} size="md" />
        <Dropdown.Item label="Настройки" startIcon={Settings} size="md" />
        <Dropdown.Separator />
        <Dropdown.Item
          label="Выйти"
          startIcon={LogOut}
          variant="danger"
          size="md"
        />
      </Dropdown>
    );
  },
};

export const NestedMenu: Story = {
  render: function NestedMenuStory() {
    const [open, setOpen] = useState(false);

    return (
      <Dropdown
        open={open}
        onOpenChange={setOpen}
        style={{ width: 248 }}
        trigger={(
          <Button variant="secondary">
            Меню
            <ChevronDown className={open ? 'rotate-180' : ''} />
          </Button>
        )}
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
    );
  },
};
