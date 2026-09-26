'use client';

import { Combobox } from '@base-ui/react/combobox';
import { ChevronDown } from 'lucide-react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import { CheckboxIndicator } from '../../checkbox';
import type { SelectGroup, SelectOption, SelectOptions as Options } from '../select.types';
import { getSelectionState, isGrouped, toAriaChecked } from './select.utils';

type SelectOptionItemProps = {
  option: SelectOption;
  multiple: boolean;
  selected: boolean;
  className: string;
  labelClassName: string;
};

const SelectOptionItem: FC<SelectOptionItemProps> = ({
  option,
  multiple,
  selected,
  className,
  labelClassName,
}) => (
  <Combobox.Item
    value={option.value}
    disabled={option.disabled}
    className={cn(
      className,
      option.disabled && 'cursor-not-allowed opacity-50',
    )}
  >
    {multiple && (
      <CheckboxIndicator
        size="sm"
        checked={selected}
        disabled={option.disabled}
      />
    )}
    <span className={labelClassName}>{option.label}</span>
  </Combobox.Item>
);

type SelectGroupSectionProps = {
  group: SelectGroup;
  multiple: boolean;
  selectedSet: ReadonlySet<string>;
  collapsed: boolean;
  onToggleCollapse: (groupLabel: string) => void;
  onToggleGroup: (values: string[]) => void;
};

const SelectGroupSection: FC<SelectGroupSectionProps> = ({
  group,
  multiple,
  selectedSet,
  collapsed,
  onToggleCollapse,
  onToggleGroup,
}) => {
  const groupValues = group.options.map(option => option.value);
  const selectionState = getSelectionState(groupValues, selectedSet);
  const groupLabel = (
    <span className="flex-1 text-title-sm font-medium text-neutral-900">
      {group.label}
    </span>
  );

  return (
    <div className="istok-select-group">
      <div className="
        flex w-full items-center gap-1.5
        hover:bg-primary-300
      "
      >
        {multiple
          ? (
            <button
              type="button"
              role="checkbox"
              aria-checked={toAriaChecked(selectionState)}
              onClick={() => onToggleGroup(groupValues)}
              className="
                group flex flex-1 cursor-pointer items-center gap-1.5 p-2.5
                text-left transition-colors
              "
            >
              <CheckboxIndicator
                size="sm"
                checked={selectionState === 'all'}
                indeterminate={selectionState === 'some'}
              />
              {groupLabel}
            </button>
          )
          : (
            <div className="flex flex-1 items-center p-2.5">
              {groupLabel}
            </div>
          )}
        <button
          type="button"
          aria-label={group.label}
          aria-expanded={!collapsed}
          onClick={(event) => {
            event.stopPropagation();
            onToggleCollapse(group.label);
          }}
          className="shrink-0 cursor-pointer p-2.5 transition-colors"
        >
          <ChevronDown
            aria-hidden
            className={cn(
              'size-4 shrink-0 text-neutral-900 transition-transform',
              collapsed && '-rotate-90',
            )}
          />
        </button>
      </div>
      {!collapsed && (
        <div className="istok-select-group-options">
          {group.options.map(option => (
            <SelectOptionItem
              key={option.value}
              option={option}
              multiple={multiple}
              selected={selectedSet.has(option.value)}
              className="
                istok-select-item group flex cursor-pointer items-center gap-2
                px-2.5 py-2 transition-colors
                hover:bg-primary-300
              "
              labelClassName="flex-1 text-control-sm text-neutral-900"
            />
          ))}
        </div>
      )}
    </div>
  );
};

type SelectOptionsProps = {
  options: Options;
  multiple: boolean;
  selectedSet: ReadonlySet<string>;
  collapsedGroups: ReadonlySet<string>;
  onToggleCollapse: (groupLabel: string) => void;
  onToggleGroup: (values: string[]) => void;
};

export const SelectOptions: FC<SelectOptionsProps> = ({
  options,
  multiple,
  selectedSet,
  collapsedGroups,
  onToggleCollapse,
  onToggleGroup,
}) => (
  <Combobox.List className="istok-select-list flex-1 scrollbar overflow-y-auto">
    {isGrouped(options)
      ? options.map(group => (
        <SelectGroupSection
          key={group.label}
          group={group}
          multiple={multiple}
          selectedSet={selectedSet}
          collapsed={collapsedGroups.has(group.label)}
          onToggleCollapse={onToggleCollapse}
          onToggleGroup={onToggleGroup}
        />
      ))
      : options.map(option => (
        <SelectOptionItem
          key={option.value}
          option={option}
          multiple={multiple}
          selected={selectedSet.has(option.value)}
          className="
            istok-select-item group flex cursor-pointer items-center gap-1.5
            p-2.5 transition-colors
          "
          labelClassName="flex-1 text-control-md text-neutral-900"
        />
      ))}
  </Combobox.List>
);
