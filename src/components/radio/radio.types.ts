import type { ChangeEventHandler, PropsWithChildren, ReactNode, Ref } from 'react';

export const RADIO_SIZES = ['sm', 'md', 'lg'] as const;

export type RadioSize = (typeof RADIO_SIZES)[number];

export type RadioItemClasses = 'root' | 'label' | 'description';

export type RadioItemPassThrough = {
  input?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'onChange'
    | 'checked'
    | 'defaultChecked'
    | 'disabled'
    | 'type'
    | 'size'
    | 'name'
    | 'value'
    | 'readOnly'
    | 'id'
  >;
};

export type RadioItemProps = {
  label: string;
  description?: string;
  showInfoIcon?: boolean;
  onInfoClick?: () => void;
  className?: string;
  classes?: Partial<Record<RadioItemClasses, string>>;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  name?: string;
  value?: string | number | readonly string[];
  readOnly?: boolean;
  required?: boolean;
  id?: string;
  /** Ref на нативный `<input>` (например, для react-hook-form `register`) */
  ref?: Ref<HTMLInputElement>;
  pt?: RadioItemPassThrough;
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'>;

export type RadioProps = PropsWithChildren<{
  size?: RadioSize;
  className?: string;
}>;

export type RadioItemFC = {
  (props: RadioItemProps): ReactNode;
};

export type RadioFC = {
  (props: RadioProps): ReactNode;
  Item: RadioItemFC;
};
