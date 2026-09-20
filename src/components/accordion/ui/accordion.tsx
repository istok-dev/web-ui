'use client';

import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import {
  createContext,
  use,
  useRef,
  useState,
  type ComponentProps,
  type FC,
  type MouseEvent,
} from 'react';

import { cn } from '@/utils/cn';

import type {
  AccordionItemProps,
  AccordionRootProps,
  AccordionSize,
  AccordionValue,
} from '../accordion.types';

const sizeClassesMap: Record<AccordionSize, string> = {
  sm: 'istok-accordion--sm',
  md: 'istok-accordion--md',
};

const AccordionContext = createContext<{ size: AccordionSize }>({
  size: 'md',
});

function AccordionRoot({
  children,
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  size = 'md',
}: AccordionRootProps) {
  const [internalValue, setInternalValue]
    = useState<AccordionValue>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: AccordionValue) => {
    if (!isControlled) setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <AccordionContext value={{ size }}>
      <div
        className={cn(
          'istok-accordion',
          'istok-accordion--default',
          sizeClassesMap[size],
          className,
        )}
      >
        <BaseAccordion.Root
          className="flex flex-col gap-2"
          {...(isControlled
            ? {
              value,
              onValueChange: handleValueChange,
            }
            : {
              defaultValue,
              onValueChange: handleValueChange,
            }) as Partial<ComponentProps<typeof BaseAccordion.Root>>}
          multiple={multiple}
        >
          {children}
        </BaseAccordion.Root>
      </div>
    </AccordionContext>
  );
}

const AccordionItemComponent: FC<AccordionItemProps> = ({
  value: itemValue,
  title,
  description,
  icon: Icon,
  iconProps,
  children,
  className,
}) => {
  const { size } = use(AccordionContext);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleItemClick = (event: MouseEvent<HTMLDivElement>) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    if (trigger.contains(event.target as Node)) return;

    trigger.click();
  };

  return (
    <BaseAccordion.Item
      value={itemValue}
      onClick={handleItemClick}
      className={cn(
        'istok-accordion__item',
        sizeClassesMap[size],
        'istok-accordion--default',
        'cursor-pointer',
        'bg-(--istok-accordion-item-bg)',
        'rounded-(--istok-accordion-item-radius)',
        'p-(--istok-accordion-item-padding)',
        'shadow-(--istok-accordion-item-shadow)',
        'hover:shadow-(--istok-accordion-item-shadow-hover)',
        '[transition:box-shadow_150ms_ease]',
        className,
      )}
    >
      <BaseAccordion.Header className="m-0">
        <BaseAccordion.Trigger
          ref={triggerRef}
          className={cn(
            'istok-accordion__trigger group',
            'flex w-full cursor-pointer items-center',
            'gap-(--istok-accordion-header-gap)',
            'text-left outline-none',
            'focus-visible:[box-shadow:inset_0_0_0_2px_var(--focus-ring-color)]',
          )}
        >
          {Icon && (
            <Icon
              {...iconProps}
              className={cn(
                'istok-accordion__leading-icon shrink-0',
                'size-(--istok-accordion-icon-size)',
                'text-(--istok-accordion-icon-fg)',
                iconProps?.className,
              )}
            />
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span
              className={cn(
                'istok-accordion__title',
                'flex min-w-0 items-center gap-3',
                `
                  text-(length:--istok-accordion-title-font-size)
                  leading-(--istok-accordion-title-line-height)
                  font-(--istok-accordion-title-font-weight)
                  tracking-(--istok-accordion-title-letter-spacing)
                  text-(--istok-accordion-title-fg)
                `,
              )}
            >
              {title}
            </span>
            {description != null && description !== '' && (
              <span
                className={cn(
                  'istok-accordion__description',
                  `
                    text-(length:--istok-accordion-description-font-size)
                    leading-(--istok-accordion-description-line-height)
                    text-(--istok-accordion-description-fg)
                  `,
                )}
              >
                {description}
              </span>
            )}
          </div>

          <span
            aria-hidden
            className={cn(
              'istok-accordion__icon inline-flex shrink-0',
              'size-(--istok-accordion-icon-size)',
              'text-(--istok-accordion-icon-fg)',
              'rotate-0 [transition:transform_150ms_ease]',
              'group-data-panel-open:rotate-180',
            )}
          >
            <ChevronDown className="size-full" strokeWidth={1.9} />
          </span>
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>

      <BaseAccordion.Panel>
        <div
          className={cn(
            'istok-accordion__content',
            `
              pt-(--istok-accordion-item-gap)
              text-(length:--istok-accordion-content-font-size)
              leading-(--istok-accordion-content-line-height)
              text-(--istok-accordion-content-fg)
            `,
          )}
        >
          {children}
        </div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
};

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItemComponent,
});
