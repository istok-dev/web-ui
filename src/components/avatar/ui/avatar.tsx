import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { AvatarProps, AvatarSize, AvatarShape } from '../avatar.types';

const getInitials = (name?: string): string => {
  if (!name) return '?';

  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0]?.[0];
    const last = parts[parts.length - 1]?.[0];
    if (first && last) return (first + last).toUpperCase();
  }
  const char = name[0];
  return char ? char.toUpperCase() : '?';
};

const sizeClassesMap: Record<AvatarSize, string> = {
  sm: 'istok-avatar--sm',
  md: 'istok-avatar--md',
  lg: 'istok-avatar--lg',
};

const shapeClassesMap: Record<AvatarShape, string> = {
  circle: 'istok-avatar--circle',
  square: 'istok-avatar--square',
};

const baseClasses
  = 'istok-avatar object-cover flex items-center justify-center font-medium '
    + 'size-[var(--istok-avatar-size)] rounded-[var(--istok-avatar-radius)] '
    + 'bg-primary-200 text-primary-800 '
    + 'text-(length:--istok-avatar-font-size) leading-[var(--istok-avatar-line-height)]';

export const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  name,
  className,
  shape = 'circle',
  size = 'md',
}) => {
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={cn(
          baseClasses,
          sizeClassesMap[size],
          shapeClassesMap[shape],
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        sizeClassesMap[size],
        shapeClassesMap[shape],
        className,
      )}
    >
      {initials}
    </div>
  );
};
