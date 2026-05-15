import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from 'lucide-react';
import React, { useState } from 'react';

import { DatePicker } from './index';
import type { DatePickerValue } from './index';
import { Button } from '../button/ui/button';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description: 'Выбранный диапазон дат',
    },
    onChange: {
      control: false,
      description: 'Колбэк при изменении диапазона',
    },
    defaultRange: {
      control: false,
      description: 'Диапазон по умолчанию',
    },
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Режим выбора: \'single\' - одна дата, \'range\' - диапазон дат',
    },
    disabled: {
      control: false,
      description: 'Заблокированные даты',
    },
    open: {
      control: 'boolean',
      description: 'Управление открытием (контролируемый режим)',
    },
    onOpenChange: {
      control: false,
      description: 'Колбэк при открытии/закрытии',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

const formatDateRange = (range: DatePickerValue): string => {
  if (!range?.from) return 'Выберите даты';
  if (!range.to) {
    return range.from.toLocaleDateString('ru-RU');
  }
  return `${range.from.toLocaleDateString(
    'ru-RU',
  )} - ${range.to.toLocaleDateString('ru-RU')}`;
};

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<DatePickerValue>(undefined);
    const defaultRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    };

    return (
      <div className="p-20">
        <DatePicker
          {...args}
          value={value}
          onChange={setValue}
          defaultRange={defaultRange}
        >
          <button className="
            rounded-md border border-neutral-300 px-4 py-2
            hover:bg-neutral-50
          "
          >
            {formatDateRange(value)}
          </button>
        </DatePicker>
      </div>
    );
  },
  args: {
    value: undefined,
    defaultRange: {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    },
  },
};

export const WithInitialValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<DatePickerValue>(() => ({
      from: new Date(2024, 2, 15),
      to: new Date(2024, 2, 20),
    }));
    const defaultRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    };

    return (
      <div className="p-20">
        <DatePicker
          {...args}
          value={value}
          onChange={setValue}
          defaultRange={defaultRange}
        >
          <button className="
            rounded-md border border-neutral-300 px-4 py-2
            hover:bg-neutral-50
          "
          >
            {formatDateRange(value)}
          </button>
        </DatePicker>
      </div>
    );
  },
  args: {
    value: {
      from: new Date(2024, 2, 15),
      to: new Date(2024, 2, 20),
    },
    defaultRange: {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    },
  },
};

export const WithButtonTrigger: Story = {
  render: (args) => {
    const [value, setValue] = useState<DatePickerValue>(undefined);
    const defaultRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    };

    return (
      <div className="p-20">
        <DatePicker
          {...args}
          value={value}
          onChange={setValue}
          defaultRange={defaultRange}
        >
          <Button startIcon={Calendar}>{formatDateRange(value)}</Button>
        </DatePicker>
      </div>
    );
  },
  args: {
    value: undefined,
    defaultRange: {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<DatePickerValue>(undefined);
    const [open, setOpen] = useState(false);
    const defaultRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    };

    return (
      <div className="flex flex-col items-center gap-4 p-20">
        <DatePicker
          value={value}
          onChange={setValue}
          defaultRange={defaultRange}
          open={open}
          onOpenChange={setOpen}
        >
          <button className="
            rounded-md border border-neutral-300 px-4 py-2
            hover:bg-neutral-50
          "
          >
            {formatDateRange(value)}
          </button>
        </DatePicker>
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Открыть</Button>
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </div>
        <p className="text-body-sm text-neutral-600">
          DatePicker
          {' '}
          {open ? 'открыт' : 'закрыт'}
        </p>
        {value && (
          <p className="text-body-sm text-neutral-600">
            Выбрано:
            {' '}
            {formatDateRange(value)}
          </p>
        )}
      </div>
    );
  },
};

export const WithDisabledDates: Story = {
  render: (args) => {
    const [value, setValue] = useState<DatePickerValue>(undefined);
    const defaultRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    };

    // Заблокируем все выходные дни (суббота и воскресенье)
    const disabled = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // 0 = воскресенье, 6 = суббота
    };

    return (
      <div className="p-20">
        <DatePicker
          {...args}
          mode="range"
          value={value}
          onChange={setValue}
          defaultRange={defaultRange}
          disabled={disabled}
        >
          <button className="
            rounded-md border border-neutral-300 px-4 py-2
            hover:bg-neutral-50
          "
          >
            {formatDateRange(value)}
          </button>
        </DatePicker>
        <p className="mt-4 text-body-sm text-neutral-600">Выходные дни заблокированы</p>
      </div>
    );
  },
  args: {
    value: undefined,
    defaultRange: {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    },
  },
};

export const WithDisabledDateRange: Story = {
  render: (args) => {
    const [value, setValue] = useState<DatePickerValue>(undefined);
    const defaultRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    };

    // Заблокируем даты до сегодняшнего дня
    const disabled = (date: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    };

    return (
      <div className="p-20">
        <DatePicker
          {...args}
          mode="range"
          value={value}
          onChange={setValue}
          defaultRange={defaultRange}
          disabled={disabled}
        >
          <button className="
            rounded-md border border-neutral-300 px-4 py-2
            hover:bg-neutral-50
          "
          >
            {formatDateRange(value)}
          </button>
        </DatePicker>
        <p className="mt-4 text-body-sm text-neutral-600">Прошлые даты заблокированы</p>
      </div>
    );
  },
  args: {
    value: undefined,
    defaultRange: {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    },
  },
};

export const SingleDateSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(undefined);

    return (
      <div className="p-20">
        <DatePicker {...args} mode="single" value={value} onChange={setValue}>
          <button className="
            rounded-md border border-neutral-300 px-4 py-2
            hover:bg-neutral-50
          "
          >
            {value ? value.toLocaleDateString('ru-RU') : 'Выберите дату'}
          </button>
        </DatePicker>
        <p className="mt-4 text-body-sm text-neutral-600">
          Режим выбора одной даты (mode="single")
        </p>
      </div>
    );
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [value1, setValue1] = useState<DatePickerValue>(undefined);
    const [value2, setValue2] = useState<DatePickerValue>(undefined);
    const defaultRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 7),
    };

    return (
      <div className="flex flex-col items-center gap-8 p-20">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-body-lg font-semibold">Выбор периода начала</h3>
          <DatePicker
            value={value1}
            onChange={setValue1}
            defaultRange={defaultRange}
          >
            <Button variant="outline" startIcon={Calendar}>
              {formatDateRange(value1)}
            </Button>
          </DatePicker>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-body-lg font-semibold">Выбор периода окончания</h3>
          <DatePicker
            value={value2}
            onChange={setValue2}
            defaultRange={defaultRange}
          >
            <Button variant="secondary" startIcon={Calendar}>
              {formatDateRange(value2)}
            </Button>
          </DatePicker>
        </div>

        {(value1 || value2) && (
          <div className="mt-4 rounded-md bg-neutral-100 p-4">
            <p className="mb-2 text-body-sm font-semibold">Выбранные периоды:</p>
            {value1 && (
              <p className="text-body-sm">
                Начало:
                {formatDateRange(value1)}
              </p>
            )}
            {value2 && (
              <p className="text-body-sm">
                Окончание:
                {formatDateRange(value2)}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
};
