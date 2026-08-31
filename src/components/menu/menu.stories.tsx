import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogOut, Settings, Trash2, User } from 'lucide-react';

import { Menu } from './index';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
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

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu>
      <Menu.Item
        label="Профиль"
        startIcon={User}
        variant="brand"
        size="md"
        onClick={() => {}}
      />
      <Menu.Item
        label="Настройки"
        startIcon={Settings}
        variant="brand"
        size="md"
        onClick={() => {}}
      />
      <Menu.Item
        label="Выйти"
        startIcon={LogOut}
        variant="brand"
        size="md"
        onClick={() => {}}
      />
    </Menu>
  ),
};

export const BaseVariant: Story = {
  render: () => (
    <Menu>
      <Menu.Item
        label="Профиль"
        startIcon={User}
        size="md"
        onClick={() => {}}
      />
      <Menu.Item
        label="Настройки"
        startIcon={Settings}
        size="md"
        onClick={() => {}}
      />
      <Menu.Separator />
      <Menu.Item
        label="Выйти"
        startIcon={LogOut}
        variant="danger"
        size="md"
        onClick={() => {}}
      />
    </Menu>
  ),
};

export const ItemSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Menu className="min-w-45">
        <Menu.Item label="Размер SM" variant="brand" size="sm" onClick={() => {}} />
        <Menu.Item label="Размер SM" variant="brand" size="sm" onClick={() => {}} />
      </Menu>
      <Menu>
        <Menu.Item label="Размер MD" variant="brand" size="md" onClick={() => {}} />
        <Menu.Item label="Размер MD" variant="brand" size="md" onClick={() => {}} />
      </Menu>
      <Menu className="min-w-55">
        <Menu.Item label="Размер LG" variant="brand" size="lg" onClick={() => {}} />
        <Menu.Item label="Размер LG" variant="brand" size="lg" onClick={() => {}} />
      </Menu>
    </div>
  ),
};

export const BrandVariant: Story = {
  render: () => (
    <Menu>
      <Menu.Item
        label="Пункт меню"
        variant="brand"
        size="md"
        onClick={() => {}}
      />
      <Menu.Item
        label="Ещё пункт"
        variant="brand"
        size="md"
        onClick={() => {}}
      />
    </Menu>
  ),
};

export const DangerVariant: Story = {
  render: () => (
    <Menu>
      <Menu.Item
        label="Редактировать"
        startIcon={Settings}
        size="md"
        onClick={() => {}}
      />
      <Menu.Separator />
      <Menu.Item
        label="Удалить"
        startIcon={Trash2}
        variant="danger"
        size="md"
        onClick={() => {}}
      />
    </Menu>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Menu>
      <Menu.Item
        label="Активный пункт"
        variant="brand"
        size="md"
        onClick={() => {}}
      />
      <Menu.Item
        label="Неактивный пункт"
        variant="brand"
        size="md"
        disabled
        onClick={() => {}}
      />
      <Menu.Item label="Ещё активный" variant="brand" size="md" onClick={() => {}} />
    </Menu>
  ),
};
