import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button';
import { ALERT_DIALOG_VARIANTS, ALERT_DIALOG_ALIGNS } from './alert-dialog.types';
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
      options: ALERT_DIALOG_VARIANTS,
      description: 'Семантический вариант диалога',
    },
    align: {
      control: 'select',
      options: ALERT_DIALOG_ALIGNS,
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
    dismissOnBackdrop: {
      control: 'boolean',
      description: 'Закрывать по клику на подложку',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Negative: Story = {
  render: function NegativeStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="negative" onClick={() => setOpen(true)}>
          Удалить отчёт
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="Удалить отчёт?"
          text="Действие нельзя отменить."
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

export const Warning: Story = {
  render: function WarningStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="warning" onClick={() => setOpen(true)}>
          Сбросить фильтры
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="Сбросить фильтры?"
          text="Выбранные группы и партнёры не сохранятся."
          variant="warning"
          align="left"
          cancelLabel="Отмена"
          actionLabel="Сбросить"
          onCancel={() => alert('cancel')}
          onAction={() => alert('action')}
        />
      </>
    );
  },
};

export const Info: Story = {
  render: function InfoStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Выгрузить за август
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="Выгрузить за август?"
          text="Файл придёт на почту в течение 10 минут."
          variant="info"
          align="left"
          cancelLabel="Отмена"
          actionLabel="Выгрузить"
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
          title="Удалить отчёт?"
          text="Действие нельзя отменить."
          variant="negative"
          align="center"
          cancelLabel="Отмена"
          actionLabel="Удалить"
        />
      </>
    );
  },
};

export const DismissOnBackdrop: Story = {
  render: function DismissOnBackdropStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Клик по подложке закрывает
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="Выгрузить за август?"
          text="Файл придёт на почту в течение 10 минут."
          variant="info"
          dismissOnBackdrop
          cancelLabel="Отмена"
          actionLabel="Выгрузить"
        />
      </>
    );
  },
};
