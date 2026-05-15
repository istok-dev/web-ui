export type SwitchSize = 'sm' | 'md' | 'lg';

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
  className?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size' | 'type'
>;
