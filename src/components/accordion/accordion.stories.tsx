import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar, Info, Settings } from 'lucide-react';
import { useState } from 'react';

import { ACCORDION_SIZES } from './accordion.types';
import { Accordion } from './ui/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="w-[800px] rounded-3xl bg-neutral-100 p-6">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ACCORDION_SIZES,
      description: 'sm — мобильный / вложенный; md — страницы (ниже 768px как sm)',
    },
    defaultValue: {
      control: 'object',
      description: 'Начальные открытые value (строка или массив)',
    },
    value: {
      control: false,
      description: 'Контролируемое значение. Не меняется вместе с size.',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Колбэк при смене открытого пункта',
    },
    multiple: {
      control: 'boolean',
      description: 'Несколько открытых пунктов. API не меняется.',
    },
    keepMounted: {
      control: 'boolean',
      description: 'Держать контент панелей в DOM, скрывать через CSS.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    size: 'md',
  },
  render: args => (
    <Accordion {...args} defaultValue="item1">
      <Accordion.Item value="item1" title="Как работает вишлист?">
        Откройте пункт, чтобы прочитать ответ. Карточка без бордера,
        тень появляется при наведении.
      </Accordion.Item>
      <Accordion.Item value="item2" title="Можно ли открыть несколько сразу?">
        По умолчанию нет. Включите multiple на корне.
      </Accordion.Item>
      <Accordion.Item value="item3" title="Где шеврон?">
        Один chevron-down, контейнер поворачивается на 180°.
      </Accordion.Item>
    </Accordion>
  ),
};

export const DsCard: Story = {
  name: '@dsCard',
  render: () => (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <span className="text-body-sm text-text-secondary">
          size=&quot;md&quot; — открыт, закрыт, наведите для тени
        </span>
        <Accordion size="md" defaultValue="open">
          <Accordion.Item value="open" title="Открытый пункт">
            Тело --text-body-lg, цвет --text-secondary, отступ сверху 16.
            Наведите, чтобы увидеть --shadow-md.
          </Accordion.Item>
          <Accordion.Item value="closed" title="Закрытый пункт">
            Этот текст виден только после раскрытия.
          </Accordion.Item>
        </Accordion>
      </section>
      <section className="flex flex-col gap-3">
        <span className="text-body-sm text-text-secondary">
          size=&quot;sm&quot; — открыт, закрыт, наведите для тени
        </span>
        <Accordion size="sm" defaultValue="open">
          <Accordion.Item value="open" title="Открытый пункт, размер sm">
            Паддинг 16, заголовок --text-title-md, тело --text-body-md.
          </Accordion.Item>
          <Accordion.Item value="closed" title="Закрытый пункт, размер sm">
            Этот текст виден только после раскрытия.
          </Accordion.Item>
        </Accordion>
      </section>
    </div>
  ),
};

export const SizeSm: Story = {
  name: 'Size sm',
  render: () => (
    <Accordion size="sm" defaultValue="item1">
      <Accordion.Item value="item1" title="Компактный размер">
        Для мобильного, карточек и модалок.
      </Accordion.Item>
      <Accordion.Item value="item2" title="Второй пункт">
        Расстояние между карточками всегда 8px.
      </Accordion.Item>
    </Accordion>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Accordion size="md" multiple>
      <Accordion.Item
        value="item1"
        title="С иконкой"
        icon={Calendar}
      >
        Пример текста внутри аккордеона.
      </Accordion.Item>
      <Accordion.Item
        value="item2"
        title="С иконкой и описанием"
        description="description"
        icon={Info}
      >
        Дополнительный текст.
      </Accordion.Item>
      <Accordion.Item
        value="item3"
        title="Настройки"
        icon={Settings}
      >
        Контент третьего пункта.
      </Accordion.Item>
    </Accordion>
  ),
};

export const ExpandedByDefault: Story = {
  render: () => (
    <Accordion defaultValue="item1">
      <Accordion.Item value="item1" title="Открыт по умолчанию">
        Этот пункт открыт по умолчанию благодаря defaultValue на корне.
      </Accordion.Item>
    </Accordion>
  ),
};

export const KeepMounted: Story = {
  args: {
    keepMounted: true,
  },
  render: args => (
    <Accordion {...args}>
      <Accordion.Item value="item1" title="Контент всегда в DOM">
        Закрытая панель остаётся смонтированной и скрывается через CSS.
        Удобно, если внутри нужен сохранённый стейт или тяжёлый mount.
      </Accordion.Item>
      <Accordion.Item value="item2" title="Второй пункт">
        Откройте DevTools: оба panel-узла присутствуют в дереве.
      </Accordion.Item>
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>('item1');

    return (
      <Accordion
        size="md"
        value={value}
        onValueChange={v => setValue(v as string | undefined)}
      >
        <Accordion.Item value="item1" title="Контролируемый пункт 1">
          Открытие/закрытие управляется внешним стейтом.
        </Accordion.Item>
        <Accordion.Item value="item2" title="Контролируемый пункт 2">
          Второй пункт.
        </Accordion.Item>
      </Accordion>
    );
  },
};
