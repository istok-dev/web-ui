import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from 'lucide-react';
import { useRef, useState } from 'react';

import { AUTOCOMPLETE_MODES, type AutocompleteGroup, type AutocompleteOption } from './autocomplete.types';
import { Autocomplete } from './index';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Размер',
    },
    variant: {
      control: 'select',
      options: ['neutral', 'solid', 'opacity', 'filled'],
      description: 'Вариант стиля',
    },
    mode: {
      control: 'select',
      options: AUTOCOMPLETE_MODES,
      description: 'Режим фильтрации и автодополнения',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
    showClear: {
      control: 'boolean',
      description: 'Кнопка очистки',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    openOnInputClick: {
      control: 'boolean',
      description: 'Открывать список по клику на инпут',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Autocomplete>;

const simpleOptions: AutocompleteOption[] = [
  { label: 'Дизайн', value: 'design' },
  { label: 'Разработка', value: 'dev' },
  { label: 'Маркетинг', value: 'marketing' },
  { label: 'Поддержка', value: 'support' },
  { label: 'Аналитика', value: 'analytics' },
  { label: 'Финансы', value: 'finance' },
];

const optionsWithDisabled: AutocompleteOption[] = [
  { label: 'Дизайн', value: 'design' },
  { label: 'Разработка', value: 'dev', disabled: true },
  { label: 'Маркетинг', value: 'marketing' },
  { label: 'Поддержка', value: 'support', disabled: true },
];

const groupedOptions: AutocompleteGroup[] = [
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
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Autocomplete
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Начните вводить…',
    options: simpleOptions,
    size: 'md',
    variant: 'neutral',
  },
};

export const WithIcon: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Autocomplete
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Поиск отдела',
    options: simpleOptions,
    startIcon: Search,
    size: 'md',
    variant: 'neutral',
  },
};

export const WithGroups: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Autocomplete
          {...args}
          value={value}
          onChange={setValue}
          options={groupedOptions}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Выберите команду',
    options: groupedOptions,
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = useState('');
    const [md, setMd] = useState('');
    const [lg, setLg] = useState('');
    const [xl, setXl] = useState('');

    return (
      <div className="flex w-80 flex-col gap-4">
        <Autocomplete
          size="sm"
          value={sm}
          onChange={setSm}
          options={simpleOptions}
          placeholder="Size SM"
        />
        <Autocomplete
          size="md"
          value={md}
          onChange={setMd}
          options={simpleOptions}
          placeholder="Size MD"
        />
        <Autocomplete
          size="lg"
          value={lg}
          onChange={setLg}
          options={simpleOptions}
          placeholder="Size LG"
        />
        <Autocomplete
          size="xl"
          value={xl}
          onChange={setXl}
          options={simpleOptions}
          placeholder="Size XL"
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [neutral, setNeutral] = useState('');
    const [solid, setSolid] = useState('');
    const [filled, setFilled] = useState('');

    return (
      <div className="flex w-80 flex-col gap-4">
        <Autocomplete
          variant="neutral"
          value={neutral}
          onChange={setNeutral}
          options={simpleOptions}
          placeholder="Neutral"
        />
        <div className="rounded-2xl bg-surface-muted p-4">
          <Autocomplete
            variant="solid"
            value={solid}
            onChange={setSolid}
            options={simpleOptions}
            placeholder="Solid"
          />
        </div>
        <Autocomplete
          variant="filled"
          value={filled}
          onChange={setFilled}
          options={simpleOptions}
          placeholder="Filled"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('Дизайн');
    return (
      <div className="w-80">
        <Autocomplete
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Начните вводить…',
    options: simpleOptions,
    disabled: true,
  },
};

export const DisabledItems: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Autocomplete
          {...args}
          value={value}
          onChange={setValue}
          options={optionsWithDisabled}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Начните вводить…',
    options: optionsWithDisabled,
  },
};

export const InlineAutocomplete: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Autocomplete
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Начните вводить…',
    options: simpleOptions,
    mode: 'both',
    autoHighlight: true,
  },
};

export const Loading: Story = {
  render: (args) => {
    const [value, setValue] = useState('диз');
    return (
      <div className="w-80">
        <Autocomplete
          {...args}
          value={value}
          onChange={setValue}
          options={simpleOptions}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Начните вводить…',
    options: simpleOptions,
    loading: true,
  },
};

const SERVER_OPTIONS: AutocompleteOption[] = [
  { label: 'Анна Козлова', value: 'anna-kozlova' },
  { label: 'Борис Иванов', value: 'boris-ivanov' },
  { label: 'Виктор Смирнов', value: 'viktor-smirnov' },
  { label: 'Дарья Петрова', value: 'darya-petrova' },
  { label: 'Елена Соколова', value: 'elena-sokolova' },
  { label: 'Игорь Морозов', value: 'igor-morozov' },
  { label: 'Кирилл Новиков', value: 'kirill-novikov' },
  { label: 'Мария Волкова', value: 'maria-volkova' },
  { label: 'Никита Фёдоров', value: 'nikita-fedorov' },
  { label: 'Ольга Лебедева', value: 'olga-lebedeva' },
  { label: 'Павел Кузнецов', value: 'pavel-kuznetsov' },
  { label: 'Светлана Попова', value: 'svetlana-popova' },
];

const SERVER_DELAY_MS = 800;
const SEARCH_DEBOUNCE_MS = 300;

const searchEmployees = (
  query: string,
  signal: AbortSignal,
): Promise<AutocompleteOption[]> => {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      const q = query.trim().toLowerCase();
      const result = q
        ? SERVER_OPTIONS.filter(option =>
          option.label.toLowerCase().includes(q)
          || option.value.toLowerCase().includes(q),
        )
        : [];

      resolve(result);
    }, SERVER_DELAY_MS);

    const onAbort = () => {
      window.clearTimeout(timeoutId);
      reject(new DOMException('Aborted', 'AbortError'));
    };

    if (signal.aborted) {
      onAbort();
      return;
    }

    signal.addEventListener('abort', onAbort, { once: true });
  });
};

export const WithAsyncSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<AutocompleteOption[]>([]);
    const [loading, setLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);
    const debounceRef = useRef<number>(0);

    const handleSearch = (query: string) => {
      window.clearTimeout(debounceRef.current);
      abortRef.current?.abort();

      const q = query.trim();

      if (!q) {
        setOptions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      debounceRef.current = window.setTimeout(() => {
        const controller = new AbortController();
        abortRef.current = controller;

        void searchEmployees(q, controller.signal)
          .then((result) => {
            setOptions(result);
            setLoading(false);
          })
          .catch((error: unknown) => {
            if (error instanceof DOMException && error.name === 'AbortError') {
              return;
            }
            setLoading(false);
          });
      }, SEARCH_DEBOUNCE_MS);
    };

    return (
      <div className="w-80">
        <Autocomplete
          {...args}
          value={value}
          onChange={setValue}
          options={options}
          onSearch={handleSearch}
          loading={loading}
          emptyText={
            value.trim()
              ? 'Ничего не найдено'
              : 'Начните вводить для поиска'
          }
        />
        <p className="mt-3 text-body-sm text-neutral-500">
          Запрос на сервер с задержкой
          {' '}
          {SERVER_DELAY_MS}
          {' '}
          мс. Предыдущий запрос отменяется.
        </p>
      </div>
    );
  },
  args: {
    placeholder: 'Найти сотрудника',
    options: [],
    startIcon: Search,
  },
};
