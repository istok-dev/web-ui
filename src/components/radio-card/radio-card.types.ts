import type { PropsWithChildren, ReactNode } from 'react';

export const RADIO_CARD_SIZES = ['m', 'l'] as const;

export type RadioCardSize = (typeof RADIO_CARD_SIZES)[number];

export type RadioCardProps = {
  name?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  label: string;
  description?: string;
  size?: RadioCardSize;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
};

export type RadioCardGroupProps = PropsWithChildren<{
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  gap?: number | string;
  disabled?: boolean;
  className?: string;
}>;
