'use client';

import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import { Loader2, X } from 'lucide-react';
import {
  useCallback,
  useMemo,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type FC,
} from 'react';

import { Input } from '@/components/input';
import { cn } from '@/utils/cn';

import type {
  AutocompleteGroup,
  AutocompleteOption,
  AutocompleteProps,
} from '../autocomplete.types';

type AutocompleteItems
  = | AutocompleteOption[]
    | { value: string; items: AutocompleteOption[] }[];

const isGrouped = (
  options: AutocompleteProps['options'],
): options is AutocompleteGroup[] => {
  const first = options[0];
  return options.length > 0 && first !== undefined && 'options' in first;
};

const itemClassName = cn(
  `
    istok-autocomplete-item flex cursor-pointer items-center gap-1.5 p-2.5
    transition-colors
    hover:bg-primary-300
    data-highlighted:bg-primary-300
  `,
);

export const Autocomplete: FC<AutocompleteProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  onSelect,
  onSearch,
  placeholder,
  disabled = false,
  readOnly,
  name,
  id,
  className,
  size = 'md',
  variant = 'neutral',
  startIcon,
  startAdornment,
  endAdornment,
  emptyText = 'Ничего не найдено',
  loading = false,
  loadingText = 'Поиск…',
  showClear = true,
  clearLabel = 'Очистить',
  autoHighlight = true,
  openOnInputClick = true,
  mode = 'list',
  classes,
  pt,
}) => {
  const grouped = isGrouped(options);

  const items: AutocompleteItems = useMemo(() => {
    if (grouped) {
      return (options as AutocompleteGroup[]).map(group => ({
        value: group.label,
        items: group.options,
      }));
    }
    return options as AutocompleteOption[];
  }, [grouped, options]);

  const handleValueChange = useCallback(
    (next: string, details: { reason: string }) => {
      onChange?.(next);

      if (
        onSearch
        && details.reason !== 'item-press'
        && details.reason !== 'list-navigation'
      ) {
        const result = onSearch(next);

        if (result instanceof Promise) {
          void result.catch(reportError);
        }
      }
    },
    [onChange, onSearch],
  );

  const itemToStringValue = useCallback(
    (item: AutocompleteOption) => item.label,
    [],
  );

  const clearButton = (
    <BaseAutocomplete.Clear
      aria-label={clearLabel}
      className="
        cursor-pointer rounded-sm p-0.5 text-neutral-500 transition-colors
        hover:bg-neutral-200 hover:text-neutral-700
      "
    >
      <X className="size-4" />
    </BaseAutocomplete.Clear>
  );

  const resolvedEndAdornment = endAdornment !== undefined
    ? (
      showClear
        ? (
          <div className="flex items-center gap-1">
            {endAdornment}
            {clearButton}
          </div>
        )
        : endAdornment
    )
    : showClear
      ? clearButton
      : undefined;

  const renderOption = (option: AutocompleteOption) => (
    <BaseAutocomplete.Item
      key={option.value}
      value={option}
      disabled={option.disabled}
      onClick={() => onSelect?.(option)}
      className={cn(
        itemClassName,
        option.disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <span className="flex-1 text-control-md text-neutral-900">
        {option.label}
      </span>
    </BaseAutocomplete.Item>
  );

  return (
    <BaseAutocomplete.Root
      items={items as AutocompleteOption[]}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      itemToStringValue={itemToStringValue}
      filter={onSearch ? null : undefined}
      autoHighlight={autoHighlight}
      openOnInputClick={openOnInputClick}
      mode={mode}
      disabled={disabled}
      readOnly={readOnly}
      name={name}
      id={id}
    >
      <div className={cn('istok-autocomplete relative', className)}>
        <BaseAutocomplete.Input
          render={(props) => {
            const {
              value: inputValue,
              onChange: inputOnChange,
              className: _inputClassName,
              disabled: inputDisabled,
              placeholder: inputPlaceholder,
              ...rest
            } = props as ComponentPropsWithRef<'input'>;

            return (
              <Input
                {...rest}
                value={typeof inputValue === 'string' ? inputValue : ''}
                onChange={(
                  _next: string,
                  event: ChangeEvent<HTMLInputElement>,
                ) => {
                  inputOnChange?.(event);
                }}
                placeholder={placeholder ?? inputPlaceholder}
                disabled={disabled || Boolean(inputDisabled)}
                size={size}
                variant={variant}
                startIcon={startIcon}
                startAdornment={startAdornment}
                endAdornment={resolvedEndAdornment}
                className={classes?.input}
                pt={{
                  input: {
                    autoComplete: 'off',
                    ...pt?.input,
                  },
                }}
              />
            );
          }}
        />
        <BaseAutocomplete.Portal>
          <BaseAutocomplete.Positioner
            side="bottom"
            align="start"
            sideOffset={4}
            className={cn('z-100', classes?.positioner)}
          >
            <BaseAutocomplete.Popup
              className={cn(
                `
                  istok-autocomplete-popup overflow-hidden rounded-xl border
                  border-neutral-200 bg-neutral-50 shadow-lg
                `,
                `
                  flex max-h-115 max-w-(--anchor-width) min-w-(--anchor-width)
                  flex-col
                `,
                classes?.popup,
              )}
              aria-busy={loading || undefined}
            >
              {loading && (
                <BaseAutocomplete.Status className="
                  flex items-center gap-2 px-2.5 py-2 text-control-sm
                  text-neutral-500
                "
                >
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  {loadingText}
                </BaseAutocomplete.Status>
              )}
              {!loading && (
                <BaseAutocomplete.Empty className="
                  px-2.5 py-3 text-control-sm text-neutral-500
                "
                >
                  {emptyText}
                </BaseAutocomplete.Empty>
              )}
              <BaseAutocomplete.List
                className={cn(
                  `istok-autocomplete-list flex-1 scrollbar overflow-y-auto`,
                  classes?.list,
                )}
              >
                {grouped
                  ? (group: { value: string; items: AutocompleteOption[] }) => (
                    <BaseAutocomplete.Group
                      key={group.value}
                      items={group.items}
                    >
                      <BaseAutocomplete.GroupLabel className="
                        px-2.5 py-2 text-title-sm font-medium text-neutral-900
                      "
                      >
                        {group.value}
                      </BaseAutocomplete.GroupLabel>
                      <BaseAutocomplete.Collection>
                        {(option: AutocompleteOption) => renderOption(option)}
                      </BaseAutocomplete.Collection>
                    </BaseAutocomplete.Group>
                  )
                  : (option: AutocompleteOption) => renderOption(option)}
              </BaseAutocomplete.List>
            </BaseAutocomplete.Popup>
          </BaseAutocomplete.Positioner>
        </BaseAutocomplete.Portal>
      </div>
    </BaseAutocomplete.Root>
  );
};
