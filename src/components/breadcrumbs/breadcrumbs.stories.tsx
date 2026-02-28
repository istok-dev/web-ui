import type { Meta, StoryObj } from "@storybook/react-vite";
import { FolderOpen, FileText } from "lucide-react";

import { Breadcrumbs } from "./ui/breadcrumbs";
import type { BreadcrumbsSize } from "./breadcrumbs.types";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultSize: {
      control: "select",
      options: ["m", "l"] as BreadcrumbsSize[],
      description: "Размер хлебных крошек",
    },
    items: {
      description: "Пункты навигации (последний без href — текущая страница)",
    },
    maxItems: {
      control: { type: "number", min: 1 },
      description:
        "Макс. видимых пунктов после Home: скрытые заменяются на «…». Например 2 = Home, …, последний",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const defaultItems = [
  { label: "Разделы" },
  { label: "Документы", href: "/docs" },
  { label: "Текущая страница" },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    defaultSize: "m",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-body-s text-neutral-500 mb-2">Size M</p>
        <Breadcrumbs items={defaultItems} defaultSize="m" />
      </div>
      <div>
        <p className="text-body-s text-neutral-500 mb-2">Size L</p>
        <Breadcrumbs items={defaultItems} defaultSize="l" />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: "Папка", href: "/folder", icon: <FolderOpen className="size-4" /> },
      { label: "Документ", icon: <FileText className="size-4" /> },
    ],
    defaultSize: "m",
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: "Главная" }],
    defaultSize: "m",
  },
};

const longPathItems = [
  { label: "Главная", href: "/" },
  { label: "Каталог", href: "/catalog" },
  { label: "Категория", href: "/catalog/category" },
  { label: "Подкатегория", href: "/catalog/category/sub" },
  { label: "Текущая страница" },
];

export const LongPath: Story = {
  args: {
    items: longPathItems,
    defaultSize: "m",
  },
};

export const MaxItems: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-body-s text-neutral-500 mb-2">maxItems=2 (Home — … — последний)</p>
        <Breadcrumbs items={longPathItems} defaultSize="m" maxItems={2} />
      </div>
      <div>
        <p className="text-body-s text-neutral-500 mb-2">maxItems=3 (Home — … — два последних)</p>
        <Breadcrumbs items={longPathItems} defaultSize="m" maxItems={3} />
      </div>
      <div>
        <p className="text-body-s text-neutral-500 mb-2">maxItems=4 (Home — … — три последних)</p>
        <Breadcrumbs items={longPathItems} defaultSize="m" maxItems={4} />
      </div>
    </div>
  ),
};
