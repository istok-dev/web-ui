import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClockCheck, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../button';
import type { AlertDialogVariant, AlertDialogAlign } from './alert-dialog.types';
import { AlertDialog } from './ui/alert-dialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['positive', 'negative'] as AlertDialogVariant[],
      description: 'Визуальный вариант диалога',
    },
    align: {
      control: 'select',
      options: ['left', 'center'] as AlertDialogAlign[],
      description: 'Выравнивание контента',
    },
    title: {
      control: 'text',
      description: 'Заголовок',
    },
    text: {
      control: 'text',
      description: 'Текст описания',
    },
    cancelLabel: {
      control: 'text',
      description: 'Текст кнопки отмены',
    },
    actionLabel: {
      control: 'text',
      description: 'Текст кнопки действия',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Positive: Story = {
  render: function PositiveStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Сохранить изменения
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          icon={ClockCheck}
          title="Сохранить изменения?"
          text="Новые параметры будут применены после подтверждения."
          variant="positive"
          align="left"
          cancelLabel="Отмена"
          actionLabel="Продолжить"
          onCancel={() => alert('cancel')}
          onAction={() => alert('action')}
        />
      </>
    );
  },
};

export const Negative: Story = {
  render: function NegativeStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="negative" onClick={() => setOpen(true)}>
          Удалить файл
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          icon={Trash2}
          title="Удалить файл?"
          text="Файл будет удалён без возможности восстановления."
          variant="negative"
          align="left"
          cancelLabel="Отмена"
          actionLabel="Удалить"
          onCancel={() => alert('cancel')}
          onAction={() => alert('action')}
        />
      </>
    );
  },
};

export const AlignCenter: Story = {
  render: function AlignCenterStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Открыть (center)
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          icon={ClockCheck}
          title="Сохранить изменения?"
          text="Новые параметры будут применены после подтверждения."
          variant="positive"
          align="center"
          cancelLabel="Отмена"
          actionLabel="Продолжить"
        />
      </>
    );
  },
};

export const AllVariants: Story = {
  render: function AllVariantsStory() {
    const [positiveOpen, setPositiveOpen] = useState(false);
    const [negativeOpen, setNegativeOpen] = useState(false);
    return (
      <div className="flex flex-wrap gap-4">
        <Button variant="primary" onClick={() => setPositiveOpen(true)}>
          Positive
        </Button>
        <Button color="negative" onClick={() => setNegativeOpen(true)}>
          Negative
        </Button>
        <AlertDialog
          open={positiveOpen}
          onOpenChange={setPositiveOpen}
          icon={ClockCheck}
          title="Сохранить изменения?"
          text="Новые параметры будут применены после подтверждения."
          variant="positive"
          align="left"
          cancelLabel="Отмена"
          actionLabel="Продолжить"
        />
        <AlertDialog
          open={negativeOpen}
          onOpenChange={setNegativeOpen}
          icon={Trash2}
          title="Удалить файл?"
          text="Файл будет удалён без возможности восстановления."
          variant="negative"
          align="left"
          cancelLabel="Отмена"
          actionLabel="Удалить"
        />
      </div>
    );
  },
};
