'use client';

import { Combobox } from '@base-ui/react/combobox';
import { Search, X } from 'lucide-react';
import type { FC } from 'react';

import { Input } from '../../input';

type SelectSearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;
  clearLabel: string;
};

const stopPropagation = (event: { stopPropagation: () => void }) => {
  event.stopPropagation();
};

export const SelectSearch: FC<SelectSearchProps> = ({
  query,
  onQueryChange,
  placeholder,
  clearLabel,
}) => (
  <div
    className="istok-select__search-container p-2.5"
    onKeyDown={stopPropagation}
    onKeyUp={stopPropagation}
    onBlur={stopPropagation}
    onMouseEnter={stopPropagation}
    onMouseLeave={stopPropagation}
  >
    <Combobox.Input
      render={(props) => {
        const { onChange: _onComboboxChange, ...rest } = props;
        return (
          <Input
            {...rest}
            value={query}
            onChange={onQueryChange}
            placeholder={placeholder}
            startIcon={Search}
            variant="neutral"
            size="sm"
            className="w-full"
            pt={{
              input: {
                autoComplete: 'off',
                className: query ? 'pr-10' : undefined,
              },
            }}
            endAdornment={
              query
                ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onQueryChange('');
                    }}
                    className="
                      cursor-pointer rounded-sm p-0.5 text-neutral-500
                      transition-colors
                      hover:bg-neutral-200 hover:text-neutral-700
                    "
                    aria-label={clearLabel}
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
);
