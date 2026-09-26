export const AVATAR_SHAPES = ['circle', 'square'] as const;
export const AVATAR_SIZES = ['sm', 'md', 'lg'] as const;

export type AvatarShape = (typeof AVATAR_SHAPES)[number];
export type AvatarSize = (typeof AVATAR_SIZES)[number];

export type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  shape?: AvatarShape;
};
