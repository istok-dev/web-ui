export type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

export type BreadcrumbsMobileLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type BreadcrumbsSize = 'l' | 'm';

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  defaultSize?: BreadcrumbsSize;
  maxItems?: number;
  Link?: React.ComponentType<{
    'href': string;
    'className'?: string;
    'children'?: React.ReactNode;
    'aria-label'?: string;
  }>;
  mobileLink?: BreadcrumbsMobileLink;
};
