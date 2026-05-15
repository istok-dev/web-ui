import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Tooltip } from './index';
import type { TooltipPlacement } from './tooltip.types';
import { Button } from '../button/ui/button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
      ] as TooltipPlacement[],
      description: 'Позиция tooltip относительно триггера',
    },
    showArrow: {
      control: 'boolean',
      description: 'Показывать ли стрелку',
    },
    offset: {
      control: 'number',
      description: 'Отступ от триггера в пикселях',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить tooltip',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: args => (
    <div className="p-20">
      <Tooltip {...args}>
        <Button>Наведите на меня</Button>
      </Tooltip>
    </div>
  ),
  args: {
    title: 'Title',
    description: 'Vorem ipsum dolor sit amet, consectetur adipiscing elit.',
    placement: 'top',
    showArrow: true,
    offset: 8,
  },
};

export const WithTitleOnly: Story = {
  render: args => (
    <div className="p-20">
      <Tooltip {...args}>
        <Button>Только заголовок</Button>
      </Tooltip>
    </div>
  ),
  args: {
    title: 'Title',
    placement: 'top',
    showArrow: true,
  },
};

export const WithDescriptionOnly: Story = {
  render: args => (
    <div className="p-20">
      <Tooltip {...args}>
        <Button>Только описание</Button>
      </Tooltip>
    </div>
  ),
  args: {
    title: undefined,
    description: 'Vorem ipsum dolor sit amet, consectetur adipiscing elit.',
    placement: 'top',
    showArrow: true,
  },
};

export const WithoutArrow: Story = {
  render: args => (
    <div className="p-20">
      <Tooltip {...args}>
        <Button>Без стрелки</Button>
      </Tooltip>
    </div>
  ),
  args: {
    title: 'Title',
    description: 'Vorem ipsum dolor sit amet, consectetur adipiscing elit.',
    placement: 'top',
    showArrow: false,
  },
};

export const Placements: Story = {
  render: () => {
    const placements: TooltipPlacement[] = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'right',
    ];

    return (
      <div className="flex flex-col items-center gap-8 p-40">
        <div className="grid grid-cols-4 gap-8">
          {placements.map(placement => (
            <Tooltip
              key={placement}
              title="Title"
              description="Vorem ipsum dolor sit amet, consectetur adipiscing elit."
              placement={placement}
              showArrow={true}
            >
              <Button>{placement}</Button>
            </Tooltip>
          ))}
        </div>
      </div>
    );
  },
};

export const AllPlacementsGrid: Story = {
  render: () => {
    const placements: TooltipPlacement[] = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'right',
    ];

    return (
      <div className="p-40">
        <div className="grid grid-cols-4 justify-items-center gap-16">
          {placements.map(placement => (
            <Tooltip
              key={placement}
              title="Title"
              description="Vorem ipsum dolor sit amet, consectetur adipiscing elit."
              placement={placement}
              showArrow={true}
            >
              <Button>{placement}</Button>
            </Tooltip>
          ))}
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: args => (
    <div className="p-20">
      <Tooltip {...args}>
        <Button>Отключенный tooltip</Button>
      </Tooltip>
    </div>
  ),
  args: {
    title: 'Title',
    description: 'Vorem ipsum dolor sit amet, consectetur adipiscing elit.',
    placement: 'top',
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4 p-20">
        <Tooltip
          title="Title"
          description="Vorem ipsum dolor sit amet, consectetur adipiscing elit."
          placement="top"
          open={open}
          onOpenChange={setOpen}
        >
          <Button>Контролируемый tooltip</Button>
        </Tooltip>
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Открыть</Button>
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </div>
        <p className="text-body-sm text-neutral-600">
          Tooltip
          {' '}
          {open ? 'открыт' : 'закрыт'}
        </p>
      </div>
    );
  },
};

export const WithDifferentContent: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-20">
      <Tooltip
        title="Короткий текст"
        description="Короткое описание"
        placement="top"
      >
        <Button>Короткий текст</Button>
      </Tooltip>

      <Tooltip
        title="Длинный заголовок tooltip"
        description={
          'Очень длинное описание tooltip, которое может занимать несколько строк '
          + 'и содержать много информации для пользователя.'
        }
        placement="top"
      >
        <Button>Длинный текст</Button>
      </Tooltip>

      <Tooltip
        title="Title"
        description="Описание с заголовком"
        placement="top"
      >
        <Button>С заголовком и описанием</Button>
      </Tooltip>
    </div>
  ),
};

export const WithCustomOffset: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-20">
      <Tooltip
        title="Title"
        description="Отступ 4px"
        placement="top"
        offset={4}
      >
        <Button>Маленький отступ</Button>
      </Tooltip>

      <Tooltip
        title="Title"
        description="Отступ 8px (по умолчанию)"
        placement="top"
        offset={8}
      >
        <Button>Стандартный отступ</Button>
      </Tooltip>

      <Tooltip
        title="Title"
        description="Отступ 16px"
        placement="top"
        offset={16}
      >
        <Button>Большой отступ</Button>
      </Tooltip>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 p-20">
      <div className="flex gap-4">
        <Tooltip
          title="Информация"
          description="Нажмите для получения дополнительной информации"
          placement="top"
        >
          <Button variant="primary">Информация</Button>
        </Tooltip>

        <Tooltip
          title="Предупреждение"
          description="Это действие может иметь необратимые последствия"
          placement="top"
        >
          <Button variant="secondary">Предупреждение</Button>
        </Tooltip>

        <Tooltip
          title="Справка"
          description="Подробная информация о функции"
          placement="top"
        >
          <Button variant="clear">Справка</Button>
        </Tooltip>
      </div>

      <div className="flex gap-4">
        <Tooltip
          title="Слева"
          description="Tooltip слева от элемента"
          placement="left"
        >
          <Button>Слева</Button>
        </Tooltip>

        <Tooltip
          title="Справа"
          description="Tooltip справа от элемента"
          placement="right"
        >
          <Button>Справа</Button>
        </Tooltip>
      </div>

      <div className="flex gap-4">
        <Tooltip
          title="Сверху"
          description="Tooltip сверху элемента"
          placement="top"
        >
          <Button>Сверху</Button>
        </Tooltip>

        <Tooltip
          title="Снизу"
          description="Tooltip снизу элемента"
          placement="bottom"
        >
          <Button>Снизу</Button>
        </Tooltip>
      </div>
    </div>
  ),
};
