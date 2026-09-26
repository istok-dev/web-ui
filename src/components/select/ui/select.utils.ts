import type { SelectGroup, SelectOption, SelectOptions } from '../select.types';

export type SelectionState = 'all' | 'some' | 'none';

export const flattenOptions = (options: SelectOptions): SelectOption[] =>
  options.flatMap(item => ('options' in item ? item.options : [item]));

export const isGrouped = (options: SelectOptions): options is SelectGroup[] => {
  const first = options[0];
  return first !== undefined && 'options' in first;
};

const matchesQuery = (option: SelectOption, query: string) =>
  option.label.toLowerCase().includes(query)
  || option.value.toLowerCase().includes(query);

/** Локальная фильтрация по подписи и значению (без учёта регистра). */
export const filterOptions = (options: SelectOptions, rawQuery: string): SelectOptions => {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return options;

  if (isGrouped(options)) {
    return options.map(group => ({
      ...group,
      options: group.options.filter(option => matchesQuery(option, query)),
    }));
  }

  return options.filter(option => matchesQuery(option, query));
};

/** Сколько из `values` уже выбрано. */
export const getSelectionState = (
  values: string[],
  selected: ReadonlySet<string>,
): SelectionState => {
  const selectedCount = values.filter(value => selected.has(value)).length;
  if (values.length > 0 && selectedCount === values.length) return 'all';
  return selectedCount > 0 ? 'some' : 'none';
};

export const toAriaChecked = (state: SelectionState) =>
  state === 'all' ? true : state === 'some' ? 'mixed' : false;
