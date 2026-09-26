'use client';

import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { ChevronDown } from 'lucide-react';
import { useRef, type FC, type MouseEvent } from 'react';

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

/** Base UI ожидает массив; строка — сокращённая запись для одного пункта. */
const toArray = (value: AccordionValue): string[] | undefined => {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
};

function AccordionRoot({
  children,
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  keepMounted = false,
  size = 'md',
}: AccordionRootProps) {
  return (
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
        value={toArray(controlledValue)}
        defaultValue={toArray(defaultValue)}
        onValueChange={(next: string[]) => onValueChange?.(next)}
        multiple={multiple}
        keepMounted={keepMounted}
      >
        {children}
      </BaseAccordion.Root>
    </div>
  );
}

export const AccordionItem: FC<AccordionItemProps> = ({
  value: itemValue,
  title,
  description,
  icon: Icon,
  iconProps,
  children,
  className,
  pt,
}) => {
  const triggerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { render: titleRender, ...titlePt } = pt?.title ?? {};
  const { className: headerClassName, ...headerPt } = pt?.header ?? {};
  const {
    className: triggerClassName,
    render: triggerRender,
    nativeButton: triggerNativeButton,
    ...triggerPt
  } = pt?.trigger ?? {};
  const { className: panelClassName, ...panelPt } = pt?.panel ?? {};

  const handleItemClick = (event: MouseEvent<HTMLDivElement>) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const target = event.target as Node;
    // Клик по отступам карточки вокруг заголовка открывает/закрывает пункт,
    // а клики внутри контента (поля, ссылки, выделение текста) — нет.
    if (trigger.contains(target) || panelRef.current?.contains(target)) return;

    trigger.click();
  };

  const titleElement = useRender({
    defaultTagName: 'span',
    render: titleRender,
    props: mergeProps<'span'>(
      {
        className: cn(
          'istok-accordion__title',
          'flex min-w-0 items-center gap-3',
          `
            text-(length:--istok-accordion-title-font-size)
            leading-(--istok-accordion-title-line-height)
            font-(--istok-accordion-title-font-weight)
            tracking-(--istok-accordion-title-letter-spacing)
            text-(--istok-accordion-title-fg)
          `,
        ),
        children: title,
      },
      titlePt,
    ),
  });

  return (
    <BaseAccordion.Item
      value={itemValue}
      onClick={handleItemClick}
      className={cn(
        'istok-accordion__item',
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
      <BaseAccordion.Header
        {...headerPt}
        className={cn('m-0', headerClassName)}
      >
        <BaseAccordion.Trigger
          {...triggerPt}
          ref={triggerRef}
          render={triggerRender}
          nativeButton={triggerNativeButton ?? triggerRender === undefined}
          className={cn(
            'istok-accordion__trigger group',
            'flex w-full cursor-pointer items-center',
            'gap-(--istok-accordion-header-gap)',
            'text-left outline-none',
            'focus-visible:[box-shadow:inset_0_0_0_2px_var(--focus-ring-color)]',
            triggerClassName,
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
            {titleElement}
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

      <BaseAccordion.Panel
        {...panelPt}
        ref={panelRef}
        className={cn(
          'istok-accordion__content cursor-auto',
          `
            pt-(--istok-accordion-item-gap)
            text-(length:--istok-accordion-content-font-size)
            leading-(--istok-accordion-content-line-height)
            text-(--istok-accordion-content-fg)
          `,
          panelClassName,
        )}
      >
        {children}
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
};

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
});
