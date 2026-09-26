import type { LucideIcon, LucideProps } from 'lucide-react';

export const SELECT_SIZES = ['sm', 'md', 'lg', 'xl'] as const;

export type SelectSize = (typeof SELECT_SIZES)[number];

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
  /** aria-label кнопки очистки поиска */
  clearSearchLabel?: string;
  /** Текст кнопки раскрытия списка выбранных тегов */
  showAllTagsLabel?: string;
  /** Текст кнопки сворачивания списка выбранных тегов */
  hideTagsLabel?: string;
  /** Подпись перед счётчиком выбранных значений */
  selectedCountLabel?: string;
  showSelectAll?: boolean;
  /** Show clear (X) button on the trigger when a value is selected */
  showClear?: boolean;
  disabled?: boolean;
  className?: string;
  size?: SelectSize;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  variant?: SelectVariant;
  classes?: Partial<Record<Classes, string>>;
};
