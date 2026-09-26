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

export const BREADCRUMBS_SIZES = ['md', 'lg'] as const;

export type BreadcrumbsSize = (typeof BREADCRUMBS_SIZES)[number];

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  size?: BreadcrumbsSize;
  maxItems?: number;
  Link?: React.ComponentType<{
    'href': string;
    'className'?: string;
    'children'?: React.ReactNode;
    'aria-label'?: string;
  }>;
  mobileLink?: BreadcrumbsMobileLink;
};
