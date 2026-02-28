import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Filter } from "lucide-react";

import { Select } from "./index";
import type { SelectOption, SelectGroup } from "./select.types";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["s", "m", "l"] as const,
      description: "Размер селекта",
    },
    multiple: {
      control: "boolean",
      description: "Множественный выбор",
    },
    searchable: {
      control: "boolean",
      description: "Включить поиск",
    },
    showSelectAll: {
      control: "boolean",
      description: "Показать кнопку 'Выбрать все'",
    },
    showClear: {
      control: "boolean",
      description: "Показать кнопку 'Сбросить'",
    },
    disabled: {
      control: "boolean",
      description: "Неактивное состояние",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const simpleOptions: SelectOption[] = [
  { label: "Группа A", value: "group-a" },
  { label: "Группа B", value: "group-b" },
  { label: "Группа C", value: "group-c" },
  { label: "Группа D", value: "group-d" },
];

const categoryOptions: SelectOption[] = [
  {
    label: "Категория с очень длинным названием, которое не поместится в инпут",
    value: "category-long",
  },
  { label: "Категория 2", value: "category-2" },
  { label: "Категория 3", value: "category-3" },
  { label: "Категория 4", value: "category-4" },
  { label: "Категория 5", value: "category-5" },
];

const optionsWithDisabled: SelectOption[] = [
  { label: "Группа A", value: "group-a" },
  { label: "Группа B", value: "group-b", disabled: true },
  { label: "Группа C", value: "group-c" },
  { label: "Группа D", value: "group-d", disabled: true },
];

const groupedOptions: SelectGroup[] = [
  {
    label: "Онлайн-каналы",
    options: [
      { label: "Площадка 1", value: "platform-1" },
      { label: "Площадка 2", value: "platform-2" },
      { label: "Площадка 3", value: "platform-3" },
    ],
  },
  {
    label: "Офлайн-каналы",
    options: [
      { label: "Сеть 1", value: "network-1" },
      { label: "Сеть 2", value: "network-2" },
      { label: "Сеть 3", value: "network-3" },
      { label: "Сеть 4", value: "network-4" },
    ],
  },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-[400px]">
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    label: "Группы",
    placeholder: "Выберите...",
    options: simpleOptions,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: "m",
  },
};

export const SingleSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-[400px]">
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={categoryOptions}
        />
      </div>
    );
  },
  args: {
    label: "Категории",
    placeholder: "Выберите категорию",
    options: categoryOptions,
    multiple: false,
    searchable: true,
    showSelectAll: false,
    showClear: false,
    size: "m",
  },
};

export const WithGroups: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-[400px]">
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={groupedOptions}
        />
      </div>
    );
  },
  args: {
    label: "Источники",
    placeholder: "Выберите источники",
    options: groupedOptions,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: "m",
  },
};

export const Sizes: Story = {
  render: () => {
    const [s, setS] = useState<SelectOption[]>([]);
    const [m, setM] = useState<SelectOption[]>([]);
    const [l, setL] = useState<SelectOption[]>([]);
    return (
      <div className="flex flex-col gap-6 w-[400px]">
        <div>
          <p className="mb-2 text-sm text-gray-500">Size S</p>
          <Select
            startIcon={Filter}
            size="s"
            value={s}
            onChange={setS}
            options={simpleOptions}
            label="Маленький"
          />
        </div>
        <div>
          <p className="mb-2 text-sm text-gray-500">Size M</p>
          <Select
            startIcon={Filter}
            size="m"
            value={m}
            onChange={setM}
            options={simpleOptions}
            label="Средний"
          />
        </div>
        <div>
          <p className="mb-2 text-sm text-gray-500">Size L</p>
          <Select
            startIcon={Filter}
            size="l"
            value={l}
            onChange={setL}
            options={simpleOptions}
            label="Большой"
          />
        </div>
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-[400px]">
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    label: "Фильтр",
    placeholder: "Выберите...",
    options: simpleOptions,
    startIcon: Filter,
    multiple: true,
    searchable: true,
    size: "m",
  },
};

export const WithoutSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-[400px]">
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    label: "Группы",
    placeholder: "Выберите...",
    options: simpleOptions,
    multiple: true,
    searchable: false,
    showSelectAll: true,
    showClear: true,
    size: "m",
  },
};

export const WithoutActions: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-[400px]">
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    label: "Группы",
    placeholder: "Выберите...",
    options: simpleOptions,
    multiple: true,
    searchable: true,
    showSelectAll: false,
    showClear: false,
    size: "m",
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-[400px]">
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    label: "Группы",
    placeholder: "Выберите...",
    options: simpleOptions,
    multiple: true,
    disabled: true,
    size: "m",
  },
};

export const DisabledItems: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-[400px]">
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={optionsWithDisabled}
        />
      </div>
    );
  },
  args: {
    label: "Группы",
    placeholder: "Выберите...",
    options: optionsWithDisabled,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: "m",
  },
};

export const WithSelectedValues: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([
      simpleOptions[0],
      simpleOptions[1],
    ]);
    return (
      <div className="w-[400px]">
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    label: "Группы",
    placeholder: "Выберите...",
    options: simpleOptions,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: "m",
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [groups, setGroups] = useState<SelectOption[]>([simpleOptions[0]]);
    const [categories, setCategories] = useState<SelectOption[]>([]);
    const [channels, setChannels] = useState<SelectOption[]>([]);
    const [sources, setSources] = useState<SelectOption[]>([]);

    return (
      <div className="flex flex-col gap-6 w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Группы"
            placeholder="Выберите группы"
            options={simpleOptions}
            value={groups}
            onChange={setGroups}
            multiple={true}
            searchable={true}
            showSelectAll={true}
            showClear={true}
            size="m"
          />
          <Select
            label="Категории"
            placeholder="Выберите категории"
            options={categoryOptions}
            value={categories}
            onChange={setCategories}
            multiple={true}
            searchable={true}
            showSelectAll={true}
            showClear={true}
            size="m"
          />
          <Select
            label="Онлайн-каналы"
            placeholder="Выберите каналы"
            options={groupedOptions[0].options}
            value={channels}
            onChange={setChannels}
            multiple={true}
            searchable={true}
            showSelectAll={true}
            showClear={true}
            size="m"
          />
          <Select
            label="Источники"
            placeholder="Выберите источники"
            options={groupedOptions}
            value={sources}
            onChange={setSources}
            multiple={true}
            searchable={true}
            showSelectAll={true}
            showClear={true}
            size="m"
          />
        </div>
      </div>
    );
  },
};
