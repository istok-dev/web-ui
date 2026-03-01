## Правила стилизации UI‑компонентов (пример: `IconButton`)

### Общие принципы

- **CSS‑утилиты управляют только переменными.**  
  Размеры, радиусы, цвета и другие настройки варианта/размера/формы задаются через CSS‑переменные в `@utility`‑классах.
- **JSX использует только базовые классы + маппинги утилит.**  
  В `tsx` файлах компонент:
  - есть один базовый класс корневого элемента (`istok-<component>`),
  - есть маппинги пропов (`size`, `variant`, `shape` и т.п.) в `@utility`‑классы,
  - конкретные значения берутся из CSS‑переменных через `var(--...)`.
- **Состояния (`hover`, `active`, `disabled`) задаются через переменные.**  
  JSX управляет только логикой (например, `disabled || loading`), а сами цвета для состояний приходят из CSS‑переменных.

---

### Структура стилей на примере `IconButton`

#### 1. Размеры

- В утилитах задаём только переменные:
  - `--istok-icon-button-size` — итоговый размер кнопки (ширина/высота),
  - `--istok-icon-button-icon-size` — размер иконки,
  - `--istok-icon-button-square-radius` — радиус для квадратной формы.

Пример (упрощённо):

```css
@utility istok-icon-button--m {
  --istok-icon-button-size: var(--spacing-10);
  --istok-icon-button-icon-size: var(--spacing-5);
  --istok-icon-button-square-radius: var(--radius-xl);
}
```

В JSX эти переменные используются так:

```tsx
className={cn(
  "istok-icon-button",
  "size-[var(--istok-icon-button-size)]",
  // ...
)}
```

Иконка использует ту же переменную:

```tsx
className={cn(
  "istok-icon-button__icon",
  "size-[var(--istok-icon-button-icon-size)]",
)}
```

#### 2. Форма (`shape`)

- Утилита только прокидывает радиус в переменную:

```css
@utility istok-icon-button--circle {
  --istok-icon-button-radius: 9999px;
}

@utility istok-icon-button--square {
  --istok-icon-button-radius: var(--istok-icon-button-square-radius);
}
```

- В JSX мы не пишем конкретный `rounded-*`, а всегда используем переменную:

```tsx
className={cn(
  "istok-icon-button",
  "rounded-[var(--istok-icon-button-radius)]",
  // ...
)}
```

#### 3. Варианты (`variant`)

- Для каждого варианта заводим набор переменных:
  - `--istok-icon-button-bg` / `--istok-icon-button-bg-hover` / `--istok-icon-button-bg-active`,
  - `--istok-icon-button-fg` / `--istok-icon-button-fg-hover` / `--istok-icon-button-fg-active`.

Пример:

```css
@utility istok-icon-button--primary {
  --istok-icon-button-bg: var(--color-primary-500);
  --istok-icon-button-bg-hover: var(--color-primary-700);
  --istok-icon-button-bg-active: var(--color-primary-700);

  --istok-icon-button-fg: var(--color-primary-50);
  --istok-icon-button-fg-hover: var(--color-primary-50);
  --istok-icon-button-fg-active: var(--color-primary-50);
}
```

- В JSX цвет и фон читаются только из переменных:

```tsx
className={cn(
  "istok-icon-button",
  "bg-[var(--istok-icon-button-bg)] text-[var(--istok-icon-button-fg)]",
  !isDisabled && [
    "hover:bg-[var(--istok-icon-button-bg-hover)] hover:text-[var(--istok-icon-button-fg-hover)]",
    "active:bg-[var(--istok-icon-button-bg-active)] active:text-[var(--istok-icon-button-fg-active)]",
  ],
)}
```

#### 4. Состояние `disabled` / `loading`

- Логика состояния — в JSX:
  - `isDisabled = disabled || loading`,
  - `disabled={isDisabled}`,
  - отдельные классы для курсора/прозрачности (`opacity-12 cursor-not-allowed`).
- В CSS‑утилитах под `IconButton` нет отдельного варианта `disabled`: достаточно того, что мы отключаем `hover/active` поведение в JSX и задаём визуальное состояние через Tailwind‑классы.

---

### Рекомендации для новых компонентов

1. **Сначала описать API компонента** (пропы `size`, `variant`, `shape` и т.д.).
2. **Создать маппинги** пропов в `@utility`‑классы (как в `IconButton` и `Tabs`) и вынести эти маппинги/утилиты в `cn.ts`, чтобы их можно было переопределять снаружи и чтобы `twMerge` корректно обрабатывал пересечения классов.
3. **В CSS‑утилитах задавать только переменные**, не писать туда `@apply` с конечными размерами/цветами для корневого элемента.
4. **В JSX использовать только переменные** для размеров, отступов, радиусов и цветов. Для `font-size` использовать форму `text-(length:--...)`, чтобы Tailwind корректно парсил значение.
5. **Поведение состояний (`hover`, `active`, `disabled`) контролировать пропами и классами в JSX**, а конкретные цвета состояний — переменными в CSS‑утилитах.
