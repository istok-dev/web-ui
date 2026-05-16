import type { PropsWithChildren, ReactNode } from 'react';

export type CheckboxSize = 's' | 'm' | 'l';

export type CheckboxItemClasses = 'root' | 'label' | 'description';

export type CheckboxItemProps = {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  className?: string;
  classes?: Partial<Record<CheckboxItemClasses, string>>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type CheckboxProps = PropsWithChildren<{
  defaultSize?: CheckboxSize;
  className?: string;
}>;

export type CheckboxItemFC = {
  (props: CheckboxItemProps): ReactNode;
};

export type CheckboxFC = {
  (props: CheckboxProps): ReactNode;
  Item: CheckboxItemFC;
};
