import type { FC, SVGProps } from 'react';

import { cn } from '@/utils/cn';

import type { LogoProps, LogoSize, LogoVariant } from '../logo.types';
import { IstokDefaultLg } from './istok-default-lg';
import { IstokDefaultMd } from './istok-default-md';
import { IstokDefaultSm } from './istok-default-sm';
import { IstokDevLg } from './istok-dev-lg';
import { IstokDevMd } from './istok-dev-md';
import { IstokDevSm } from './istok-dev-sm';
import { IstokIconLg } from './istok-icon-lg';
import { IstokIconMd } from './istok-icon-md';
import { IstokIconSm } from './istok-icon-sm';
import { IstokTextDevLg } from './istok-text-dev-lg';
import { IstokTextDevMd } from './istok-text-dev-md';
import { IstokTextDevSm } from './istok-text-dev-sm';
import { IstokTextLg } from './istok-text-lg';
import { IstokTextMd } from './istok-text-md';
import { IstokTextSm } from './istok-text-sm';

const sizeClassesMap: Record<LogoSize, string> = {
  sm: 'istok-logo--sm',
  md: 'istok-logo--md',
  lg: 'istok-logo--lg',
};

const logoComponentsMap: Record<
  LogoVariant,
  Record<LogoSize, FC<SVGProps<SVGSVGElement>>>
> = {
  default: {
    sm: IstokDefaultSm,
    md: IstokDefaultMd,
    lg: IstokDefaultLg,
  },
  icon: {
    sm: IstokIconSm,
    md: IstokIconMd,
    lg: IstokIconLg,
  },
  dev: {
    sm: IstokDevSm,
    md: IstokDevMd,
    lg: IstokDevLg,
  },
  text: {
    sm: IstokTextSm,
    md: IstokTextMd,
    lg: IstokTextLg,
  },
  'text-dev': {
    sm: IstokTextDevSm,
    md: IstokTextDevMd,
    lg: IstokTextDevLg,
  },
};

export const Logo: FC<LogoProps> = ({
  size = 'md',
  variant = 'default',
  inverse = false,
  className,
  role = 'img',
  'aria-label': ariaLabel = 'Исток',
  ...otherProps
}) => {
  const LogoSvg = logoComponentsMap[variant][size];

  return (
    <LogoSvg
      role={role}
      aria-label={ariaLabel}
      className={cn(
        'istok-logo',
        'block h-(--istok-logo-height) w-auto text-on-accent',
        sizeClassesMap[size],
        inverse && 'istok-logo--inverse text-primary-600',
        className,
      )}
      {...otherProps}
    />
  );
};
