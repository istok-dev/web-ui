import type { LucideIcon, LucideProps } from 'lucide-react';

export type SelectSize = 'sm' | 'md' | 'lg' | 'xl';

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectGroup = {
  label: string;
  options: SelectOption[];
};

export type SelectOptions = SelectOption[] | SelectGroup[];

export const SELECT_VARIANTS = ['neutral', 'solid', 'filled'] as const;

export type SelectVariant = (typeof SELECT_VARIANTS)[number];

export type Classes = 'positioner' | 'popup' | 'trigger';

export type SelectProps = {
  label?: string;
  placeholder?: string;
  options: SelectOptions;
  value?: SelectOption[];
  defaultValue?: SelectOption[];
  onChange?: (value: SelectOption[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void | Promise<void>;
  selectAllLabel?: string;
  clearLabel?: string;
  showSelectAll?: boolean;
  showClear?: boolean;
  disabled?: boolean;
  className?: string;
  size?: SelectSize;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  variant?: SelectVariant;
  classes?: Partial<Record<Classes, string>>;
};
