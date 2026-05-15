import { cn } from '@/utils/cn';

import { RadioFC, RadioProps, RadioSize } from '../radio.types';
import { RadioItem } from './radio-item';

const sizeClassesMap: Record<RadioSize, string> = {
  s: 'istok-radio--s',
  m: 'istok-radio--m',
  l: 'istok-radio--l',
};

export const Radio: RadioFC = (props: RadioProps) => {
  const { children, defaultSize = 'm', className } = props;

  return (
    <div
      className={cn(
        'istok-radio space-y-2',
        sizeClassesMap[defaultSize],
        className,
      )}
    >
      {children}
    </div>
  );
};

Radio.Item = RadioItem;
