export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 's' | 'm' | 'l';

export type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  defaultSize?: AvatarSize;
  className?: string;
  shape?: AvatarShape;
};
