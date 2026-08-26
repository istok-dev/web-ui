import type { Meta, StoryObj } from '@storybook/react-vite';
import { FolderOpen, FileText } from 'lucide-react';

import type { BreadcrumbsSize } from './breadcrumbs.types';
import { Breadcrumbs } from './ui/breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg'] as BreadcrumbsSize[],
      description: 'Размер хлебных крошек',
    },
    items: {
      description: 'Пункты навигации (последний без href — текущая страница)',
    },
    maxItems: {
      control: { type: 'number', min: 1 },
      description:
        'Макс. видимых пунктов после Home: скрытые заменяются на «…». Например 2 = Home, …, последний',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const defaultItems = [
  { label: 'Разделы' },
  { label: 'Документы', href: '/docs' },
  { label: 'Текущая страница' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-body-sm text-neutral-500">Size MD</p>
        <Breadcrumbs items={defaultItems} size="md" />
      </div>
      <div>
        <p className="mb-2 text-body-sm text-neutral-500">Size LG</p>
        <Breadcrumbs items={defaultItems} size="lg" />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        label: 'Папка',
        href: '/folder',
        icon: <FolderOpen className="size-4" />,
      },
      { label: 'Документ', icon: <FileText className="size-4" /> },
    ],
    size: 'md',
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Главная' }],
    size: 'md',
  },
};

const longPathItems = [
  { label: 'Главная', href: '/' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Категория', href: '/catalog/category' },
  { label: 'Подкатегория', href: '/catalog/category/sub' },
  { label: 'Текущая страница' },
];

export const LongPath: Story = {
  args: {
    items: longPathItems,
    size: 'md',
  },
};

export const MaxItems: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-body-sm text-neutral-500">
          maxItems=2 (Home — … — последний)
        </p>
        <Breadcrumbs items={longPathItems} size="md" maxItems={2} />
      </div>
      <div>
        <p className="mb-2 text-body-sm text-neutral-500">
          maxItems=3 (Home — … — два последних)
        </p>
        <Breadcrumbs items={longPathItems} size="md" maxItems={3} />
      </div>
      <div>
        <p className="mb-2 text-body-sm text-neutral-500">
          maxItems=4 (Home — … — три последних)
        </p>
        <Breadcrumbs items={longPathItems} size="md" maxItems={4} />
      </div>
    </div>
  ),
};
