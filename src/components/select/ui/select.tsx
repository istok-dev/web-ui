'use client';

import { Combobox } from '@base-ui/react/combobox';
import { ChevronDown, Search, X } from 'lucide-react';
import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import { Checkbox } from '../../checkbox';
import { Input } from '../../input';
import { Tag } from '../../tag';
import type { SelectProps, SelectOption, SelectGroup, SelectSize, SelectVariant } from '../select.types';

const sizeClassesMap: Record<SelectSize, string> = {
  sm: 'istok-select--sm',
  md: 'istok-select--md',
  lg: 'istok-select--lg',
};

const variantClassesMap: Record<SelectVariant, string> = {
  solid: 'istok-select--solid',
  outline: 'istok-select--outline',
};

const tagSizeClassesMap: Record<SelectSize, string> = {
  sm: 'istok-tag--sm',
  md: 'istok-tag--md',
  lg: 'istok-tag--lg',
};

const flattenOptions = (
  options: SelectOption[] | SelectGroup[],
): SelectOption[] => {
  return options.reduce<SelectOption[]>((acc, item) => {
    if ('options' in item) {
      return [...acc, ...item.options];
    }
    return [...acc, item];
  }, []);
};

const isGrouped = (
  options: SelectOption[] | SelectGroup[],
): options is SelectGroup[] => {
  const first = options[0];
  return options.length > 0 && first !== undefined && 'options' in first;
};

type ComboboxItems = string[] | { value: string; items: string[] }[];

const TAGS_OVERFLOW_HEIGHT = 51;
const TAGS_OVERFLOW_HEIGHT_CLASS = 'max-h-[51px]';

