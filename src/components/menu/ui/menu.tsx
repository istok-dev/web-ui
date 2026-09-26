import { cn } from '@/utils/cn';

import type { MenuFC } from '../menu.type';
import { MenuItem } from './menu-item';
import { MenuSeparator } from './menu-separator';

export const Menu: MenuFC = (props) => {
  const {
    children,
    className,
    style,
    header,
    classes,
    unstyled = false,
  } = props;

  const headerBlock = header
    ? (
      <div className={cn('mb-1.5 shrink-0', classes?.header)}>
        <div className="px-3 py-2">{header}</div>
        <div className="mx-3 h-px bg-neutral-200" aria-hidden />
      </div>
    )
    : null;

  return (
    <div
      className={cn(!unstyled && 'relative istok-menu', className)}
      style={style}
    >
      {headerBlock}
      {children}
    </div>
  );
};

Menu.Item = MenuItem;
Menu.Separator = MenuSeparator;
