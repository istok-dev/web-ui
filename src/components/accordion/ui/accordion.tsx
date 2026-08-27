import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import {
  ChevronDown,
} from 'lucide-react';
import {
  createContext,
  use,
  useState,
  type ComponentProps,
  type FC,
} from 'react';

import { cn } from '@/utils/cn';

import type {
  AccordionItemProps,
  AccordionRootProps,
  AccordionSize,
  AccordionValue,
} from '../accordion.types';

const sizeClassesMap: Record<AccordionSize, string> = {
  lg: 'istok-accordion--lg',
  md: 'istok-accordion--md',
  sm: 'istok-accordion--sm',
};

const AccordionContext = createContext<{ size: AccordionSize }>({
  size: 'lg',
});

function AccordionRoot({
  children,
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  size = 'lg',
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
          className="flex flex-col gap-(--istok-accordion-gap)"
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

  return (
    <BaseAccordion.Item
      value={itemValue}
      className={cn(
        'istok-accordion__item',
        sizeClassesMap[size],
        'istok-accordion--default',
        `
          border-b border-(--istok-accordion-divider) bg-(--istok-accordion-bg)
          px-(--istok-accordion-padding-inline)
          py-(--istok-accordion-padding-block)
          last:border-b-0
        `,
        className,
      )}
    >
      <BaseAccordion.Header>
        <BaseAccordion.Trigger
          className={cn(
            'istok-accordion__trigger group',
            'flex w-full cursor-pointer items-start',
            'gap-(--istok-accordion-header-gap)',
            'text-left outline-none',
          )}
        >
          {Icon && (
            <Icon
              {...iconProps}
              className={cn(
                'istok-accordion__icon shrink-0',
                'size-(--istok-accordion-icon-size)',
                'text-(--istok-accordion-icon-fg)',
                'mt-0.5',
                iconProps?.className,
              )}
            />
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'istok-accordion__title',
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
            </div>
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

          <ChevronDown
            className={cn(
              'istok-accordion__chevron shrink-0',
              'size-(--istok-accordion-chevron-size)',
              'text-(--istok-accordion-chevron-fg)',
              'mt-0.5 transition-transform duration-200',
              'group-data-panel-open:rotate-180',
            )}
          />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>

      <BaseAccordion.Panel>
        <div
          className={cn(
            'istok-accordion__content',
            `
              pt-(--istok-accordion-content-pt)
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
