import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Tag } from '../tag';
import { SettingRow } from './index';

const meta: Meta<typeof SettingRow> = {
  title: 'Components/SettingRow',
  component: SettingRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'plain'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SettingRow>;

export const Filled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return (
      <div className="w-105">
        <SettingRow
          {...args}
          label="Участники могут приглашать других"
          description="Иначе приглашать можете только вы"
          checked={checked}
          onChange={setChecked}
        />
      </div>
    );
  },
  args: {
    variant: 'filled',
  },
};

export const PlainList: Story = {
  render: () => {
    const [prices, setPrices] = useState(true);
    const [pooling, setPooling] = useState(true);
    const [hide, setHide] = useState(false);
    return (
      <div className="w-120">
        <SettingRow
          variant="plain"
          label="Показывать email в профиле"
          description="Иначе адрес останется скрытым"
          checked={prices}
          onChange={setPrices}
        />
        <SettingRow
          variant="plain"
          label="Разрешить комментарии"
          description="Другие участники смогут оставлять комментарии"
          checked={pooling}
          onChange={setPooling}
        />
        <SettingRow
          variant="plain"
          label="Скрывать статус онлайн"
          description="Другие не увидят, что вы в сети"
          checked={hide}
          onChange={setHide}
        />
      </div>
    );
  },
};

export const CustomControl: Story = {
  render: () => (
    <div className="w-105">
      <SettingRow
        label="Статус проекта"
        description="Кастомный контрол — клик по строке не переключает"
        control={<Tag variant="soft" size="lg">Активен</Tag>}
      />
    </div>
  ),
};
