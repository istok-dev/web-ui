import { X } from 'lucide-react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { TagProps, TagSize, TagVariant } from '../tag.types';

const sizeClassesMap: Record<TagSize, string> = {
  s: 'istok-tag--s',
  m: 'istok-tag--m',
  l: 'istok-tag--l',
};

const variantClassesMap: Record<TagVariant, string> = {
  'solid-brand': 'istok-tag--solid-brand',
  'solid-neutral': 'istok-tag--solid-neutral',
  'solid-black': 'istok-tag--solid-black',
  'ghost-brand': 'istok-tag--ghost-brand',
  'ghost-neutral': 'istok-tag--ghost-neutral',
};

export const Tag: FC<TagProps> = ({
  children,
  startIcon: StartIcon,
  startIconProps,
  onClose,
  closeIconProps,
  className,
  defaultSize = 'm',
  variant = 'solid-brand',
}) => {
  return (
    <div
      className={cn(
        'istok-tag flex items-center',
        'h-(--istok-tag-height) gap-(--istok-tag-gap)',
        `px-(--istok-tag-padding-inline) py-(--istok-tag-padding-block)`,
        'rounded-(--istok-tag-radius)',
        `text-(length:--istok-tag-font-size) leading-(--istok-tag-line-height)`,
        'bg-(--istok-tag-bg) text-(--istok-tag-fg)',
        sizeClassesMap[defaultSize],
        variantClassesMap[variant],
        className,
      )}
    >
      {StartIcon && (
        <StartIcon
          {...startIconProps}
          className={cn(
            'istok-tag__start-icon shrink-0',
            'size-(--istok-tag-icon-size)',
            startIconProps?.className,
          )}
        />
      )}
      <span className="istok-tag__content">{children}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            `
              istok-tag__close-button flex cursor-pointer items-center
              justify-center
            `,
            `
              text-(--istok-tag-close-fg) transition-opacity
              hover:opacity-80
            `,
            'size-(--istok-tag-icon-size)',
          )}
          aria-label="Remove tag"
        >
          <X
            {...closeIconProps}
            className={cn(
              'istok-tag__close-icon size-(--istok-tag-icon-size)',
              closeIconProps?.className,
            )}
          />
        </button>
      )}
    </div>
  );
};
