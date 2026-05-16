import { cn } from '@/utils/cn';

import type { TabItemFC, TabItemProps } from '../tabs.type';
import { useTabsContext } from './tabs-context';

function TabItemComponent<T extends string>({
  value,
  label,
  startIcon: StartIcon,
  startIconProps,
  onClick,
  className,
  disabled = false,
  ...props
}: TabItemProps<T>) {
  const context = useTabsContext<T>();
  const isActive = context.value === value;

  const handleClick = () => {
    if (disabled) return;
    context.onValueChange?.(value);
    onClick?.();
  };

  return (
    <button
      {...props}
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'istok-tab-item',
        `
          relative flex cursor-pointer items-center justify-center
          transition-all
        `,
        `
          h-(--istok-tabs-item-height) px-(--istok-tabs-item-padding-inline)
          py-(--istok-tabs-item-padding-block)
        `,
        `gap-(--istok-tabs-item-gap) rounded-(--istok-tabs-item-radius)`,
        'bg-(--istok-tabs-item-bg)',
        `after:absolute after:inset-x-0 after:bottom-0 after:content-['']`,
        'after:h-(--istok-tabs-item-line-underline-height)',
        {
          'cursor-not-allowed opacity-50': disabled,
          'istok-tab-item--active after:bg-(--istok-tabs-item-line-underline-color)':
            isActive,
          'bg-(--istok-tabs-item-bg-active)': isActive && !disabled,
          'bg-(--istok-tabs-item-bg-disabled-active)':
            isActive && disabled,
          'bg-(--istok-tabs-item-bg-disabled)': !isActive && disabled,
        },
        className,
      )}
    >
      {/* Left Icon */}
      {StartIcon && (
        <div className="shrink-0">
          <StartIcon
            {...startIconProps}
            className={cn(
              'istok-tab-item__start-icon',
              'size-(--istok-tabs-item-icon-size)',
              !disabled
              && !isActive
              && 'text-(--istok-tabs-item-icon-color)',
              !disabled
              && isActive
              && 'text-(--istok-tabs-item-icon-color-active)',
              disabled
              && !isActive
              && 'text-(--istok-tabs-item-icon-color-disabled)',
              disabled
              && isActive
              && 'text-(--istok-tabs-item-icon-color-disabled-active)',
              startIconProps?.className,
            )}
          />
        </div>
      )}

      {/* Text Content */}
      {label && (
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <span
            className={cn(
              'istok-tab-item__label w-full truncate',
              `
                text-(length:--istok-tabs-item-label-font-size)
                leading-(--istok-tabs-item-label-line-height)
              `,
              !disabled
              && !isActive
              && 'text-(--istok-tabs-item-label-color)',
              !disabled
              && isActive
              && 'text-(--istok-tabs-item-label-color-active)',
              disabled
              && !isActive
              && 'text-(--istok-tabs-item-label-color-disabled)',
              disabled
              && isActive
              && 'text-(--istok-tabs-item-label-color-disabled-active)',
            )}
          >
            {label}
          </span>
        </div>
      )}
    </button>
  );
}

export const TabItem = TabItemComponent as TabItemFC;
