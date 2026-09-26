import type { LucideIcon } from 'lucide-react';

import type { InputPassThrough, InputSize, InputVariant } from '../input/input.types';

export type AutocompleteSize = InputSize;
export type AutocompleteVariant = InputVariant;

export const AUTOCOMPLETE_MODES = ['list', 'both', 'inline', 'none'] as const;

export type AutocompleteMode = (typeof AUTOCOMPLETE_MODES)[number];

export type AutocompleteOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type AutocompleteGroup = {
  label: string;
  options: AutocompleteOption[];
};

export type AutocompleteOptions = AutocompleteOption[] | AutocompleteGroup[];

export type AutocompleteClasses = 'positioner' | 'popup' | 'list' | 'input';

export type AutocompleteProps = {
  options: AutocompleteOptions;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  onSearch?: (query: string) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  id?: string;
  className?: string;
  size?: AutocompleteSize;
  variant?: AutocompleteVariant;
  startIcon?: LucideIcon;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  emptyText?: string;
  loading?: boolean;
  loadingText?: string;
  showClear?: boolean;
  /** aria-label кнопки очистки */
  clearLabel?: string;
  autoHighlight?: boolean | 'always';
  openOnInputClick?: boolean;
  mode?: AutocompleteMode;
  classes?: Partial<Record<AutocompleteClasses, string>>;
  pt?: InputPassThrough;
};
