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
      <div className="w-lg">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ACCORDION_SIZES,
      description: 'Типографика заголовка (Nova: h3 | h4 | h5)',
    },
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
      description: 'Несколько открытых пунктов (Nova: collapsible)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    size: 'lg',
  },
  render: args => (
    <Accordion {...args}>
      <Accordion.Item value="item1" title="Title h3">
        Пример текста внутри аккордеона. Здесь может быть описание, подсказка
        или любой другой контент.
      </Accordion.Item>
      <Accordion.Item
        value="item2"
        title="Title h3"
        description="Примеры наполнения контента"
      >
        Просто текст внутри аккордеона.
      </Accordion.Item>
      <Accordion.Item
        value="item3"
        title="Title h3"
        description="Контент монтируется при разворачивании"
      >
        Пример текста внутри аккордеона.
      </Accordion.Item>
    </Accordion>
  ),
};

export const SizeH4: Story = {
  name: 'Size h4',
  render: () => (
    <Accordion size="md" defaultValue="item1">
      <Accordion.Item
        value="item1"
        title="forceOpened | h4"
      >
        Пример текста внутри аккордеона.
      </Accordion.Item>
      <Accordion.Item
        value="item2"
        title="statusIcon — warning"
      >
        Пример текста внутри аккордеона.
      </Accordion.Item>
      <Accordion.Item
        value="item3"
        title="statusIcon — info"
      >
        Content Text. Contrary to popular belief, Lorem Ipsum is not simply
        random text.
      </Accordion.Item>
    </Accordion>
  ),
};

export const SizeH5: Story = {
  name: 'Size h5 + collapsible',
  render: () => (
    <Accordion size="sm" multiple defaultValue={['item1']}>
      <Accordion.Item value="item1" title="Collapsible | h5">
        Пример текста внутри аккордеона.
      </Accordion.Item>
      <Accordion.Item
        value="item2"
        title="Кастомный заголовок"
        description="Можно открыть несколько пунктов"
      >
        ContentText. Contrary to popular belief, Lorem Ipsum is not simply
        random text.
      </Accordion.Item>
    </Accordion>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Accordion size="md" multiple>
      <Accordion.Item
        value="item1"
        title="Icon | collapsible"
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
        ContentText. Contrary to popular belief, Lorem Ipsum is not simply
        random text.
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
