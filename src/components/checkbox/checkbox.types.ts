import type { ChangeEventHandler, PropsWithChildren, ReactNode, Ref } from 'react';

export const CHECKBOX_SIZES = ['sm', 'md', 'lg'] as const;

export type CheckboxSize = (typeof CHECKBOX_SIZES)[number];

export type CheckboxItemClasses = 'root' | 'label' | 'description';

export type CheckboxItemPassThrough = {
  input?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'onChange'
    | 'checked'
    | 'defaultChecked'
    | 'disabled'
    | 'id'
    | 'type'
    | 'size'
    | 'name'
    | 'value'
    | 'readOnly'
  >;
};

export type CheckboxItemProps = {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  className?: string;
  classes?: Partial<Record<CheckboxItemClasses, string>>;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  name?: string;
  value?: string | number | readonly string[];
  readOnly?: boolean;
  required?: boolean;
  id?: string;
  /** Ref на нативный `<input type="checkbox">` (например, для react-hook-form `register`) */
  ref?: Ref<HTMLInputElement>;
  pt?: CheckboxItemPassThrough;
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'>;

export type CheckboxIndicatorProps = {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  /** Размер; если не задан, наследуется от ближайшего `Checkbox` */
  size?: CheckboxSize;
  className?: string;
};

export type CheckboxProps = PropsWithChildren<{
  size?: CheckboxSize;
  className?: string;
}>;

export type CheckboxItemFC = {
  (props: CheckboxItemProps): ReactNode;
};

export type CheckboxFC = {
  (props: CheckboxProps): ReactNode;
  Item: CheckboxItemFC;
};
