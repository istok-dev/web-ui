import type { useRender } from '@base-ui/react/use-render';

export const CARD_PADDINGS = ['sm', 'md', 'lg'] as const;
export const CARD_RADIUS = ['xl', '2xl'] as const;
export const CARD_VARIANTS = ['default', 'soft'] as const;

export type CardPadding = (typeof CARD_PADDINGS)[number];
export type CardRadius = (typeof CARD_RADIUS)[number];
export type CardVariant = (typeof CARD_VARIANTS)[number];

export type CardState = {
  padding: CardPadding;
  radius: CardRadius;
  variant: CardVariant;
  hoverable: boolean;
};

export type CardProps = useRender.ComponentProps<'section', CardState> & {
  padding?: CardPadding;
  radius?: CardRadius;
  variant?: CardVariant;
  hoverable?: boolean;
};
