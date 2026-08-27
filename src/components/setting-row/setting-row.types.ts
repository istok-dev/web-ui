import type { ReactNode } from 'react';

export const SETTING_ROW_VARIANTS = ['filled', 'plain'] as const;

export type SettingRowVariant = (typeof SETTING_ROW_VARIANTS)[number];

export type SettingRowProps = {
  label: string;
  description?: string;
  control?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
  variant?: SettingRowVariant;
  disabled?: boolean;
  className?: string;
};
