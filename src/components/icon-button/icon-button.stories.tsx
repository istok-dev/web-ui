import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus, Settings, Trash2 } from "lucide-react";

import { IconButton } from "./ui/icon-button";
import type {
  IconButtonVariant,
  IconButtonSize,
  IconButtonShape,
} from "./icon-button.types";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      description: "Иконка (Lucide)",
      table: {
        type: { summary: "LucideIcon" },
        disable: true,
      },
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "clear",
        "clear-inverse",
        "opacity",
      ] as IconButtonVariant[],
      description: "Визуальный вариант",
    },
    shape: {
      control: "select",
      options: ["circle", "square"] as IconButtonShape[],
      description: "Форма кнопки",
    },
    defaultSize: {
      control: "select",
      options: ["s", "m", "l"] as IconButtonSize[],
      description: "Размер",
    },
    disabled: {
      control: "boolean",
      description: "Неактивное состояние",
    },
    loading: {
      control: "boolean",
      description: "Состояние загрузки",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: Plus,
    variant: "primary",
    shape: "circle",
    defaultSize: "m",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <IconButton icon={Plus} variant="primary" aria-label="Primary" />
      <IconButton icon={Plus} variant="secondary" aria-label="Secondary" />
      <IconButton icon={Plus} variant="clear" aria-label="Clear" />
      <IconButton
        icon={Plus}
        variant="clear-inverse"
        className="bg-brand-600"
        aria-label="Clear inverse"
      />
      <IconButton
        icon={Plus}
        variant="opacity"
        className="bg-brand-600"
        aria-label="Opacity"
      />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <IconButton icon={Settings} shape="circle" aria-label="Circle" />
      <IconButton icon={Settings} shape="square" aria-label="Square" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <IconButton icon={Trash2} defaultSize="s" aria-label="Small" />
      <IconButton icon={Trash2} defaultSize="m" aria-label="Medium" />
      <IconButton icon={Trash2} defaultSize="l" aria-label="Large" />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    icon: Plus,
    loading: true,
    "aria-label": "Loading",
  },
};

export const Disabled: Story = {
  args: {
    icon: Plus,
    disabled: true,
    "aria-label": "Disabled",
  },
};
