import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC, ReactNode } from 'react';

import { Button } from '../button';
import { ToastContainer, ToastProvider, useToast } from './index';
import type { ToastVariant } from './toast.types';
import { ToastPreview } from './ui/toast';

const TOAST_VARIANTS: ToastVariant[] = ['success', 'error', 'info', 'warning'];

const variantLabels: Record<ToastVariant, string> = {
  success: 'Успех',
  error: 'Ошибка',
  info: 'Информация',
  warning: 'Предупреждение',
};

const variantMessages: Record<ToastVariant, string> = {
  success: 'Изменения успешно сохранены',
  error: 'Не удалось выполнить операцию',
  info: 'Новая версия приложения доступна',
  warning: 'Срок действия подписки истекает через 3 дня',
};

const ToastStoryWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <ToastProvider>
    {children}
    <ToastContainer />
  </ToastProvider>
);

const meta: Meta<typeof ToastPreview> = {
  title: 'Components/Toast',
  component: ToastPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ToastStoryWrapper>
        <Story />
      </ToastStoryWrapper>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ToastPreview>;

const ToastDemo: FC = () => {
  const { showToast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      {TOAST_VARIANTS.map(variant => (
        <Button
          key={variant}
          variant={variant === 'error' ? 'primary' : 'secondary'}
          color={variant === 'error' ? 'negative' : undefined}
          onClick={() => showToast(variantMessages[variant], variant)}
        >
          {variantLabels[variant]}
        </Button>
      ))}
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {TOAST_VARIANTS.map(variant => (
        <ToastPreview
          key={variant}
          variant={variant}
          message={variantMessages[variant]}
        />
      ))}
    </div>
  ),
  decorators: [
    Story => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export const MultipleToasts: Story = {
  render: function MultipleToastsStory() {
    const { showToast } = useToast();

    return (
      <Button
        onClick={() => {
          TOAST_VARIANTS.forEach((variant, index) => {
            setTimeout(() => {
              showToast(variantMessages[variant], variant);
            }, index * 200);
          });
        }}
      >
        Показать несколько toast
      </Button>
    );
  },
};

export const Persistent: Story = {
  render: function PersistentStory() {
    const { showToast } = useToast();

    return (
      <Button
        onClick={() => showToast('Этот toast не закроется автоматически', 'info', 0)}
      >
        Показать постоянный toast
      </Button>
    );
  },
};

export const LongMessage: Story = {
  render: () => (
    <ToastPreview
      variant="info"
      message={'Очень длинное сообщение toast, которое может занимать несколько строк и содержать подробную '
        + 'информацию для пользователя'}
    />
  ),
  decorators: [
    Story => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};
