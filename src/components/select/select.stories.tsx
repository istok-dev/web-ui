import type { Meta, StoryObj } from '@storybook/react-vite';
import { Filter } from 'lucide-react';
import { useState } from 'react';

import { Select } from './index';
import { SELECT_VARIANTS, type SelectGroup, type SelectOption } from './select.types';

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
      options: ['sm', 'md', 'lg', 'xl'] as const,
      description: 'Размер селекта',
    },
    variant: {
      control: 'select',
      options: SELECT_VARIANTS,
      description: 'Вариант стиля',
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
  { label: 'Дизайн', value: 'design' },
  { label: 'Разработка', value: 'dev' },
  { label: 'Маркетинг', value: 'marketing' },
  { label: 'Поддержка', value: 'support' },
];

const categoryOptions: SelectOption[] = [
  {
    label: 'Документы очень длинный текст, который не поместится в инпут',
    value: 'docs-long',
  },
  { label: 'Отчёты', value: 'reports' },
  { label: 'Задачи', value: 'tasks' },
  { label: 'Проекты', value: 'projects' },
  { label: 'События', value: 'events' },
];

const optionsWithDisabled: SelectOption[] = [
  { label: 'Дизайн', value: 'design' },
  { label: 'Разработка', value: 'dev', disabled: true },
  { label: 'Маркетинг', value: 'marketing' },
  { label: 'Поддержка', value: 'support', disabled: true },
];

const groupedOptions: SelectGroup[] = [
  {
    label: 'Отделы',
    options: [
      { label: 'Дизайн', value: 'design' },
      { label: 'Разработка', value: 'dev' },
      { label: 'Маркетинг', value: 'marketing' },
    ],
  },
  {
    label: 'Офисы',
    options: [
      { label: 'Москва', value: 'moscow' },
      { label: 'Санкт-Петербург', value: 'spb' },
      { label: 'Казань', value: 'kazan' },
      { label: 'Удалённо', value: 'remote' },
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
    label: 'Отделы',
    placeholder: 'Выберите...',
    options: simpleOptions,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: 'md',
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
    size: 'md',
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
    label: 'Команды',
    placeholder: 'Выберите команды',
    options: groupedOptions,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: 'md',
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
          <p className="mb-2 text-body-sm text-neutral-500">Size SM</p>
          <Select
            startIcon={Filter}
            size="sm"
            value={s}
            onChange={setS}
            options={simpleOptions}
            label="Маленький"
          />
        </div>
        <div>
          <p className="mb-2 text-body-sm text-neutral-500">Size MD</p>
          <Select
            startIcon={Filter}
            size="md"
            value={m}
            onChange={setM}
            options={simpleOptions}
            label="Средний"
          />
        </div>
        <div>
          <p className="mb-2 text-body-sm text-neutral-500">Size LG</p>
          <Select
            startIcon={Filter}
            size="lg"
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

export const Variants: Story = {
  render: () => {
    const [neutral, setNeutral] = useState<SelectOption[]>([]);
    const [solid, setSolid] = useState<SelectOption[]>([]);
    const [filled, setFilled] = useState<SelectOption[]>([]);

    return (
      <div className="flex w-100 flex-col gap-6">
        <div>
          <p className="mb-2 text-body-sm text-neutral-500">Neutral</p>
          <Select
            variant="neutral"
            value={neutral}
            onChange={setNeutral}
            options={simpleOptions}
            label="Отделы"
          />
        </div>
        <div className="rounded-2xl bg-surface-muted p-4">
          <p className="mb-2 text-body-sm text-neutral-500">Solid</p>
          <Select
            variant="solid"
            value={solid}
            onChange={setSolid}
            options={simpleOptions}
            label="Отделы"
          />
        </div>
        <div>
          <p className="mb-2 text-body-sm text-neutral-500">Filled</p>
          <Select
            variant="filled"
            value={filled}
            onChange={setFilled}
            options={simpleOptions}
            label="Отделы"
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
    size: 'md',
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
    label: 'Отделы',
    placeholder: 'Выберите...',
    options: simpleOptions,
    multiple: true,
    searchable: false,
    showSelectAll: true,
    showClear: true,
    size: 'md',
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
    label: 'Отделы',
    placeholder: 'Выберите...',
    options: simpleOptions,
    multiple: true,
    searchable: true,
    showSelectAll: false,
    showClear: false,
    size: 'md',
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
    label: 'Отделы',
    placeholder: 'Выберите...',
    options: simpleOptions,
    multiple: true,
    disabled: true,
    size: 'md',
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
    label: 'Отделы',
    placeholder: 'Выберите...',
    options: optionsWithDisabled,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: 'md',
  },
};

export const WithSelectedValues: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption[]>(() =>
      simpleOptions.slice(0, 2),
    );
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
    label: 'Отделы',
    placeholder: 'Выберите...',
    options: simpleOptions,
    multiple: true,
    searchable: true,
    showSelectAll: true,
    showClear: true,
    size: 'md',
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [departments, setDepartments] = useState<SelectOption[]>(() =>
      simpleOptions.slice(0, 1),
    );
    const [categories, setCategories] = useState<SelectOption[]>([]);
    const [offices, setOffices] = useState<SelectOption[]>([]);
    const [teams, setTeams] = useState<SelectOption[]>([]);

    return (
      <div className="flex w-full max-w-6xl flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Отделы"
            placeholder="Выберите отделы"
            options={simpleOptions}
            value={departments}
            onChange={setDepartments}
            multiple={true}
            searchable={true}
            showSelectAll={true}
            showClear={true}
            size="md"
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
            size="md"
          />
          <Select
            label="Офисы"
            placeholder="Выберите офисы"
            options={groupedOptions.at(1)?.options ?? []}
            value={offices}
            onChange={setOffices}
            multiple={true}
            searchable={true}
            showSelectAll={true}
            showClear={true}
            size="md"
          />
          <Select
            label="Команды"
            placeholder="Выберите команды"
            options={groupedOptions}
            value={teams}
            onChange={setTeams}
            multiple={true}
            searchable={true}
            showSelectAll={true}
            showClear={true}
            size="md"
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
        { label: 'Дизайн', value: 'design' },
        { label: 'Разработка', value: 'dev' },
        { label: 'Маркетинг', value: 'marketing' },
        { label: 'Поддержка', value: 'support' },
        { label: 'Аналитика', value: 'analytics' },
        { label: 'Финансы', value: 'finance' },
        { label: 'HR', value: 'hr' },
        { label: 'Юридический', value: 'legal' },
        { label: 'Операции', value: 'ops' },
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
    size: 'md',
  },
};
