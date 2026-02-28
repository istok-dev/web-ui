import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, Tag, X } from "lucide-react";

import { Badge } from "./index";
import { Tooltip } from "../tooltip";
import type { BadgeSize, BadgeVariant, BadgeShape } from "./badge.types";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Текст бейджа",
    },
    defaultSize: {
      control: "select",
      options: ["s", "m", "l"] as BadgeSize[],
      description: "Размер бейджа",
    },
    variant: {
      control: "select",
      options: [
        "solid-brand",
        "solid-neutral",
        "ghost-brand",
        "ghost-neutral",
        "opacity-brand",
        "outline-brand",
      ] as BadgeVariant[],
      description: "Вариант оформления",
    },
    shape: {
      control: "select",
      options: ["square", "rounded"] as BadgeShape[],
      description: "Форма бейджа",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: "Бейдж",
    defaultSize: "m",
    variant: "solid-brand",
    shape: "square",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge label="Маленький" defaultSize="s" />
      <Badge label="Средний" defaultSize="m" />
      <Badge label="Большой" defaultSize="l" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge label="solid-brand" variant="solid-brand" />
      <Badge label="solid-neutral" variant="solid-neutral" />
      <Badge label="ghost-brand" variant="ghost-brand" />
      <Badge label="ghost-neutral" variant="ghost-neutral" />
      <Badge label="opacity-brand" variant="opacity-brand" />
      <Badge label="outline-brand" variant="outline-brand" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge label="Квадратный" shape="square" />
      <Badge label="Скруглённый" shape="rounded" />
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    label: "С иконкой",
    startIcon: Tag,
    defaultSize: "m",
    variant: "solid-brand",
  },
};

export const WithIconAllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge label="Категория" startIcon={Tag} variant="solid-brand" />
      <Badge label="Метка" startIcon={Tag} variant="ghost-brand" />
      <Badge label="Тег" startIcon={Tag} variant="outline-brand" />
    </div>
  ),
};

export const WithEndAdornment: Story = {
  args: {
    label: "С элементом справа",
    endAdornment: <X size={14} />,
    defaultSize: "m",
    variant: "solid-brand",
  },
};

export const WithEndAdornmentExamples: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge
        label="Закрыть"
        endAdornment={<X size={14} />}
        variant="solid-brand"
      />
      <Badge
        label="5"
        endAdornment={<span className="ml-1">шт</span>}
        variant="ghost-brand"
      />
      <Badge
        label="Новое"
        endAdornment={<span className="ml-1 text-xs">!</span>}
        variant="outline-brand"
      />
    </div>
  ),
};

export const WithStartIconAndEndAdornment: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge
        label="Тег"
        startIcon={Tag}
        endAdornment={<X size={14} />}
        variant="solid-brand"
      />
      <Badge
        label="Категория"
        startIcon={Tag}
        endAdornment={<span className="ml-1 text-xs">×</span>}
        variant="ghost-brand"
      />
    </div>
  ),
};

export const WithEndAdornmentTooltip: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge
        label="Подсказка"
        endAdornment={
          <Tooltip
            description="Дополнительная информация о бейдже"
            placement="top"
            open
          >
            <span className="inline-flex cursor-help">
              <Info size={14} />
            </span>
          </Tooltip>
        }
        variant="solid-brand"
      />
      <Badge
        label="Закрыть"
        endAdornment={
          <Tooltip description="Удалить этот тег" placement="top">
            <span className="inline-flex cursor-pointer">
              <X size={14} />
            </span>
          </Tooltip>
        }
        variant="ghost-brand"
      />
    </div>
  ),
};
