import type { PropsWithChildren, Ref } from 'react';

export const SWITCH_SIZES = ['sm', 'md', 'lg'] as const;

export type SwitchSize = (typeof SWITCH_SIZES)[number];

export type SwitchPassThrough = {
  input?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'checked' | 'defaultChecked' | 'disabled' | 'type' | 'size'
  >;
};

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
  className?: string;
  disabled?: boolean;
  /** Ref на нативный `<input>` (например, для react-hook-form `register`) */
  ref?: Ref<HTMLInputElement>;
  pt?: SwitchPassThrough;
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'>;

export type SwitchFieldClasses
  = | 'root'
    | 'content'
    | 'label'
    | 'description'
    | 'control';

export type SwitchFieldProps = {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
  disabled?: boolean;
  className?: string;
  classes?: Partial<Record<SwitchFieldClasses, string>>;
  /** Ref на нативный `<input>` (например, для react-hook-form `register`) */
  ref?: Ref<HTMLInputElement>;
  pt?: SwitchPassThrough;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultChecked'>;

export type SwitchFieldListProps = PropsWithChildren<{
  className?: string;
}> & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
