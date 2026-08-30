import { cn } from '@/utils/cn';

import type { DropdownSeparatorFC } from '../dropdown.type';

export const DropdownSeparator: DropdownSeparatorFC = (props) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      role="separator"
      className={cn('mx-2 my-1.5 h-px bg-neutral-200', className)}
    />
  );
};