export const Select: FC<SelectProps> = ({
  label,
  placeholder = 'Выберите...',
  options,
  value,
  defaultValue,
  onChange,
  multiple = true,
  searchable = true,
  searchPlaceholder = 'Поиск',
  onSearch,
  selectAllLabel = 'Выбрать все',
  clearLabel = 'Сбросить',
  showSelectAll = true,
  showClear = true,
  disabled = false,
  className,
  size = 'md',
  startIcon: StartIcon,
  startIconProps,
  variant = 'solid',
  classes,
}) => {
  const allOptions = useMemo(() => flattenOptions(options), [options]);
  const grouped = isGrouped(options);

  const valueToStrings = (opts: SelectOption[]) => opts.map(o => o.value);

  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<SelectOption[]>(
    defaultValue ?? [],
  );
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    () => new Set(),
  );
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [tagsHasOverflow, setTagsHasOverflow] = useState(false);
  const tagsContainerRef = useRef<HTMLDivElement | null>(null);
  const [tagsLayoutVersion, setTagsLayoutVersion] = useState(0);

  const setTagsContainerNode = useCallback((node: HTMLDivElement | null) => {
    tagsContainerRef.current = node;
    setTagsLayoutVersion(v => v + 1);
  }, []);

  const optionsForResolve = useMemo(() => {
    const byValue = new Map<string, SelectOption>();

    value?.forEach(o => byValue.set(o.value, o));
    allOptions.forEach(o => byValue.set(o.value, o));

    return byValue;
  }, [allOptions, value]);

  const stringsToOptions = useCallback(
    (vals: string[]) =>
      vals
        .map(v => optionsForResolve.get(v))
        .filter((o): o is SelectOption => Boolean(o)),
    [optionsForResolve],
  );

  const controlledValue = value !== undefined ? value : selectedValues;
  const controlledValueStrings = valueToStrings(controlledValue);
  const isControlled = value !== undefined;

  const filteredOptions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (onSearch || !query) {
      return options;
    }

    if (grouped) {
      return (options as SelectGroup[]).map(group => ({
        ...group,
        options: group.options.filter(
          opt =>
            opt.label.toLowerCase().includes(query)
            || opt.value.toLowerCase().includes(query),
        ),
      }));
    }
    return (options as SelectOption[]).filter(
      opt =>
        opt.label.toLowerCase().includes(query)
        || opt.value.toLowerCase().includes(query),
    );
  }, [onSearch, options, searchQuery, grouped]);

  useEffect(() => {
    const el = tagsContainerRef.current;
    if (!el) {
      queueMicrotask(() => {
        setTagsExpanded(false);
        setTagsHasOverflow(false);
      });
      return;
    }

    const checkOverflow = () => {
      queueMicrotask(() => {
        const node = tagsContainerRef.current;
        if (node) {
          setTagsHasOverflow(node.scrollHeight > TAGS_OVERFLOW_HEIGHT);
        }
      });
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [value, tagsLayoutVersion]);

  const allSelected = useMemo(() => {
    const availableOptions = flattenOptions(filteredOptions);
    return (
      availableOptions.length > 0
      && availableOptions.every(opt =>
        controlledValueStrings.includes(opt.value),
      )
    );
  }, [filteredOptions, controlledValueStrings]);

  const someSelected = useMemo(() => {
    const availableOptions = flattenOptions(filteredOptions);
    return (
      availableOptions.some(opt =>
        controlledValueStrings.includes(opt.value),
      ) && !allSelected
    );
  }, [filteredOptions, controlledValueStrings, allSelected]);

  const handleValueChange = useCallback(
    (newValue: string | string[] | null) => {
      const values = Array.isArray(newValue)
        ? newValue
        : newValue
          ? [newValue]
          : [];
      const optionsRes = stringsToOptions(values);
      if (!isControlled) {
        setSelectedValues(optionsRes);
      }
      onChange?.(optionsRes);
      if (!multiple && values.length > 0) {
        setOpen(false);
      }
    },
    [isControlled, onChange, multiple, stringsToOptions],
  );

  const handleSelectAll = useCallback(() => {
    const availableOptions = flattenOptions(filteredOptions);
    const availableValues = availableOptions.map(opt => opt.value);
    const newValues = allSelected
      ? controlledValueStrings.filter(v => !availableValues.includes(v))
      : [...new Set([...controlledValueStrings, ...availableValues])];
    handleValueChange(newValues);
  }, [allSelected, filteredOptions, controlledValueStrings, handleValueChange]);

  const handleClear = useCallback(() => {
    onChange?.([]);
  }, [onChange]);

  const handleRemoveTag = useCallback(
    (valueToRemove: string) => {
      const newValues = controlledValueStrings.filter(
        v => v !== valueToRemove,
      );
      handleValueChange(newValues);
    },
    [controlledValueStrings, handleValueChange],
  );

  const handleToggleTagsExpanded = useCallback(() => {
    setTagsExpanded(!tagsExpanded);
    const el = tagsContainerRef.current;
    if (el) {
      el.scrollTop = 0;
    }
  }, [tagsExpanded]);

  const handleGroupToggle = useCallback(
    (group: SelectGroup) => {
      const groupValues = group.options.map(opt => opt.value);
      const allGroupSelected = groupValues.every(v =>
        controlledValueStrings.includes(v),
      );
      const newValues = allGroupSelected
        ? controlledValueStrings.filter(v => !groupValues.includes(v))
        : [...new Set([...controlledValueStrings, ...groupValues])];
      handleValueChange(newValues);
    },
    [controlledValueStrings, handleValueChange],
  );

  const isGroupSelected = useCallback(
    (group: SelectGroup) => {
      const groupValues = group.options.map(opt => opt.value);
      return groupValues.every(v => controlledValueStrings.includes(v));
    },
    [controlledValueStrings],
  );

  const isGroupPartiallySelected = useCallback(
    (group: SelectGroup) => {
      const groupValues = group.options.map(opt => opt.value);
      return (
        groupValues.some(v => controlledValueStrings.includes(v))
        && !isGroupSelected(group)
      );
    },
    [controlledValueStrings, isGroupSelected],
  );

  const toggleGroupCollapse = useCallback((groupLabel: string) => {
    setCollapsedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupLabel)) {
        newSet.delete(groupLabel);
      }
      else {
        newSet.add(groupLabel);
      }
      return newSet;
    });
  }, []);

  const handleInputValueChange = useCallback(
    (inputValue: string) => {
      setSearchQuery(inputValue);

      if (onSearch) {
        const result = onSearch(inputValue);

        if (result instanceof Promise) {
          void result.catch(() => {});
        }
      }
    },
    [onSearch],
  );

  const isGroupCollapsed = useCallback(
    (groupLabel: string) => {
      return collapsedGroups.has(groupLabel);
    },
    [collapsedGroups],
  );

  const comboboxItems: ComboboxItems = useMemo(() => {
    if (grouped) {
      return (filteredOptions as SelectGroup[]).map(group => ({
        value: group.label,
        items: group.options.map(o => o.value),
      }));
    }
    return (filteredOptions as SelectOption[]).map(o => o.value);
  }, [filteredOptions, grouped]);

  const itemToStringLabel = useCallback(
    (itemValue: string) => {
      return optionsForResolve.get(itemValue)?.label ?? itemValue;
    },
    [optionsForResolve],
  );

  const comboboxValue = multiple
    ? controlledValueStrings
    : controlledValueStrings[0] ?? null;

  return (
    <Combobox.Root
      value={comboboxValue}
      onValueChange={(_value, _eventDetails) => {
        handleValueChange(_value as string | string[] | null);
      }}
      items={comboboxItems}
      itemToStringLabel={itemToStringLabel}
      multiple={multiple}
      open={open}
      onOpenChange={setOpen}
      inputValue={searchQuery}
      onInputValueChange={handleInputValueChange}
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
        <Combobox.Trigger
          className={cn(
            `
              istok-select__trigger flex w-full cursor-pointer items-center
              gap-2 overflow-hidden text-left transition-all
            `,
            `
              h-(--istok-select-trigger-height)
              rounded-(--istok-select-trigger-radius)
              px-(--istok-select-trigger-padding-x)
              py-(--istok-select-trigger-padding-y)
            `,
            `
              border border-(--istok-select-trigger-border)
              bg-(--istok-select-trigger-bg) text-(--istok-select-trigger-fg)
            `,
            `
              focus:border-(--istok-select-trigger-border-focus)
              focus:outline-none
            `,
            'data-[popup-open=true]:[&>.istok-select__chevron]:rotate-180',
            !disabled && 'hover:bg-(--istok-select-trigger-bg-hover)',
            disabled && 'cursor-not-allowed opacity-50',
            classes?.trigger,
          )}
          render={<div role="button" tabIndex={0} />}
          nativeButton={false}
        >
          {StartIcon && (
            <StartIcon
              {...startIconProps}
              className={cn(
                `
                  istok-select__start-icon shrink-0
                  text-(--istok-select-trigger-start-icon)
                `,
                'size-(--istok-select-start-icon-size)',
                startIconProps?.className,
              )}
            />
          )}
          <Combobox.Value placeholder={placeholder}>
            {(triggerValue: string | string[] | null) => {
              const selected = Array.isArray(triggerValue)
                ? triggerValue
                : triggerValue != null
                  ? [triggerValue]
                  : [];
              return (
                <div className="
                  istok-select__value relative min-h-6 flex-1 overflow-hidden
                "
                >
                  {multiple
                    ? (
                      selected.length === 0
                        ? (
                          <span
                            className="
                              istok-select__placeholder
                              text-(length:--istok-select-placeholder-font)
                            "
                            style={{
                              color: 'var(--istok-select-trigger-placeholder)',
                            }}
                          >
                            {placeholder}
                          </span>
                        )
                        : (
                          <div className="flex items-center gap-1">
                            {selected.slice(0, 10).map((val) => {
                              const option = value?.find(
                                opt => opt.value === val,
                              );
                              return option
                                ? (
                                  <Tag
                                    key={val}
                                    variant="ghost"
                                    color="primary"
                                    onRemove={(e) => {
                                      e.stopPropagation();
                                      handleRemoveTag(val);
                                    }}
                                    className={cn(
                                      `
                                        istok-select__value-tag
                                        whitespace-nowrap
                                      `,
                                      tagSizeClassesMap[size],
                                    )}
                                  >
                                    {option.label}
                                  </Tag>
                                )
                                : null;
                            })}
                          </div>
                        )
                    )
                    : (
                      <span className="
                        truncate text-(length:--istok-select-value-font)
                      "
                      >
                        {value?.[0]?.label
                          ?? placeholder}
                      </span>
                    )}
                </div>
              );
            }}
          </Combobox.Value>
          <ChevronDown
            className={cn(
              `
                istok-select__chevron size-(--istok-select-chevron-size)
                shrink-0 text-(--istok-select-trigger-fg) transition-transform
              `,
            )}
          />
        </Combobox.Trigger>
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
                <div
                  className="istok-select__search-container p-2.5"
                  onKeyDown={e => e.stopPropagation()}
                  onKeyUp={e => e.stopPropagation()}
                  onBlur={e => e.stopPropagation()}
                  onMouseEnter={e => e.stopPropagation()}
                  onMouseLeave={e => e.stopPropagation()}
                >
                  <Combobox.Input
                    render={(props) => {
                      const { onChange: _onComboboxChange, ...rest } = props;
                      return (
                        <Input
                          {...rest}
                          value={searchQuery}
                          onChange={handleInputValueChange}
                          placeholder={searchPlaceholder}
                          startIcon={Search}
                          variant="neutral"
                          size="sm"
                          className="w-full"
                          pt={{
                            input: {
                              autoComplete: 'off',
                              className: searchQuery ? 'pr-10' : undefined,
                            },
                          }}
                          endAdornment={
                            searchQuery
                              ? (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleInputValueChange('');
                                  }}
                                  className="
                                    cursor-pointer rounded-sm p-0.5
                                    text-neutral-500 transition-colors
                                    hover:bg-neutral-200 hover:text-neutral-700
                                  "
                                  aria-label="Очистить поиск"
                                >
                                  <X className="size-4" />
                                </button>
                              )
                              : undefined
                          }
                        />
                      );
                    }}
                  />
                </div>
              )}
              {multiple && value && value.length > 0 && (
                <div className="istok-select__selected-tags px-2.5 py-1.5">
                  <div className="mb-2 flex items-center justify-between">
                    {tagsHasOverflow && (
                      <button
                        type="button"
                        onClick={handleToggleTagsExpanded}
                        className="
                          cursor-pointer text-control-xs text-primary-600
                          transition-colors
                          hover:text-neutral-900
                        "
                      >
                        {tagsExpanded ? 'Скрыть' : 'Показать все'}
                      </button>
                    )}
                    <span className="text-control-xs text-neutral-500">
                      Выбрано:
                      {' '}
                      {value.length}
                    </span>
                  </div>
                  <div
                    ref={setTagsContainerNode}
                    className={cn(
                      `
                        istok-select__selected-tags__wrapper relative
                        overflow-hidden transition-all duration-300
                      `,
                      {
                        [TAGS_OVERFLOW_HEIGHT_CLASS]:
                          tagsHasOverflow && !tagsExpanded,
                        'istok-select-tags-overflow': tagsHasOverflow,
                        'max-h-31 scrollbar overflow-y-auto':
                          tagsHasOverflow && tagsExpanded,
                      },
                    )}
                  >
                    <div className="
                      istok-select__selected-tags__container flex w-full
                      flex-wrap items-start gap-1
                    "
                    >
                      {value.map(opt => (
                        <Tag
                          key={opt.value}
                          variant="ghost"
                          color="primary"
                          size="sm"
                          onRemove={() => handleRemoveTag(opt.value)}
                        >
                          {opt.label}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {(showSelectAll || showClear) && multiple && (
                <div className="
                  istok-select__actions flex items-center justify-between p-2.5
                "
                >
                  {showSelectAll && (
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="
                        flex cursor-pointer items-center gap-1.5 text-control-md
                        text-neutral-900 transition-colors
                        hover:text-neutral-900
                      "
                    >
                      <Checkbox size="sm">
                        <Checkbox.Item
                          checked={allSelected}
                          indeterminate={someSelected}
                        />
                      </Checkbox>
                      {selectAllLabel}
                    </button>
                  )}
                  {showClear && value && value.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="
                        cursor-pointer text-control-md text-primary-700
                        transition-colors
                        hover:text-neutral-900
                      "
                    >
                      {clearLabel}
                    </button>
                  )}
                </div>
              )}
              <Combobox.List className="
                istok-select-list flex-1 scrollbar overflow-y-auto
              "
              >
                {grouped
                  ? (filteredOptions as SelectGroup[]).map(group => (
                    <div key={group.label} className="istok-select-group">
                      <div className="
                        flex w-full items-center gap-1.5
                        hover:bg-primary-300
                      "
                      >
                        <button
                          type="button"
                          onClick={() => multiple && handleGroupToggle(group)}
                          className="
                            flex flex-1 cursor-pointer items-center gap-1.5
                            p-2.5 text-left transition-colors
                          "
                        >
                          {multiple && (
                            <Checkbox size="sm">
                              <Checkbox.Item
                                checked={isGroupSelected(group)}
                                indeterminate={isGroupPartiallySelected(
                                  group,
                                )}
                              />
                            </Checkbox>
                          )}
                          <span className="
                            flex-1 text-title-sm font-medium text-neutral-900
                          "
                          >
                            {group.label}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleGroupCollapse(group.label);
                          }}
                          className="
                            shrink-0 cursor-pointer p-2.5 transition-colors
                          "
                        >
                          <ChevronDown
                            className={cn(
                              `
                                size-4 shrink-0 text-neutral-900
                                transition-transform
                              `,
                              isGroupCollapsed(group.label) && '-rotate-90',
                            )}
                          />
                        </button>
                      </div>
                      {!isGroupCollapsed(group.label) && (
                        <div className="istok-select-group-options">
                          {group.options.map((option) => {
                            const isSelected
                              = controlledValueStrings.includes(option.value);
                            return (
                              <Combobox.Item
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                                className={cn(
                                  `
                                    istok-select-item flex cursor-pointer
                                    items-center gap-2 px-2.5 py-2
                                    transition-colors
                                    hover:bg-primary-300
                                  `,
                                  option.disabled
                                  && 'cursor-not-allowed opacity-50',
                                )}
                              >
                                {multiple && (
                                  <Checkbox size="sm">
                                    <Checkbox.Item checked={isSelected} />
                                  </Checkbox>
                                )}
                                <span className="
                                  flex-1 text-control-sm text-neutral-900
                                "
                                >
                                  {option.label}
                                </span>
                              </Combobox.Item>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))
                  : (filteredOptions as SelectOption[]).map((option) => {
                    const isSelected = controlledValueStrings.includes(
                      option.value,
                    );
                    return (
                      <Combobox.Item
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className={cn(
                          `
                            istok-select-item flex cursor-pointer items-center
                            gap-1.5 p-2.5 transition-colors
                          `,
                          option.disabled && 'cursor-not-allowed opacity-50',
                        )}
                      >
                        {multiple && (
                          <Checkbox size="sm">
                            <Checkbox.Item checked={isSelected} />
                          </Checkbox>
                        )}
                        <span className="
                          flex-1 text-control-md text-neutral-900
                        "
                        >
                          {option.label}
                        </span>
                      </Combobox.Item>
                    );
                  })}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </div>
    </Combobox.Root>
  );
};
