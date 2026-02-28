import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";

import { Button } from "./ui/button";
import type { ButtonVariant, ButtonSize } from "./button.types";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "neutral",
        "clear",
        "clear-inverse",
        "opacity",
        "outline",
        "negative",
      ] as ButtonVariant[],
      description: "Визуальный вариант кнопки",
    },
    defaultSize: {
      control: "select",
      options: ["s", "m", "l"] as ButtonSize[],
      description: "Размер кнопки",
    },
    disabled: {
      control: "boolean",
      description: "Неактивное состояние",
    },
    loading: {
      control: "boolean",
      description: "Состояние загрузки",
    },
    children: {
      control: "text",
      description: "Текст кнопки",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Кнопка",
    variant: "primary",
    defaultSize: "m",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="neutral">Neutral</Button>
      <Button variant="clear">Clear</Button>
      <Button variant="clear-inverse">Clear Inverse</Button>
      <Button variant="opacity">Opacity</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="negative">Negative</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button defaultSize="s">Small</Button>
      <Button defaultSize="m">Medium</Button>
      <Button defaultSize="l">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: "Добавить",
    startIcon: Plus,
    iconSize: 18,
  },
};

export const Loading: Story = {
  args: {
    children: "Загрузка...",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Недоступно",
    disabled: true,
  },
};
