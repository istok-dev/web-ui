import { describe, expect, it } from 'vitest';

import type { SelectGroup, SelectOption } from '../select.types';
import { filterOptions, flattenOptions, getSelectionState, isGrouped } from './select.utils';

const flat: SelectOption[] = [
  { label: 'Дизайн', value: 'design' },
  { label: 'Разработка', value: 'dev' },
];

const groups: SelectGroup[] = [
  { label: 'Отделы', options: flat },
  { label: 'Роли', options: [{ label: 'Лид', value: 'lead' }] },
];

describe('select.utils', () => {
  it('isGrouped различает плоский и сгруппированный список', () => {
    expect(isGrouped(flat)).toBe(false);
    expect(isGrouped(groups)).toBe(true);
    expect(isGrouped([])).toBe(false);
  });

  it('flattenOptions разворачивает группы', () => {
    expect(flattenOptions(groups).map(o => o.value)).toEqual(['design', 'dev', 'lead']);
    expect(flattenOptions(flat)).toEqual(flat);
  });

  it('filterOptions ищет по подписи и значению без учёта регистра', () => {
    expect(filterOptions(flat, '  ДИЗ ')).toEqual([flat[0]]);
    expect(filterOptions(flat, 'dev')).toEqual([flat[1]]);
    expect(filterOptions(flat, '')).toBe(flat);
  });

  it('filterOptions сохраняет структуру групп', () => {
    const result = filterOptions(groups, 'лид') as SelectGroup[];

    expect(result.map(g => g.options.length)).toEqual([0, 1]);
  });

  it('getSelectionState', () => {
    const selected = new Set(['a', 'b']);

    expect(getSelectionState(['a', 'b'], selected)).toBe('all');
    expect(getSelectionState(['a', 'c'], selected)).toBe('some');
    expect(getSelectionState(['c'], selected)).toBe('none');
    expect(getSelectionState([], selected)).toBe('none');
  });
});
