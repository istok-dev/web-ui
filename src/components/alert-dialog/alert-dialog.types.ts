import type { LucideIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import type { ButtonProps } from '../button';

export const ALERT_DIALOG_VARIANTS = ['negative', 'warning', 'info'] as const;
export const ALERT_DIALOG_ALIGNS = ['left', 'center'] as const;

export type AlertDialogVariant = (typeof ALERT_DIALOG_VARIANTS)[number];
export type AlertDialogAlign = (typeof ALERT_DIALOG_ALIGNS)[number];

export type AlertDialogPassThrough = {
  cancelButton?: ButtonProps;
  actionButton?: ButtonProps;
};

export type AlertDialogProps = PropsWithChildren<{
  /** Открыт ли диалог (контролируемый режим) */
  open?: boolean;
  /** Колбэк при изменении состояния открытия */
  onOpenChange?: (open: boolean) => void;
  /** Иконка. Если не передана — берётся дефолт варианта */
  icon?: LucideIcon;
  /** Заголовок (обязательно) */
  title: string;
  /** Текст описания (обязательно) */
  text: string;
  /** Семантический вариант: риск, предупреждение или информация */
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
  /** Закрывать ли диалог по клику на подложку */
  dismissOnBackdrop?: boolean;
  /** Дополнительный класс для popup */
  className?: string;
  /** Дополнительные пропсы для передачи в компонент */
  pt?: AlertDialogPassThrough;
}>;
