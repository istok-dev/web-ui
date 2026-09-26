'use client';

import { useCallback, useMemo, useState } from 'react';

import type { SelectOption, SelectOptions } from '../select.types';
import { flattenOptions, getSelectionState } from './select.utils';

type UseSelectValueParams = {
  options: SelectOptions;
  value?: SelectOption[];
  defaultValue?: SelectOption[];
  onChange?: (value: SelectOption[]) => void;
};

/**
 * Значение селекта в контролируемом и неконтролируемом режимах.
 * Внутри Combobox работает со строками `value`, наружу отдаются объекты опций.
 */
export const useSelectValue = ({
  options,
  value,
  defaultValue,
  onChange,
}: UseSelectValueParams) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<SelectOption[]>(
    defaultValue ?? [],
  );
  const isControlled = value !== undefined;
  const selected = isControlled ? value : uncontrolledValue;

  const selectedValues = useMemo(() => selected.map(o => o.value), [selected]);
  const selectedSet = useMemo(() => new Set(selectedValues), [selectedValues]);

  /**
   * Опции по value. Выбранные тоже учитываются: при серверном поиске
   * выбранного значения может не быть в текущем списке `options`.
   */
  const optionsByValue = useMemo(() => {
    const byValue = new Map<string, SelectOption>();
    selected.forEach(o => byValue.set(o.value, o));
    flattenOptions(options).forEach(o => byValue.set(o.value, o));
    return byValue;
  }, [options, selected]);

  const setValues = useCallback(
    (values: string[]) => {
      const next = values
        .map(v => optionsByValue.get(v))
        .filter((o): o is SelectOption => o !== undefined);

      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange, optionsByValue],
  );

  const remove = useCallback(
    (valueToRemove: string) => {
      setValues(selectedValues.filter(v => v !== valueToRemove));
    },
    [selectedValues, setValues],
  );

  /** Если выбраны все `values` — снимает их, иначе добавляет недостающие. */
  const toggleValues = useCallback(
    (values: string[]) => {
      const next = getSelectionState(values, selectedSet) === 'all'
        ? selectedValues.filter(v => !values.includes(v))
        : [...new Set([...selectedValues, ...values])];
      setValues(next);
    },
    [selectedSet, selectedValues, setValues],
  );

  const getLabel = useCallback(
    (itemValue: string) => optionsByValue.get(itemValue)?.label ?? itemValue,
    [optionsByValue],
  );

  return {
    selected,
    selectedValues,
    selectedSet,
    hasValue: selected.length > 0,
    setValues,
    remove,
    toggleValues,
    getLabel,
  };
};
