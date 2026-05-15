import { LucideIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';

export type AlertDialogVariant = 'positive' | 'negative';
export type AlertDialogAlign = 'left' | 'center';

export type AlertDialogProps = PropsWithChildren<{
  /** Открыт ли диалог (контролируемый режим) */
  open?: boolean;
  /** Колбэк при изменении состояния открытия */
  onOpenChange?: (open: boolean) => void;
  /** Иконка (обязательно) */
  icon: LucideIcon;
  /** Заголовок (обязательно) */
  title: string;
  /** Текст описания (обязательно) */
  text: string;
  /** Визуальный вариант: положительный (подтверждение) или отрицательный (удаление/предупреждение) */
  variant?: AlertDialogVariant;
  /** Выравнивание контента */
  align?: AlertDialogAlign;
  /** Текст кнопки отмены */
  cancelLabel?: string;
  /** Колбэк при нажатии отмены */
  onCancel?: () => void;
  /** Текст кнопки действия */
  actionLabel: string;
  /** Колбэк при нажатии действия */
  onAction?: () => void;
  /** Дополнительный класс для popup */
  className?: string;
}>;
