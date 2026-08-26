import type { PropsWithChildren } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';

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
  pt?: SwitchPassThrough;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultChecked'>;

export type SwitchFieldListProps = PropsWithChildren<{
  className?: string;
}> & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
