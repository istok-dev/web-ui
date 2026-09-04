import type { SVGAttributes } from 'react';

export const LOGO_SIZES = ['sm', 'md', 'lg'] as const;
export const LOGO_VARIANTS = ['default', 'icon', 'dev'] as const;

export type LogoSize = (typeof LOGO_SIZES)[number];
export type LogoVariant = (typeof LOGO_VARIANTS)[number];

export type LogoProps = SVGAttributes<SVGSVGElement> & {
  size?: LogoSize;
  variant?: LogoVariant;
  /** Инверсивный логотип (primary-600) для светлого фона */
  inverse?: boolean;
};
