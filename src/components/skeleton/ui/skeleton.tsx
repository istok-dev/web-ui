'use client';
/* eslint-disable @eslint-react/no-array-index-key -- static skeleton placeholder lines */

import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { SkeletonProps } from '../skeleton.types';

export const Skeleton: FC<SkeletonProps> = ({
  className,
  width,
  height,
  variant = 'rectangular',
  lines = 1,
}) => {
  const baseClasses = 'animate-pulse bg-neutral-200';

  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses[variant],
              index === lines - 1 && 'w-3/4',
            )}
            style={{
              height: height || '1rem',
              width: index === lines - 1 ? undefined : width || '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  );
};
