"use client";

import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { ChevronDown, Search, X } from "lucide-react";

import { cn } from "@/utils/cn";

import {
  SelectProps,
  SelectOption,
  SelectGroup,
  SelectSize,
  SelectVariant,
} from "../select.types";
import { Tag } from "../../tag";
import { Input } from "../../input";
import { Checkbox } from "../../checkbox";

const sizeClassesMap: Record<SelectSize, string> = {
  s: "istok-select--s",
  m: "istok-select--m",
  l: "istok-select--l",
};

const variantClassesMap: Record<SelectVariant, string> = {
  solid: "istok-select--solid",
  outline: "istok-select--outline",
};

const tagSizeClassesMap: Record<SelectSize, string> = {
  s: "istok-tag--s",
  m: "istok-tag--m",
  l: "istok-tag--l",
};

const flattenOptions = (
  options: SelectOption[] | SelectGroup[]
): SelectOption[] => {
  return options.reduce<SelectOption[]>((acc, item) => {
    if ("options" in item) {
      return [...acc, ...item.options];
    }
    return [...acc, item];
  }, []);
};

const isGrouped = (
  options: SelectOption[] | SelectGroup[]
): options is SelectGroup[] => {
  return options.length > 0 && "options" in options[0];
};

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = "Выберите...",
  options,
  value,
  defaultValue,
  onChange,
  multiple = true,
  searchable = true,
  searchPlaceholder = "Поиск",
  onSearch,
  selectAllLabel = "Выбрать все",
  clearLabel = "Сбросить",
  showSelectAll = true,
  showClear = true,
  disabled = false,
  className,
  triggerClassName,
  popupClassName,
  size = "m",
  startIcon: StartIcon,
  startIconProps,
  variant = "solid",
}) => {
  const allOptions = useMemo(() => flattenOptions(options), [options]);
  const grouped = isGrouped(options);

  const valueToStrings = (opts: SelectOption[]) => opts.map((o) => o.value);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SelectOption[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchQueryRef = useRef(searchQuery);
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<SelectOption[]>(
    defaultValue ?? []
  );
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set()
  );

  const optionsForResolve = useMemo(() => {
    const byValue = new Map<string, SelectOption>();
    allOptions.forEach((o) => byValue.set(o.value, o));
    if (onSearch && searchResults.length) {
      searchResults.forEach((o) => byValue.set(o.value, o));
    }
    return Array.from(byValue.values());
  }, [allOptions, onSearch, searchResults]);

  const stringsToOptions = useCallback(
    (vals: string[]) =>
      vals
        .map((v) => optionsForResolve.find((o) => o.value === v))
        .filter((o): o is SelectOption => o != null),
    [optionsForResolve]
  );

  searchQueryRef.current = searchQuery;

  useEffect(() => {
    if (!onSearch) return;
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }
    const query = searchQuery.trim();
    const result = onSearch(query);
    if (result instanceof Promise) {
      setSearchLoading(true);
      result.then((opts) => {
        if (searchQueryRef.current === query) {
          setSearchResults(opts);
        }
        setSearchLoading(false);
      });
    } else {
      setSearchResults(result);
    }
  }, [onSearch, searchQuery]);

  const controlledValue = value !== undefined ? value : selectedValues;
  const controlledValueStrings = valueToStrings(controlledValue);
  const isControlled = value !== undefined;

  const filteredOptions = useMemo(() => {
    if (onSearch) {
      if (!searchQuery.trim()) return options;
      return searchResults;
    }
    if (!searchQuery) return options;

    const query = searchQuery.toLowerCase();
    if (grouped) {
      return (options as SelectGroup[]).map((group) => ({
        ...group,
        options: group.options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(query) ||
            opt.value.toLowerCase().includes(query)
        ),
      }));
    }
    return (options as SelectOption[]).filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.value.toLowerCase().includes(query)
    );
  }, [onSearch, options, searchQuery, searchResults, grouped]);

  const selectedOptions = useMemo(() => {
    return allOptions.filter((opt) =>
      controlledValueStrings.includes(opt.value)
    );
  }, [allOptions, controlledValueStrings]);

  const allSelected = useMemo(() => {
    const availableOptions = flattenOptions(filteredOptions);
    return (
      availableOptions.length > 0 &&
      availableOptions.every((opt) =>
        controlledValueStrings.includes(opt.value)
      )
    );
  }, [filteredOptions, controlledValueStrings]);

  const someSelected = useMemo(() => {
    const availableOptions = flattenOptions(filteredOptions);
    return (
      availableOptions.some((opt) =>
        controlledValueStrings.includes(opt.value)
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
      const options = stringsToOptions(values);
      if (!isControlled) {
        setSelectedValues(options);
      }
      onChange?.(options);
      if (!multiple && values.length > 0) {
        setOpen(false);
      }
    },
    [isControlled, onChange, multiple, stringsToOptions]
  );

  const handleSelectAll = useCallback(() => {
    const availableOptions = flattenOptions(filteredOptions);
    const availableValues = availableOptions.map((opt) => opt.value);
    const newValues = allSelected
      ? controlledValueStrings.filter((v) => !availableValues.includes(v))
      : [...new Set([...controlledValueStrings, ...availableValues])];
    handleValueChange(newValues);
  }, [allSelected, filteredOptions, controlledValueStrings, handleValueChange]);

  const handleClear = useCallback(() => {
    handleValueChange([]);
  }, [handleValueChange]);

  const handleRemoveTag = useCallback(
    (valueToRemove: string) => {
      const newValues = controlledValueStrings.filter(
        (v) => v !== valueToRemove
      );
      handleValueChange(newValues);
    },
    [controlledValueStrings, handleValueChange]
  );

  const handleGroupToggle = useCallback(
    (group: SelectGroup) => {
      const groupValues = group.options.map((opt) => opt.value);
      const allGroupSelected = groupValues.every((v) =>
        controlledValueStrings.includes(v)
      );
      const newValues = allGroupSelected
        ? controlledValueStrings.filter((v) => !groupValues.includes(v))
        : [...new Set([...controlledValueStrings, ...groupValues])];
      handleValueChange(newValues);
    },
    [controlledValueStrings, handleValueChange]
  );

  const isGroupSelected = useCallback(
    (group: SelectGroup) => {
      const groupValues = group.options.map((opt) => opt.value);
      return groupValues.every((v) => controlledValueStrings.includes(v));
    },
    [controlledValueStrings]
  );

  const isGroupPartiallySelected = useCallback(
    (group: SelectGroup) => {
      const groupValues = group.options.map((opt) => opt.value);
      return (
        groupValues.some((v) => controlledValueStrings.includes(v)) &&
        !isGroupSelected(group)
      );
    },
    [controlledValueStrings, isGroupSelected]
  );

  const toggleGroupCollapse = useCallback((groupLabel: string) => {
    setCollapsedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupLabel)) {
        newSet.delete(groupLabel);
      } else {
        newSet.add(groupLabel);
      }
      return newSet;
    });
  }, []);

  const isGroupCollapsed = useCallback(
    (groupLabel: string) => {
      return collapsedGroups.has(groupLabel);
    },
    [collapsedGroups]
  );

  return (
    <BaseSelect.Root
      value={
        multiple ? controlledValueStrings : controlledValueStrings[0] || null
      }
      onValueChange={handleValueChange}
      open={open}
      onOpenChange={setOpen}
      multiple={multiple}
      disabled={disabled}
    >
      <div
        className={cn(
          "istok-select relative",
          sizeClassesMap[size],
          variantClassesMap[variant],
          className
        )}
      >
        <BaseSelect.Trigger
          className={cn(
            "istok-select__trigger w-full flex items-center gap-2 text-left cursor-pointer transition-all overflow-hidden",
            "h-[var(--istok-select-trigger-height)] py-[var(--istok-select-trigger-padding-y)] px-[var(--istok-select-trigger-padding-x)] rounded-[var(--istok-select-trigger-radius)]",
            "bg-[var(--istok-select-trigger-bg)] text-[var(--istok-select-trigger-fg)] border border-[var(--istok-select-trigger-border)]",
            "focus:outline-none focus:border-[var(--istok-select-trigger-border-focus)]",
            "data-[popup-open=true]:[&>.istok-select__chevron]:rotate-180",
            !disabled && "hover:bg-[var(--istok-select-trigger-bg-hover)]",
            disabled && "opacity-50 cursor-not-allowed",
            triggerClassName
          )}
        >
          {StartIcon && (
            <StartIcon
              {...startIconProps}
              className={cn(
                "istok-select__start-icon shrink-0 text-[var(--istok-select-trigger-start-icon)]",
                "size-[var(--istok-select-start-icon-size)]",
                startIconProps?.className
              )}
            />
          )}
          <BaseSelect.Value className="istok-select__value flex-1 min-h-[24px] relative overflow-hidden">
            {(triggerValue: string[]) => {
              if (multiple) {
                const selected = Array.isArray(triggerValue)
                  ? triggerValue
                  : [];
                if (selected.length === 0) {
                  return (
                    <span
                      className="istok-select__placeholder text-(length:--istok-select-placeholder-font)"
                      style={{
                        color: "var(--istok-select-trigger-placeholder)",
                      }}
                    >
                      {placeholder}
                    </span>
                  );
                }
                return (
                  <div className="flex items-center gap-1">
                    {selected.slice(0, 10).map((val) => {
                      const option = allOptions.find(
                        (opt) => opt.value === val
                      );
                      return option ? (
                        <Tag
                          key={val}
                          variant="ghost-brand"
                          onClose={(e) => {
                            e.stopPropagation();
                            handleRemoveTag(val);
                          }}
                          className={cn(
                            "istok-select__value-tag whitespace-nowrap",
                            tagSizeClassesMap[size]
                          )}
                        >
                          {option.label}
                        </Tag>
                      ) : null;
                    })}
                  </div>
                );
              }
              const selectedValue = Array.isArray(triggerValue)
                ? triggerValue[0]
                : triggerValue;
              const option = allOptions.find(
                (opt) => opt.value === selectedValue
              );
              return (
                <span className="truncate text-(length:--istok-select-value-font)">
                  {option?.label || placeholder}
                </span>
              );
            }}
          </BaseSelect.Value>
          <ChevronDown
            className={cn(
              "istok-select__chevron text-[var(--istok-select-trigger-fg)] transition-transform shrink-0 size-[var(--istok-select-chevron-size)]"
            )}
          />
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner
            side="bottom"
            align="start"
            sideOffset={4}
            alignItemWithTrigger={false}
          >
            <BaseSelect.Popup
              className={cn(
                "istok-select-popup z-50 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden",
                "min-w-[var(--anchor-width)] max-w-[var(--anchor-width)] max-h-[400px] flex flex-col",
                popupClassName
              )}
            >
              {label && (
                <div className="istok-select__popup-header p-2.5">
                  <h3 className="text-title-s font-bold text-neutral-900">
                    {label}
                  </h3>
                </div>
              )}
              {searchable && (
                <div
                  className="istok-select__search-container p-2.5"
                  onKeyDown={(e) => e.stopPropagation()}
                  onKeyUp={(e) => e.stopPropagation()}
                  onBlur={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => e.stopPropagation()}
                  onMouseLeave={(e) => e.stopPropagation()}
                >
                  <Input
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={searchPlaceholder}
                    startIcon={Search}
                    variant="neutral"
                    defaultSize="s"
                    className="w-full"
                    inputClassName={searchQuery ? "pr-10" : undefined}
                    endAdornment={
                      searchQuery ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery("");
                          }}
                          className="p-0.5 rounded hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer"
                          aria-label="Очистить поиск"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      ) : undefined
                    }
                  />
                </div>
              )}
              {multiple && selectedOptions.length > 0 && (
                <div className="istok-select__selected-tags px-2.5 py-1.5 flex items-center gap-1 flex-wrap">
                  {selectedOptions.map((opt) => (
                    <Tag
                      key={opt.value}
                      variant="ghost-brand"
                      defaultSize="s"
                      onClose={() => handleRemoveTag(opt.value)}
                    >
                      {opt.label}
                    </Tag>
                  ))}
                </div>
              )}
              {(showSelectAll || showClear) && multiple && (
                <div className="istok-select__actions p-2.5 flex items-center justify-between">
                  {showSelectAll && (
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="flex items-center gap-1.5 text-control-s text-neutral-900 hover:text-neutral-900 transition-colors cursor-pointer"
                    >
                      <Checkbox defaultSize="s">
                        <Checkbox.Item
                          checked={allSelected}
                          indeterminate={someSelected}
                        />
                      </Checkbox>
                      {selectAllLabel}
                    </button>
                  )}
                  {showClear && selectedOptions.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-control-m text-brand-700 hover:text-neutral-900 transition-colors cursor-pointer"
                    >
                      {clearLabel}
                    </button>
                  )}
                </div>
              )}
              <BaseSelect.List className="istok-select-list flex-1 overflow-y-auto">
                {isGrouped(filteredOptions)
                  ? (filteredOptions as SelectGroup[]).map((group) => {
                      const groupSelected = isGroupSelected(group);
                      const groupPartiallySelected =
                        isGroupPartiallySelected(group);
                      return (
                        <div key={group.label} className="istok-select-group">
                          <div className="w-full flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                multiple && handleGroupToggle(group)
                              }
                              className="flex-1 p-2.5 flex items-center gap-1.5 text-left hover:bg-brand-300 transition-colors cursor-pointer"
                            >
                              {multiple && (
                                <Checkbox defaultSize="s">
                                  <Checkbox.Item
                                    checked={groupSelected}
                                    indeterminate={groupPartiallySelected}
                                  />
                                </Checkbox>
                              )}
                              <span className="text-title-s font-medium text-neutral-900 flex-1">
                                {group.label}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleGroupCollapse(group.label);
                              }}
                              className="p-2.5 hover:bg-neutral-50 transition-colors shrink-0 cursor-pointer"
                            >
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 text-neutral-900 shrink-0 transition-transform",
                                  isGroupCollapsed(group.label) && "-rotate-90"
                                )}
                              />
                            </button>
                          </div>
                          {!isGroupCollapsed(group.label) && (
                            <div className="istok-select-group-options pl-4">
                              {group.options.map((option) => {
                                const isSelected =
                                  controlledValueStrings.includes(option.value);
                                return (
                                  <BaseSelect.Item
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    className={cn(
                                      "istok-select-item p-1.5 flex items-center gap-2 cursor-pointer hover:bg-brand-300 transition-colors data-[highlighted]:bg-neutral-50",
                                      option.disabled &&
                                        "opacity-50 cursor-not-allowed"
                                    )}
                                  >
                                    {multiple && (
                                      <Checkbox defaultSize="s">
                                        <Checkbox.Item checked={isSelected} />
                                      </Checkbox>
                                    )}
                                    <BaseSelect.ItemText className="text-control-s text-neutral-900 flex-1">
                                      {option.label}
                                    </BaseSelect.ItemText>
                                  </BaseSelect.Item>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })
                  : (filteredOptions as SelectOption[]).map((option) => {
                      const isSelected = controlledValueStrings.includes(
                        option.value
                      );
                      return (
                        <BaseSelect.Item
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                          className={cn(
                            "istok-select-item p-2.5 flex items-center gap-1.5 cursor-pointer hover:bg-brand-50 transition-colors data-[highlighted]:bg-neutral-50",
                            option.disabled && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {multiple && (
                            <Checkbox defaultSize="s">
                              <Checkbox.Item checked={isSelected} />
                            </Checkbox>
                          )}
                          <BaseSelect.ItemText className="text-control-m text-neutral-900 flex-1">
                            {option.label}
                          </BaseSelect.ItemText>
                        </BaseSelect.Item>
                      );
                    })}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </div>
    </BaseSelect.Root>
  );
};
