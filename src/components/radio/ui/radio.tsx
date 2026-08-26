import { cn } from '@/utils/cn';

import type { RadioFC, RadioProps, RadioSize } from '../radio.types';
import { RadioItem } from './radio-item';

const sizeClassesMap: Record<RadioSize, string> = {
  sm: 'istok-radio--sm',
  md: 'istok-radio--md',
  lg: 'istok-radio--lg',
};

export const Radio: RadioFC = (props: RadioProps) => {
  const { children, size = 'md', className } = props;

  return (
    <div
      className={cn(
        'istok-radio space-y-2',
        sizeClassesMap[size],
        className,
      )}
    >
      {children}
    </div>
  );
};

Radio.Item = RadioItem;
