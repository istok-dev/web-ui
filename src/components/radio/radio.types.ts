import { PropsWithChildren, ReactNode } from 'react';

export type RadioSize = 's' | 'm' | 'l';

export type RadioItemClasses = 'root' | 'label' | 'description';

export type RadioItemProps = {
  label: string;
  description?: string;
  showInfoIcon?: boolean;
  onInfoClick?: () => void;
  className?: string;
  classes?: Partial<Record<RadioItemClasses, string>>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type RadioProps = PropsWithChildren<{
  defaultSize?: RadioSize;
  className?: string;
}>;

export type RadioItemFC = {
  (props: RadioItemProps): ReactNode;
};

export type RadioFC = {
  (props: RadioProps): ReactNode;
  Item: RadioItemFC;
};
