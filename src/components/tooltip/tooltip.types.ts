import type { TooltipTriggerProps } from '@base-ui/react';
import type { ReactNode } from 'react';

export type TooltipPlacement
  = | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'right';

export type TooltipProps = {
  /**
   * Контент, который будет обернут в tooltip
   */
  children: ReactNode;
  /**
   * Заголовок tooltip
   */
  title?: ReactNode;
  /**
   * Описание tooltip
   */
  description?: ReactNode;
  /**
   * Позиция tooltip относительно триггера
   */
  placement?: TooltipPlacement;
  /**
   * Отступ от триггера в пикселях
   */
  offset?: number;
  /**
   * Показывать ли стрелку
   */
  showArrow?: boolean;
  /**
   * Управление открытием/закрытием (контролируемый режим)
   */
  open?: boolean;
  /**
   * Обработчик изменения состояния открытия
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Дополнительный класс для tooltip popup
   */
  popupClassName?: string;
  /**
   * Отключить tooltip
   */
  disabled?: boolean;
  triggerProps?: TooltipTriggerProps;
};
