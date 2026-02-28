import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Search, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "./index";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Значение инпута",
    },
    onChange: {
      control: false,
      description: "Колбэк при изменении значения",
    },
    placeholder: {
      control: "text",
      description: "Плейсхолдер",
    },
    defaultSize: {
      control: "select",
      options: ["s", "m", "l"],
      description: "Размер инпута",
    },
    variant: {
      control: "select",
      options: ["neutral", "solid", "outline", "opacity"],
      description: "Вариант стиля инпута",
    },
    startIcon: {
      control: false,
      description: "Иконка слева",
    },
    startAdornment: {
      control: false,
      description: "Элемент слева",
    },
    endAdornment: {
      control: false,
      description: "Элемент справа",
    },
    disabled: {
      control: "boolean",
      description: "Заблокированное состояние",
    },
    className: {
      control: "text",
      description: "Дополнительные классы для контейнера",
    },
    inputClassName: {
      control: "text",
      description: "Дополнительные классы для инпута",
    },
    readOnly: {
      control: "boolean",
      description: "Доступно только для чтения",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="w-80">
        <Input {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: "Введите текст",
    defaultSize: "m",
    variant: "neutral",
  },
};

export const WithPlaceholder: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="w-80">
        <Input {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: "Поиск...",
    defaultSize: "m",
    variant: "neutral",
  },
};

export const WithStartIcon: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="w-80">
        <Input {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: "Поиск...",
    startIcon: Search,
    defaultSize: "m",
    variant: "neutral",
  },
};

export const WithStartAdornment: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="w-80">
        <Input {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: "Введите имя",
    startAdornment: <User className="w-4 h-4 text-neutral-400" />,
    defaultSize: "m",
    variant: "neutral",
  },
};

export const WithEndAdornment: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-80">
        <Input
          {...args}
          value={value}
          onChange={setValue}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-neutral-400 hover:text-neutral-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
        />
      </div>
    );
  },
  args: {
    placeholder: "Введите пароль",
    startIcon: Lock,
    defaultSize: "m",
    variant: "neutral",
  },
};

export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");

    return (
      <div className="w-80 flex flex-col gap-4">
        <Input
          value={value1}
          onChange={setValue1}
          placeholder="Маленький размер"
          defaultSize="s"
        />
        <Input
          value={value2}
          onChange={setValue2}
          placeholder="Средний размер (по умолчанию)"
          defaultSize="m"
        />
        <Input
          value={value3}
          onChange={setValue3}
          placeholder="Большой размер"
          defaultSize="l"
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [value4, setValue4] = useState("");

    return (
      <div className="w-80 flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Neutral</label>
          <Input
            value={value1}
            onChange={setValue1}
            placeholder="Neutral вариант"
            variant="neutral"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Solid</label>
          <Input
            value={value2}
            onChange={setValue2}
            placeholder="Solid вариант"
            variant="solid"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Outline</label>
          <Input
            value={value3}
            onChange={setValue3}
            placeholder="Outline вариант"
            variant="outline"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Opacity</label>
          <Input
            value={value4}
            onChange={setValue4}
            placeholder="Opacity вариант"
            variant="opacity"
            className="bg-gray-800"
          />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="w-80 flex flex-col gap-4">
        <Input
          {...args}
          value={value}
          onChange={setValue}
          disabled
          placeholder="Заблокированный инпут"
        />
        <Input
          {...args}
          value="Заблокированное значение"
          onChange={setValue}
          disabled
          startIcon={Search}
        />
      </div>
    );
  },
  args: {
    defaultSize: "m",
    variant: "neutral",
  },
};

export const WithInitialValue: Story = {
  render: (args) => {
    const [value, setValue] = useState("Начальное значение");

    return (
      <div className="w-80">
        <Input {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: "Введите текст",
    defaultSize: "m",
    variant: "neutral",
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [search, setSearch] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-80 flex flex-col gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Email
          </label>
          <Input
            value={email}
            onChange={setEmail}
            placeholder="example@mail.com"
            startIcon={Mail}
            defaultSize="m"
            variant="solid"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Пароль
          </label>
          <Input
            value={password}
            onChange={setPassword}
            placeholder="Введите пароль"
            startIcon={Lock}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
            defaultSize="m"
            variant="solid"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Поиск
          </label>
          <Input
            value={search}
            onChange={setSearch}
            placeholder="Поиск..."
            startIcon={Search}
            defaultSize="m"
            variant="outline"
          />
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm font-semibold mb-2">Введенные данные:</p>
          {email && <p className="text-sm text-gray-600">Email: {email}</p>}
          {password && (
            <p className="text-sm text-gray-600">
              Пароль: {showPassword ? password : "••••••••"}
            </p>
          )}
          {search && <p className="text-sm text-gray-600">Поиск: {search}</p>}
        </div>
      </div>
    );
  },
};
