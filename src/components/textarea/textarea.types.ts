export const TEXTAREA_SIZES = ['sm', 'md', 'lg'] as const;
export const TEXTAREA_VARIANTS = ['neutral', 'solid', 'outline'] as const;

export type TextareaSize = (typeof TEXTAREA_SIZES)[number];
export type TextareaVariant = (typeof TEXTAREA_VARIANTS)[number];

export type TextareaPassThrough = {
  textarea?: Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'value' | 'defaultValue' | 'disabled' | 'rows' | 'placeholder'
  >;
};

export type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: TextareaSize;
  variant?: TextareaVariant;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  pt?: TextareaPassThrough;
}
& Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'placeholder' | 'disabled' | 'id' | 'name' | 'readOnly' | 'maxLength'
>
& Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;
