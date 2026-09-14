import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Значение инпута',
    },
    onChange: {
      control: false,
      description: 'Колбэк при изменении значения',
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Размер инпута',
    },
    variant: {
      control: 'select',
      options: ['neutral', 'solid', 'opacity', 'filled'],
      description: 'Вариант стиля инпута',
    },
    startIcon: {
      control: false,
      description: 'Иконка слева',
    },
    startAdornment: {
      control: false,
      description: 'Элемент слева',
    },
    endAdornment: {
      control: false,
      description: 'Элемент справа',
    },
    disabled: {
      control: 'boolean',
      description: 'Заблокированное состояние',
    },
    className: {
      control: 'text',
      description: 'Дополнительные классы для контейнера',
    },
    pt: {
      control: 'object',
      description: 'Дополнительные классы для инпута',
      table: {
        type: {
          summary: 'InputPassThrough',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div className="w-80">
        <Input {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: 'Введите текст',
    size: 'md',
    variant: 'neutral',
  },
};

export const WithPlaceholder: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div className="w-80">
        <Input {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: 'Поиск...',
    size: 'md',
    variant: 'neutral',
  },
};

export const WithStartIcon: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div className="w-80">
        <Input {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: 'Поиск...',
    startIcon: Search,
    size: 'md',
    variant: 'neutral',
  },
};

export const WithStartAdornment: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div className="w-80">
        <Input {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: 'Введите имя',
    startAdornment: <User className="size-4 text-neutral-400" />,
    size: 'md',
    variant: 'neutral',
  },
};

export const WithEndAdornment: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-80">
        <Input
          {...args}
          value={value}
          onChange={setValue}
          type={showPassword ? 'text' : 'password'}
          endAdornment={(
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                text-neutral-400
                hover:text-neutral-600
              "
            >
              {showPassword
                ? (
                  <EyeOff className="size-4" />
                )
                : (
                  <Eye className="size-4" />
                )}
            </button>
          )}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Введите пароль',
    startIcon: Lock,
    size: 'md',
    variant: 'neutral',
  },
};

export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');

    return (
      <div className="flex w-80 flex-col gap-4">
        <Input
          value={value1}
          onChange={setValue1}
          placeholder="Маленький размер"
          size="sm"
        />
        <Input
          value={value2}
          onChange={setValue2}
          placeholder="Средний размер (по умолчанию)"
          size="md"
        />
        <Input
          value={value3}
          onChange={setValue3}
          placeholder="Большой размер"
          size="lg"
        />
        <Input
          value={value4}
          onChange={setValue4}
          placeholder="XL — 52px"
          size="xl"
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');

    return (
      <div className="flex w-80 flex-col gap-4">
        <div>
          <label className="mb-1 block text-body-sm text-neutral-600">Neutral</label>
          <Input
            value={value1}
            onChange={setValue1}
            placeholder="Neutral вариант"
            variant="neutral"
          />
        </div>
        <div>
          <label className="mb-1 block text-body-sm text-neutral-600">Solid</label>
          <Input
            value={value2}
            onChange={setValue2}
            placeholder="Solid вариант"
            variant="solid"
          />
        </div>
        <div>
          <label className="mb-1 block text-body-sm text-neutral-600">Opacity</label>
          <Input
            value={value3}
            onChange={setValue3}
            placeholder="Opacity вариант"
            variant="opacity"
            className="bg-neutral-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-body-sm text-neutral-600">Filled</label>
          <Input
            value={value4}
            onChange={setValue4}
            placeholder="Filled вариант"
            variant="filled"
          />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div className="flex w-80 flex-col gap-4">
        <Input
          {...args}
          value={value}
          onChange={setValue}
          disabled
          placeholder="Заблокированный инпут"
        />
        <Input
          {...args}
          value="Заблокированное значение"
          onChange={setValue}
          disabled
          startIcon={Search}
        />
      </div>
    );
  },
  args: {
    size: 'md',
    variant: 'neutral',
  },
};

export const WithInitialValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('Начальное значение');

    return (
      <div className="w-80">
        <Input {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: 'Введите текст',
    size: 'md',
    variant: 'neutral',
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [search, setSearch] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex w-80 flex-col gap-6">
        <div>
          <label className="
            mb-2 block text-body-sm font-medium text-neutral-700
          "
          >
            Email
          </label>
          <Input
            value={email}
            onChange={setEmail}
            placeholder="example@mail.com"
            startIcon={Mail}
            size="md"
            variant="solid"
          />
        </div>

        <div>
          <label className="
            mb-2 block text-body-sm font-medium text-neutral-700
          "
          >
            Пароль
          </label>
          <Input
            value={password}
            onChange={setPassword}
            placeholder="Введите пароль"
            startIcon={Lock}
            type={showPassword ? 'text' : 'password'}
            endAdornment={(
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  text-neutral-400 transition-colors
                  hover:text-neutral-600
                "
              >
                {showPassword
                  ? (
                    <EyeOff className="size-4" />
                  )
                  : (
                    <Eye className="size-4" />
                  )}
              </button>
            )}
            size="md"
            variant="solid"
          />
        </div>

        <div>
          <label className="
            mb-2 block text-body-sm font-medium text-neutral-700
          "
          >
            Поиск
          </label>
          <Input
            value={search}
            onChange={setSearch}
            placeholder="Поиск..."
            startIcon={Search}
            size="md"
            variant="neutral"
          />
        </div>

        <div className="mt-4 rounded-md bg-neutral-50 p-4">
          <p className="mb-2 text-body-sm font-semibold">Введенные данные:</p>
          {email && (
            <p className="text-body-sm text-neutral-600">
              Email:
              {email}
            </p>
          )}
          {password && (
            <p className="text-body-sm text-neutral-600">
              Пароль:
              {' '}
              {showPassword ? password : '••••••••'}
            </p>
          )}
          {search && (
            <p className="text-body-sm text-neutral-600">
              Поиск:
              {search}
            </p>
          )}
        </div>
      </div>
    );
  },
};
