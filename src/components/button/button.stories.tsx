import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";

import { Button } from "./ui/button";
import type { ButtonVariant, ButtonSize, ButtonColor } from "./button.types";

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
        "clear",
        "text",
        "clear-inverse",
        "opacity",
        "outline",
      ] as ButtonVariant[],
      description: "Визуальный вариант кнопки",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "neutral",
        "negative",
        "warning",
        "info",
        "success",
        "accent",
      ] as ButtonColor[],
      description: "Цветовая палитра кнопки",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"] as ButtonSize[],
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
    rounded: {
      control: "boolean",
      description: "Полностью скруглённая кнопка (pill)",
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
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="clear">Clear</Button>
      <Button variant="text">Text</Button>
      <Button variant="clear-inverse">Clear Inverse</Button>
      <Button variant="opacity">Opacity</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};

const buttonColors: ButtonColor[] = [
  "primary",
  "neutral",
  "negative",
  "warning",
  "info",
  "success",
  "accent",
];

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--color-neutral-600)]">
          variant="primary"
        </h3>
        <div className="flex flex-wrap gap-4">
          {buttonColors.map((color) => (
            <Button key={color} variant="primary" color={color}>
              {color}
            </Button>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--color-neutral-600)]">
          variant="secondary"
        </h3>
        <div className="flex flex-wrap gap-4">
          {buttonColors.map((color) => (
            <Button key={color} variant="secondary" color={color}>
              {color}
            </Button>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--color-neutral-600)]">
          variant="outline"
        </h3>
        <div className="flex flex-wrap gap-4">
          {buttonColors.map((color) => (
            <Button key={color} variant="outline" color={color}>
              {color}
            </Button>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--color-neutral-600)]">
          variant="clear"
        </h3>
        <div className="flex flex-wrap gap-4">
          {buttonColors.map((color) => (
            <Button key={color} variant="clear" color={color}>
              {color}
            </Button>
          ))}
        </div>
      </section>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button rounded>Rounded</Button>
      <Button rounded variant="outline">
        Outline rounded
      </Button>
      <Button rounded size="sm">
        Small rounded
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: "Добавить",
    startIcon: Plus,
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
