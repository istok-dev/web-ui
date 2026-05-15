'use client';

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import React, { isValidElement } from 'react';

import { cn } from '@/utils/cn';

import { TooltipProps, TooltipPlacement } from '../tooltip.types';

const placementMap: Record<
  TooltipPlacement,
  {
    side: 'top' | 'bottom' | 'left' | 'right';
    align: 'start' | 'center' | 'end';
  }
> = {
  'top': { side: 'top', align: 'center' },
  'top-start': { side: 'top', align: 'start' },
  'top-end': { side: 'top', align: 'end' },
  'bottom': { side: 'bottom', align: 'center' },
  'bottom-start': { side: 'bottom', align: 'start' },
  'bottom-end': { side: 'bottom', align: 'end' },
  'left': { side: 'left', align: 'center' },
  'right': { side: 'right', align: 'center' },
};

const DEFAULT_DELAY = 50;

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  description,
  placement = 'top',
  offset = 8,
  showArrow = true,
  open,
  onOpenChange,
  popupClassName,
  disabled = false,
  triggerProps,
}) => {
  const { side, align } = placementMap[placement];

  if (disabled || (!title && !description)) {
    return <>{children}</>;
  }

  const childRender = isValidElement(children) ? children : undefined;

  return (
    <BaseTooltip.Root open={open} onOpenChange={onOpenChange}>
      <BaseTooltip.Trigger
        className={cn('istok-tooltip__trigger', 'flex w-fit')}
        delay={triggerProps?.delay ?? DEFAULT_DELAY}
        {...triggerProps}
        render={triggerProps?.render ?? childRender}
      />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} align={align} sideOffset={offset}>
          <BaseTooltip.Popup
            className={cn(
              'istok-tooltip',
              'bg-neutral-900 text-neutral-100',
              'max-w-80 rounded-xl p-4',
              popupClassName,
            )}
          >
            {showArrow && (
              <BaseTooltip.Arrow
                className={cn(
                  'istok-tooltip__arrow absolute size-2 fill-neutral-900',
                  `
                    data-[side=top]:-bottom-1 data-[side=top]:rotate-45
                    data-[side=top]:bg-neutral-900
                  `,
                  `
                    data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45
                    data-[side=bottom]:bg-neutral-900
                  `,
                  `
                    data-[side=left]:-right-1 data-[side=left]:rotate-45
                    data-[side=left]:bg-neutral-900
                  `,
                  `
                    data-[side=right]:-left-1 data-[side=right]:rotate-45
                    data-[side=right]:bg-neutral-900
                  `,
                )}
              />
            )}
            <div className={cn('istok-tooltip__content flex flex-col gap-1')}>
              {title && (
                <div
                  className={cn(
                    'istok-tooltip__title text-control-md font-medium',
                  )}
                >
                  {title}
                </div>
              )}
              {description && (
                <div className={cn('istok-tooltip__description text-body-md')}>
                  {description}
                </div>
              )}
            </div>
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
};
