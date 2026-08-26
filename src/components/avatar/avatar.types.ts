export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  shape?: AvatarShape;
};
