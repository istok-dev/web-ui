import type { Meta, StoryObj } from '@storybook/react-vite';
import { Filter } from 'lucide-react';
import React, { useState } from 'react';

import { Select } from './index';
import type { SelectOption, SelectGroup } from './select.types';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'] as const,
      description: 'Размер селекта',
    },
    multiple: {
      control: 'boolean',
      description: 'Множественный выбор',
    },
    searchable: {
      control: 'boolean',
      description: 'Включить поиск',
    },
    showSelectAll: {
      control: 'boolean',
      description: 'Показать кнопку \'Выбрать все\'',
    },
    showClear: {
      control: 'boolean',
      description: 'Показать кнопку \'Сбросить\'',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const simpleOptions: SelectOption[] = [
  { label: 'MIXIT BODY', value: 'mixit-body' },
  { label: 'MIXIT LAB', value: 'mixit-lab' },
  { label: 'MIXIT CARE', value: 'mixit-care' },
  { label: 'MIXIT HOME', value: 'mixit-home' },
];

const categoryOptions: SelectOption[] = [
  {
    label: 'Скрабы для тела очень длинный текст, который не поместится в инпут',
    value: 'scrubs-body',
  },
  { label: 'Лосьоны', value: 'lotions' },
  { label: 'Кремы', value: 'creams' },
  { label: 'Маски', value: 'masks' },
  { label: 'Сыворотки', value: 'serums' },
];

const optionsWithDisabled: SelectOption[] = [
  { label: 'MIXIT BODY', value: 'mixit-body' },
  { label: 'MIXIT LAB', value: 'mixit-lab', disabled: true },
  { label: 'MIXIT CARE', value: 'mixit-care' },
  { label: 'MIXIT HOME', value: 'mixit-home', disabled: true },
];

const groupedOptions: SelectGroup[] = [
  {
    label: 'Маркетплейсы',
    options: [
      { label: 'Ozon', value: 'ozon' },
      { label: 'Wildberries', value: 'wildberries' },
      { label: 'Яндекс.Маркет', value: 'yandex-market' },
    ],
  },
  {
    label: 'Офлайн-сети',
    options: [
      { label: 'Подружка', value: 'podruzhka' },
      { label: 'Рив Гош', value: 'rive-gauche' },
      { label: 'Л\'Этуаль', value: 'letoile' },
      { label: 'Аптеки', value: 'pharmacies' },
    ],
  },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-100">
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
    label: 'Группы отчетности',
    placeholder: 'Выберите...',
    options: simpleOptions,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: 'm',
  },
};

export const SingleSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-100">
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
    label: 'Категории',
    placeholder: 'Выберите категорию',
    options: categoryOptions,
    multiple: false,
    searchable: true,
    showSelectAll: false,
    showClear: false,
    size: 'm',
  },
};

export const WithGroups: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-100">
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
    label: 'Партнеры',
    placeholder: 'Выберите партнеров',
    options: groupedOptions,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: 'm',
  },
};

export const Sizes: Story = {
  render: () => {
    const [s, setS] = useState<SelectOption[]>([]);
    const [m, setM] = useState<SelectOption[]>([]);
    const [l, setL] = useState<SelectOption[]>([]);
    return (
      <div className="flex w-100 flex-col gap-6">
        <div>
          <p className="mb-2 text-body-sm text-neutral-500">Size S</p>
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
          <p className="mb-2 text-body-sm text-neutral-500">Size M</p>
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
          <p className="mb-2 text-body-sm text-neutral-500">Size L</p>
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
      <div className="w-100">
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
    label: 'Фильтр',
    placeholder: 'Выберите...',
    options: simpleOptions,
    startIcon: Filter,
    multiple: true,
    searchable: true,
    size: 'm',
  },
};

export const WithoutSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-100">
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
    label: 'Группы отчетности',
    placeholder: 'Выберите...',
    options: simpleOptions,
    multiple: true,
    searchable: false,
    showSelectAll: true,
    showClear: true,
    size: 'm',
  },
};

export const WithoutActions: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-100">
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
    label: 'Группы отчетности',
    placeholder: 'Выберите...',
    options: simpleOptions,
    multiple: true,
    searchable: true,
    showSelectAll: false,
    showClear: false,
    size: 'm',
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-100">
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
    label: 'Группы отчетности',
    placeholder: 'Выберите...',
    options: simpleOptions,
    multiple: true,
    disabled: true,
    size: 'm',
  },
};

export const DisabledItems: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    return (
      <div className="w-100">
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
    label: 'Группы отчетности',
    placeholder: 'Выберите...',
    options: optionsWithDisabled,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: 'm',
  },
};

export const WithSelectedValues: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([
      simpleOptions[0],
      simpleOptions[1],
    ]);
    return (
      <div className="w-100">
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
    label: 'Группы отчетности',
    placeholder: 'Выберите...',
    options: simpleOptions,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: 'm',
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [reportingGroups, setReportingGroups] = useState<SelectOption[]>([
      simpleOptions[0],
    ]);
    const [categories, setCategories] = useState<SelectOption[]>([]);
    const [marketplaces, setMarketplaces] = useState<SelectOption[]>([]);
    const [partners, setPartners] = useState<SelectOption[]>([]);

    return (
      <div className="flex w-full max-w-6xl flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Группы отчетности"
            placeholder="Выберите группы"
            options={simpleOptions}
            value={reportingGroups}
            onChange={setReportingGroups}
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
            label="Маркетплейсы"
            placeholder="Выберите маркетплейсы"
            options={groupedOptions[0].options}
            value={marketplaces}
            onChange={setMarketplaces}
            multiple={true}
            searchable={true}
            showSelectAll={true}
            showClear={true}
            size="m"
          />
          <Select
            label="Партнеры"
            placeholder="Выберите партнеров"
            options={groupedOptions}
            value={partners}
            onChange={setPartners}
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

export const WithAsyncSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>([]);
    const [options, setOptions] = useState<SelectOption[]>(simpleOptions);

    const handleSearch = (query: string) => {
      const allOptions: SelectOption[] = [
        { label: 'MIXIT BODY', value: 'mixit-body' },
        { label: 'MIXIT LAB', value: 'mixit-lab' },
        { label: 'MIXIT CARE', value: 'mixit-care' },
        { label: 'MIXIT HOME', value: 'mixit-home' },
        { label: 'Скраб для тела', value: 'body-scrub' },
        { label: 'Лосьон для тела', value: 'body-lotion' },
        { label: 'Крем для лица', value: 'face-cream' },
        { label: 'Маска для лица', value: 'face-mask' },
        { label: 'Сыворотка для лица', value: 'face-serum' },
      ];

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const q = query.trim().toLowerCase();
          const filtered = allOptions.filter(
            option =>
              option.label.toLowerCase().includes(q)
              || option.value.toLowerCase().includes(q),
          );

          setOptions(filtered);
          resolve();
        }, 800);
      });
    };

    return (
      <div className="w-100">
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={options}
          onSearch={handleSearch}
        />
      </div>
    );
  },
  args: {
    label: 'Асинхронный поиск',
    placeholder: 'Начните вводить запрос',
    options: simpleOptions,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: 'm',
  },
};
