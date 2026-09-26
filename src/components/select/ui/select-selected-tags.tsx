'use client';

import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import { Tag } from '../../tag';
import type { SelectOption } from '../select.types';

/** Высота свёрнутого блока тегов (две строки тегов sm) */
const COLLAPSED_HEIGHT = 51;

type SelectSelectedTagsProps = {
  selected: SelectOption[];
  onRemove: (value: string) => void;
  showAllLabel: string;
  hideLabel: string;
  countLabel: string;
};

/** Список выбранных значений в попапе с возможностью удаления и сворачивания. */
export const SelectSelectedTags: FC<SelectSelectedTagsProps> = ({
  selected,
  onRemove,
  showAllLabel,
  hideLabel,
  countLabel,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Наблюдаем за содержимым, а не за обёрткой: у свёрнутой обёртки
  // фиксированная высота, и добавление тегов её не меняет.
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new ResizeObserver(() => {
      setHasOverflow(content.offsetHeight > COLLAPSED_HEIGHT);
    });
    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="istok-select__selected-tags px-2.5 py-1.5">
      <div className="mb-2 flex items-center justify-between">
        {hasOverflow && (
          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={expanded}
            className="
              cursor-pointer text-control-xs text-primary-600 transition-colors
              hover:text-neutral-900
            "
          >
            {expanded ? hideLabel : showAllLabel}
          </button>
        )}
        <span className="text-control-xs text-neutral-500">
          {countLabel}
          {' '}
          {selected.length}
        </span>
      </div>
      <div
        ref={wrapperRef}
        className={cn(
          `
            istok-select__selected-tags__wrapper relative overflow-hidden
            transition-all duration-300
          `,
          hasOverflow && 'istok-select-tags-overflow',
          hasOverflow && !expanded && 'max-h-12.75',
          hasOverflow && expanded && 'max-h-31 scrollbar overflow-y-auto',
        )}
      >
        <div
          ref={contentRef}
          className="
            istok-select__selected-tags__container flex w-full flex-wrap
            items-start gap-1
          "
        >
          {selected.map(option => (
            <Tag
              key={option.value}
              variant="ghost"
              color="primary"
              size="sm"
              onRemove={() => onRemove(option.value)}
            >
              {option.label}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
