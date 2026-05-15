import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState, type ComponentProps } from 'react';

import { cn } from '@/utils/cn';

import type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionValue,
} from '../accordion.types';

function AccordionRoot({
  children,
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
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
    <div className={className}>
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
  );
}

function AccordionItemComponent({
  value: itemValue,
  title,
  icon: Icon,
  iconProps,
  children,
  className,
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      value={itemValue}
      className={cn('rounded-2xl border border-neutral-200 p-6', className)}
    >
      <BaseAccordion.Header>
        <BaseAccordion.Trigger className="
          group flex w-full cursor-pointer items-center justify-between
        "
        >
          <div className="flex items-center gap-3">
            {Icon && (
              <Icon
                size={24}
                {...iconProps}
                className={cn('text-neutral-950', iconProps?.className)}
              />
            )}
            <h4 className="text-title-lg font-medium text-primary-800">
              {title}
            </h4>
          </div>
          <ChevronDown
            size={24}
            className="
              text-neutral-900
              group-data-[state=open]:hidden
            "
          />
          <ChevronUp
            size={24}
            className="
              hidden text-neutral-900
              group-data-[state=open]:block
            "
          />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel>
        <div className="mt-4 text-body-lg leading-relaxed text-neutral-800">
          {children}
        </div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItemComponent,
});
