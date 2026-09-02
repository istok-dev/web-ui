import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { LogoProps, LogoSize } from '../logo.types';
import { LOGO_MARK_PATH } from './logo-mark-path';

const sizeClassesMap: Record<LogoSize, string> = {
  sm: 'istok-logo--sm',
  md: 'istok-logo--md',
  lg: 'istok-logo--lg',
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
  if (variant === 'icon') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1048 1081"
        role={role}
        aria-label={ariaLabel}
        className={cn(
          'istok-logo',
          'block h-12 w-auto text-on-accent',
          sizeClassesMap[size],
          inverse && 'istok-logo--inverse text-primary-600',
          className,
        )}
        {...otherProps}
      >
        <path fill="currentColor" fillRule="evenodd" d={LOGO_MARK_PATH} />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 4270 1081"
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
    >
      <path fill="currentColor" fillRule="evenodd" d={LOGO_MARK_PATH} />
      <text
        x="1351"
        y="724"
        fontFamily="Cormorant, Georgia, serif"
        fontWeight="300"
        fontSize="565"
        textLength="2430"
        lengthAdjust="spacing"
        fill="currentColor"
      >
        ИСТОК
      </text>
      <text
        x="3851"
        y="466"
        fontFamily="Cormorant, Georgia, serif"
        fontStyle="italic"
        fontWeight="300"
        fontSize="230"
        textLength="345"
        lengthAdjust="spacing"
        fill="currentColor"
      >
        dev
      </text>
    </svg>
  );
};
