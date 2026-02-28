import { LucideIcon, LucideProps } from "lucide-react";

export type SelectSize = "s" | "m" | "l";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export type SelectOptions = SelectOption[] | SelectGroup[];

export type SelectVariant = "solid" | "outline";

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOptions;
  value?: SelectOption[];
  defaultValue?: SelectOption[];
  onChange?: (value: SelectOption[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => SelectOption[] | Promise<SelectOption[]>;
  selectAllLabel?: string;
  clearLabel?: string;
  showSelectAll?: boolean;
  showClear?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  popupClassName?: string;
  size?: SelectSize;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  variant?: SelectVariant;
}
