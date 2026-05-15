import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info, Settings } from 'lucide-react';
import { useState } from 'react';

import { Accordion } from './ui/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'object',
      description: 'Начальные открытые value (строка или массив)',
    },
    value: {
      control: false,
      description: 'Контролируемое значение',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Колбэк при смене открытого пункта',
    },
    multiple: {
      control: 'boolean',
      description: 'Несколько открытых пунктов',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item
        value="item1"
        title="Заголовок аккордеона"
      >
        Это пример текста внутри аккордеона. Здесь может быть любой контент:
        описание, список, ссылки и т.д.
      </Accordion.Item>
    </Accordion>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item
        value="item1"
        title="Аккордеон с иконкой"
        icon={Info}
      >
        Слева от заголовка отображается иконка. Используйте её для обозначения
        типа контента или статуса.
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

export const MultipleItems: Story = {
  render: () => (
    <Accordion defaultValue="item2">
      <Accordion.Item value="item1" title="Первый пункт">
        Контент первого пункта.
      </Accordion.Item>
      <Accordion.Item value="item2" title="Второй пункт (открыт по умолчанию)">
        Контент второго пункта.
      </Accordion.Item>
      <Accordion.Item value="item3" title="Третий пункт" icon={Settings}>
        Контент третьего пункта с иконкой.
      </Accordion.Item>
    </Accordion>
  ),
};

export const MultipleOpen: Story = {
  render: () => (
    <Accordion defaultValue={['item1', 'item3']} multiple>
      <Accordion.Item value="item1" title="Первый">
        Можно открыть несколько пунктов одновременно.
      </Accordion.Item>
      <Accordion.Item value="item2" title="Второй">
        Второй пункт.
      </Accordion.Item>
      <Accordion.Item value="item3" title="Третий">
        Третий пункт.
      </Accordion.Item>
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>('item1');

    return (
      <Accordion
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
