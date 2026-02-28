import React from "react";
import { House } from "lucide-react";
import { isNil } from "lodash-es";

import { cn } from "@/utils/cn";

import { BreadcrumbsProps, BreadcrumbsSize } from "../breadcrumbs.types";

const sizeClassesMap: Record<BreadcrumbsSize, string> = {
  l: "istok-breadcrumbs--l",
  m: "istok-breadcrumbs--m",
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  defaultSize = "m",
  maxItems,
  Link,
}) => {
  const LinkComponent = Link || "a";

  const showEllipsis =
    typeof maxItems === "number" &&
    maxItems >= 1 &&
    items.length > maxItems - 1;
  const visibleItems = showEllipsis ? items.slice(-(maxItems - 1)) : items;

  const itemClassName = cn(
    "istok-breadcrumbs__item",
    "py-[var(--istok-breadcrumbs-item-padding-y)] px-[var(--istok-breadcrumbs-item-padding-x)]",
    "rounded-xl font-medium",
    "text-(length:--istok-breadcrumbs-item-font-size) leading-[var(--istok-breadcrumbs-item-line-height)]",
    "text-neutral-400",
    "transition-colors"
  );

  const itemActiveClassName = cn(
    itemClassName,
    "istok-breadcrumbs__item--active",
    "cursor-pointer",
    "hover:bg-brand-200 hover:text-brand-700"
  );

  const separatorClassName = cn(
    "istok-breadcrumbs__separator",
    "flex items-center justify-center font-medium",
    "size-[var(--istok-breadcrumbs-separator-size)]",
    "text-(length:--istok-breadcrumbs-separator-font-size)",
    "text-neutral-400"
  );

  return (
    <div
      className={cn(
        "istok-breadcrumbs",
        "flex items-center flex-wrap",
        sizeClassesMap[defaultSize],
        className
      )}
    >
      <LinkComponent
        href="/"
        aria-label="Главная"
        className={itemActiveClassName}
      >
        <House
          className={cn(
            "istok-breadcrumbs__icon shrink-0",
            "size-[var(--istok-breadcrumbs-icon-size)]"
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
        <React.Fragment
          key={
            showEllipsis ? items.length - visibleItems.length + index : index
          }
        >
          {!isNil(item.href) ? (
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
          ) : (
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
        </React.Fragment>
      ))}
    </div>
  );
};
