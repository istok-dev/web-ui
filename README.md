# @istok-dev/web-ui

UI-библиотека компонентов Istok на React 19, [Base UI](https://base-ui.com) и Tailwind CSS v4.

## Требования

- React и React DOM **19+**
- Tailwind CSS **v4**. Стили компонентов поставляются как исходный CSS
  с `@theme` и `@utility`, поэтому их должен обработать Tailwind проекта-потребителя.
- `react-day-picker`: только если используются `calendar`, `date-picker` или `date-input`.

## Установка

Пакет публикуется в GitHub Packages. В `.npmrc` проекта:

```ini
@istok-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```sh
pnpm add @istok-dev/web-ui
# если нужны календарь и поля дат
pnpm add react-day-picker
```

## Подключение стилей

В главном CSS-файле приложения:

```css
@import "tailwindcss";

/* Tailwind должен видеть классы, которые используются внутри компонентов */
@source "../node_modules/@istok-dev/web-ui/lib";

@import "@istok-dev/web-ui/theme.css";
@import "@istok-dev/web-ui/styles.css";
```

Путь в `@source` указывается относительно CSS-файла.

Вместо `styles.css` можно подключить стили только нужных компонентов:
`@istok-dev/web-ui/button.css`, `@istok-dev/web-ui/select.css` и т.д.
Полный список есть в `exports` в [package.json](package.json).

> **Важно:** `theme.css` сбрасывает стандартные токены Tailwind
> (`--color-*`, `--text-*`, `--breakpoint-*`) и задаёт токены дизайн-системы Istok.
> Классы вроде `bg-red-500` или `md:` после подключения работать перестанут.
> Используйте токены темы: `bg-negative-500`, `tablet:`, `text-body-md` и т.д.

## Использование

```tsx
import { Button, Select } from '@istok-dev/web-ui';
import { cn } from '@istok-dev/web-ui/utils';
import { DatePicker } from '@istok-dev/web-ui/date-picker';
```

Календарь и поля дат вынесены в отдельные точки входа
(`/calendar`, `/date-picker`, `/date-input`). Так основной пакет
не требует `react-day-picker`.

### Next.js (App Router)

Модули с состоянием помечены `'use client'`, и сборка сохраняет эти директивы.
Поэтому компоненты можно импортировать прямо из серверных компонентов.
Функции-пропсы (`onClick`, `onChange` и т.п.) по-прежнему можно передавать
только из клиентских компонентов.

Из серверного компонента нельзя обращаться через точку к частям клиентского
модуля (`Modal.Header`, `Checkbox.Item`): Next.js выдаст ошибку
«You cannot dot into a client module». Поэтому части экспортируются и отдельно:

```tsx
import { Modal, ModalBody, ModalHeader } from '@istok-dev/web-ui';

<Modal open={open}>
  <ModalHeader title="Заголовок" />
  <ModalBody>…</ModalBody>
</Modal>
```

Отдельные экспорты: `AccordionItem`, `BottomSheetHeader`/`Body`/`Footer`,
`CheckboxItem`, `DropdownItem`/`Separator`/`Submenu`, `MenuItem`/`Separator`,
`ModalHeader`/`Body`/`Footer`, `RadioItem`, `RadioCardGroup`,
`SwitchField`/`FieldList`, `TabItem`.

### Подписи и локализация

Все тексты для экранных дикторов и служебные подписи по умолчанию на русском
и переопределяются пропсами: `clearLabel`, `closeLabel`, `removeLabel`,
`openCalendarLabel`, `showPasswordLabel`/`hidePasswordLabel`, `labels`
у `Calendar` (через `calendarProps` у `DatePicker` и `pt.calendar` у `DateInput`) и т.д.

### Формы

`Input`, `PasswordInput`, `Checkbox.Item`, `Radio.Item` и `Switch` передают
`ref` и нативные атрибуты (`name`, `onBlur`, `aria-*`, `required`…) на сам `<input>`,
поэтому работают с `react-hook-form`:

```tsx
<Input {...register('email')} aria-invalid={!!errors.email} />
```

У `Input` пропсы `className` и `style` относятся к корневой обёртке,
а атрибуты обёртки передаются через `pt.root`.

### Переопределение стилей

Размеры, варианты и цвета задаются классами-модификаторами (`istok-button--lg`)
и CSS-переменными. `cn` (tailwind-merge) знает о группах модификаторов, поэтому
`className` может переопределить размер или вариант:

```tsx
<Button size="md" className="istok-button--lg" /> // останется только --lg
```

## Разработка

```sh
pnpm install
pnpm storybook      # витрина компонентов на :6006 (с проверкой доступности, addon-a11y)
pnpm test           # Vitest + Testing Library
pnpm lint
pnpm type-check
pnpm build          # сборка в lib/
```

- Правила стилизации компонентов описаны в [RULE.md](RULE.md).
- Если у компонента появляется новый размер, вариант или цвет, добавьте значение
  в массив констант в `*.types.ts` (например, `BUTTON_SIZES`). Тогда оно попадёт
  и в тип пропа, и в группу `cn`. Тест `src/utils/cn.test.ts` падает, если
  класс-модификатор из маппинга компонента не входит ни в одну группу.
- Тесты лежат рядом с компонентами: `*.test.tsx`.
