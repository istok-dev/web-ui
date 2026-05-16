import { House } from 'lucide-react';
import { Fragment } from 'react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { BreadcrumbsProps, BreadcrumbsSize } from '../breadcrumbs.types';

const sizeClassesMap: Record<BreadcrumbsSize, string> = {
  l: 'istok-breadcrumbs--l',
  m: 'istok-breadcrumbs--m',
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items,
  className,
  defaultSize = 'm',
  maxItems,
  Link,
}) => {
  const LinkComponent = Link || 'a';

  const showEllipsis
    = typeof maxItems === 'number'
      && maxItems >= 1
      && items.length > maxItems - 1;
  const visibleItems = showEllipsis ? items.slice(-(maxItems - 1)) : items;

  const itemClassName = cn(
    'istok-breadcrumbs__item',
    `
      px-(--istok-breadcrumbs-item-padding-x)
      py-(--istok-breadcrumbs-item-padding-y)
    `,
    'rounded-xl font-medium',
    `
      text-(length:--istok-breadcrumbs-item-font-size)
      leading-(--istok-breadcrumbs-item-line-height)
    `,
    'text-neutral-400',
    'transition-colors',
  );

  const itemActiveClassName = cn(
    itemClassName,
    'istok-breadcrumbs__item--active',
    'cursor-pointer',
    'hover:bg-primary-200 hover:text-primary-700',
  );

  const separatorClassName = cn(
    'istok-breadcrumbs__separator',
    'flex items-center justify-center font-medium',
    'size-(--istok-breadcrumbs-separator-size)',
    'text-(length:--istok-breadcrumbs-separator-font-size)',
    'text-neutral-400',
  );

  return (
    <div
      className={cn(
        'istok-breadcrumbs',
        'flex flex-wrap items-center',
        sizeClassesMap[defaultSize],
        className,
      )}
    >
      <LinkComponent
        href="/"
        aria-label="Главная"
        className={itemActiveClassName}
      >
        <House
          className={cn(
            'istok-breadcrumbs__icon shrink-0',
            'size-(--istok-breadcrumbs-icon-size)',
          )}
        />
      </LinkComponent>

      <div className={separatorClassName}>/</div>

      {showEllipsis && (
        <>
          <span className={itemClassName} aria-hidden>
            …
          </span>
          <div className={separatorClassName}>/</div>
        </>
      )}

      {visibleItems.map((item, index) => (
        <Fragment
          key={
            showEllipsis ? items.length - visibleItems.length + index : index
          }
        >
          {item.href != null
            ? (
              <LinkComponent
                href={item.href}
                className={cn(itemActiveClassName, {
                  group: Boolean(item.icon),
                })}
              >
                {item.icon && (
                  <div className="istok-breadcrumbs__item-icon-wrapper">
                    {item.icon}
                  </div>
                )}
                {item.label}
              </LinkComponent>
            )
            : (
              <span
                className={cn(itemClassName, {
                  group: Boolean(item.icon),
                })}
              >
                {item.icon && (
                  <div className="istok-breadcrumbs__item-icon-wrapper">
                    {item.icon}
                  </div>
                )}
                {item.label}
              </span>
            )}

          {index < visibleItems.length - 1 && (
            <div className={separatorClassName}>/</div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
