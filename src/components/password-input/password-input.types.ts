import type { InputProps } from '../input/input.types';

export type PasswordInputProps = Omit<InputProps, 'type'> & {
  /** Управляемая видимость пароля */
  visible?: boolean;
  /** Колбэк при переключении видимости */
  onVisibleChange?: (visible: boolean) => void;
  /** Начальная видимость (uncontrolled) */
  defaultVisible?: boolean;
  /** aria-label кнопки, когда пароль скрыт */
  showPasswordLabel?: string;
  /** aria-label кнопки, когда пароль показан */
  hidePasswordLabel?: string;
};
