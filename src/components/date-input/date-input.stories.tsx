import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { DateInput } from './index';
import { Button } from '../button';
import { Field } from '../field';
import { Modal } from '../modal';

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description: 'Выбранная дата',
    },
    onChange: {
      control: false,
      description: 'Колбэк при изменении даты',
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Размер',
    },
    variant: {
      control: 'select',
      options: ['neutral', 'solid', 'opacity', 'filled'],
      description: 'Вариант стиля',
    },
    disabled: {
      control: 'boolean',
      description: 'Заблокированное состояние',
    },
    disabledDates: {
      control: false,
      description: 'Заблокированные даты в календаре',
    },
    pt: {
      control: false,
      description: 'PassThrough для input, iconButton, trigger, positioner, calendar',
      table: {
        type: {
          summary: 'DateInputPassThrough',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(undefined);

    return (
      <div className="w-80">
        <DateInput {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: 'ДД.ММ.ГГГГ',
    size: 'md',
    variant: 'neutral',
  },
};

export const WithInitialValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(
      () => new Date(2026, 0, 15),
    );

    return (
      <div className="w-80">
        <DateInput {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = useState<Date | undefined>(undefined);
    const [md, setMd] = useState<Date | undefined>(undefined);
    const [lg, setLg] = useState<Date | undefined>(undefined);

    return (
      <div className="flex w-80 flex-col gap-4">
        <DateInput value={sm} onChange={setSm} placeholder="Размер S" size="sm" />
        <DateInput value={md} onChange={setMd} placeholder="Размер M" size="md" />
        <DateInput value={lg} onChange={setLg} placeholder="Размер L" size="lg" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(
      () => new Date(2026, 2, 12),
    );

    return (
      <div className="w-80">
        <DateInput value={value} onChange={setValue} disabled />
      </div>
    );
  },
};

export const DisabledDates: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(undefined);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div className="w-80">
        <DateInput
          value={value}
          onChange={setValue}
          disabledDates={date => date < today}
        />
        <p className="mt-2 text-body-sm text-neutral-600">
          Прошлые даты в календаре заблокированы
        </p>
      </div>
    );
  },
};

export const WithField: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(undefined);

    return (
      <div className="w-80">
        <Field>
          <Field.Label className="
            mb-1.5 block text-control-md font-medium text-neutral-950
          "
          >
            Дата рождения
          </Field.Label>
          <DateInput value={value} onChange={setValue} />
        </Field>
      </div>
    );
  },
};

export const InModal: Story = {
  render: function InModalStory() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<Date | undefined>(undefined);

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Открыть модальное окно
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Header
            title="Выбор даты"
            description="Календарь открывается поверх модального окна"
          />
          <Modal.Body>
            <Field>
              <Field.Label className="
                mb-1.5 block text-control-md font-medium text-neutral-950
              "
              >
                Дата
              </Field.Label>
              <DateInput value={value} onChange={setValue} />
            </Field>
          </Modal.Body>
          <Modal.Footer>
            <BaseDialog.Close
              render={closeProps => (
                <Button
                  {...closeProps}
                  variant="secondary"
                  color="neutral"
                  size="md"
                >
                  Отмена
                </Button>
              )}
            />
            <Button
              variant="primary"
              color="primary"
              size="md"
              onClick={() => setOpen(false)}
            >
              Применить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
