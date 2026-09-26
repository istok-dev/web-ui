'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type {
  CardPadding,
  CardProps,
  CardRadius,
  CardState,
  CardVariant,
} from '../card.types';

const paddingClassesMap: Record<CardPadding, string> = {
  sm: 'istok-card--padding-sm',
  md: 'istok-card--padding-md',
  lg: 'istok-card--padding-lg',
};

const radiusClassesMap: Record<CardRadius, string> = {
  'xl': 'istok-card--radius-xl',
  '2xl': 'istok-card--radius-2xl',
};

const variantClassesMap: Record<CardVariant, string> = {
  default: 'istok-card--default',
  soft: 'istok-card--soft',
};

export const Card: FC<CardProps> = ({
  className,
  padding = 'lg',
  radius = '2xl',
  variant = 'default',
  hoverable = false,
  render,
  children,
  ...otherProps
}) => {
  const state: CardState = { padding, radius, variant, hoverable };

  const defaultProps: useRender.ElementProps<'section'> = {
    className: cn(
      'istok-card',
      'border border-(--istok-card-border) bg-(--istok-card-bg)',
      'rounded-(--istok-card-radius) p-(--istok-card-padding)',
      hoverable && `
        transition-shadow
        hover:shadow-md
      `,
      paddingClassesMap[padding],
      radiusClassesMap[radius],
      variantClassesMap[variant],
      className,
    ),
    children,
  };

  return useRender({
    defaultTagName: 'section',
    render,
    state,
    props: mergeProps<'section'>(defaultProps, otherProps),
  });
};
