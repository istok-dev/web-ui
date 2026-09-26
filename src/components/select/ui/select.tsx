'use client';

import { Combobox } from '@base-ui/react/combobox';
import { useMemo, useState } from 'react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { SelectProps, SelectSize, SelectVariant } from '../select.types';
import { SelectActions } from './select-actions';
import { SelectOptions } from './select-options';
import { SelectSearch } from './select-search';
import { SelectSelectedTags } from './select-selected-tags';
import { SelectTrigger } from './select-trigger';
import { filterOptions, flattenOptions, getSelectionState, isGrouped } from './select.utils';
import { useSelectValue } from './use-select-value';

const sizeClassesMap: Record<SelectSize, string> = {
  sm: 'istok-select--sm',
  md: 'istok-select--md',
  lg: 'istok-select--lg',
  xl: 'istok-select--xl',
};

const variantClassesMap: Record<SelectVariant, string> = {
  neutral: 'istok-select--neutral',
  solid: 'istok-select--solid',
  filled: 'istok-select--filled',
};

export const Select: FC<SelectProps> = ({
  label,
  placeholder = 'Выберите...',
  options,
  value,
  defaultValue,
  onChange,
  multiple = false,
  searchable = true,
  searchPlaceholder = 'Поиск',
  onSearch,
  selectAllLabel = 'Выбрать все',
  clearLabel = 'Сбросить',
  clearSearchLabel = 'Очистить поиск',
  showAllTagsLabel = 'Показать все',
  hideTagsLabel = 'Скрыть',
  selectedCountLabel = 'Выбрано:',
  showSelectAll = true,
  showClear = true,
  disabled = false,
  className,
  size = 'md',
  startIcon,
  startIconProps,
  variant = 'neutral',
  classes,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const selection = useSelectValue({ options, value, defaultValue, onChange });

  // При серверном поиске (onSearch) список уже отфильтрован снаружи.
  const visibleOptions = useMemo(
    () => (onSearch ? options : filterOptions(options, searchQuery)),
    [onSearch, options, searchQuery],
  );

  const visibleValues = useMemo(
    () => flattenOptions(visibleOptions).map(option => option.value),
    [visibleOptions],
  );

  const comboboxItems = useMemo(
    () => isGrouped(visibleOptions)
      ? visibleOptions.map(group => ({
        value: group.label,
        items: group.options.map(option => option.value),
      }))
      : visibleOptions.map(option => option.value),
    [visibleOptions],
  );

  const handleComboboxValueChange = (next: string | string[] | null) => {
    const values = Array.isArray(next) ? next : next ? [next] : [];
    selection.setValues(values);
    if (!multiple && values.length > 0) {
      setOpen(false);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    const result = onSearch?.(query);
    if (result instanceof Promise) {
      // Не глушим ошибку: она попадёт в консоль и в window.onerror (Sentry и т.п.).
      void result.catch(reportError);
    }
  };

  const toggleGroupCollapse = (groupLabel: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (!next.delete(groupLabel)) next.add(groupLabel);
      return next;
    });
  };

  const clear = () => selection.setValues([]);
  const canClear = showClear && selection.hasValue;

  return (
    <Combobox.Root
      value={multiple ? selection.selectedValues : selection.selectedValues[0] ?? null}
      onValueChange={next => handleComboboxValueChange(next as string | string[] | null)}
      items={comboboxItems}
      itemToStringLabel={selection.getLabel}
      multiple={multiple}
      open={open}
      onOpenChange={setOpen}
      inputValue={searchQuery}
      onInputValueChange={handleSearchChange}
      disabled={disabled}
      filter={searchable ? undefined : () => true}
    >
      <div
        className={cn(
          'istok-select relative',
          sizeClassesMap[size],
          variantClassesMap[variant],
          className,
        )}
      >
        <SelectTrigger
          selected={selection.selected}
          multiple={multiple}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
          showClear={showClear}
          clearLabel={clearLabel}
          onClear={clear}
          startIcon={startIcon}
          startIconProps={startIconProps}
          className={classes?.trigger}
        />
        <Combobox.Portal>
          <Combobox.Positioner
            side="bottom"
            align="start"
            sideOffset={4}
            className={cn('z-100', classes?.positioner)}
          >
            <Combobox.Popup
              className={cn(
                `
                  istok-select-popup overflow-hidden rounded-xl border
                  border-neutral-200 bg-neutral-50 shadow-lg
                `,
                `
                  flex max-h-115 max-w-(--anchor-width) min-w-(--anchor-width)
                  flex-col
                `,
                classes?.popup,
              )}
            >
              {label && (
                <div className="istok-select__popup-header p-2.5">
                  <h3 className="text-title-sm font-bold text-neutral-900">
                    {label}
                  </h3>
                </div>
              )}
              {searchable && (
                <SelectSearch
                  query={searchQuery}
                  onQueryChange={handleSearchChange}
                  placeholder={searchPlaceholder}
                  clearLabel={clearSearchLabel}
                />
              )}
              {multiple && selection.hasValue && (
                <SelectSelectedTags
                  selected={selection.selected}
                  onRemove={selection.remove}
                  showAllLabel={showAllTagsLabel}
                  hideLabel={hideTagsLabel}
                  countLabel={selectedCountLabel}
                />
              )}
              {multiple && (showSelectAll || canClear) && (
                <SelectActions
                  selectAllState={
                    showSelectAll
                      ? getSelectionState(visibleValues, selection.selectedSet)
                      : undefined
                  }
                  onSelectAll={() => selection.toggleValues(visibleValues)}
                  selectAllLabel={selectAllLabel}
                  canClear={canClear}
                  onClear={clear}
                  clearLabel={clearLabel}
                />
              )}
              <SelectOptions
                options={visibleOptions}
                multiple={multiple}
                selectedSet={selection.selectedSet}
                collapsedGroups={collapsedGroups}
                onToggleCollapse={toggleGroupCollapse}
                onToggleGroup={selection.toggleValues}
              />
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </div>
    </Combobox.Root>
  );
};
