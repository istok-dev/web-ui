import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './index';
import type { SelectOption } from './select.types';

const options: SelectOption[] = [
  { label: 'Дизайн', value: 'design' },
  { label: 'Разработка', value: 'dev' },
  { label: 'Маркетинг', value: 'marketing' },
];

const getTrigger = () => screen.getByRole('combobox');

const openAndPick = async (label: string) => {
  await userEvent.click(getTrigger());
  await userEvent.click(await screen.findByRole('option', { name: label }));
};

describe('Select', () => {
  it('показывает placeholder, пока ничего не выбрано', () => {
    render(<Select options={options} placeholder="Выберите отдел" />);

    expect(within(getTrigger()).getByText('Выберите отдел')).toBeInTheDocument();
  });

  it('в неконтролируемом режиме показывает выбранное значение в триггере', async () => {
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} searchable={false} />);

    await openAndPick('Разработка');

    expect(onChange).toHaveBeenLastCalledWith([options[1]]);
    expect(within(getTrigger()).getByText('Разработка')).toBeInTheDocument();
  });

  it('показывает defaultValue в триггере', () => {
    render(
      <Select
        options={options}
        multiple
        defaultValue={[options[0]!, options[2]!]}
      />,
    );

    const trigger = getTrigger();
    expect(within(trigger).getByText('Дизайн')).toBeInTheDocument();
    expect(within(trigger).getByText('Маркетинг')).toBeInTheDocument();
  });

  it('не вкладывает интерактивные элементы в триггер', () => {
    render(
      <Select options={options} multiple defaultValue={[options[0]!]} />,
    );

    expect(within(getTrigger()).queryByRole('button')).not.toBeInTheDocument();
  });

  it('очищает значение кнопкой очистки (в т.ч. при multiple)', async () => {
    const onChange = vi.fn();
    render(
      <Select
        options={options}
        multiple
        defaultValue={[options[0]!]}
        onChange={onChange}
        clearLabel="Сбросить"
        placeholder="Пусто"
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Сбросить' }));

    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(within(getTrigger()).getByText('Пусто')).toBeInTheDocument();
  });

  it('не показывает кнопку очистки у disabled-селекта', () => {
    render(
      <Select
        options={options}
        defaultValue={[options[0]!]}
        clearLabel="Сбросить"
        disabled
      />,
    );

    expect(screen.queryByRole('button', { name: 'Сбросить' })).not.toBeInTheDocument();
  });

  it('в контролируемом режиме отображает только value', async () => {
    const onChange = vi.fn();
    render(
      <Select
        options={options}
        value={[options[0]!]}
        onChange={onChange}
        searchable={false}
      />,
    );

    await openAndPick('Маркетинг');

    expect(onChange).toHaveBeenLastCalledWith([options[2]]);
    expect(within(getTrigger()).getByText('Дизайн')).toBeInTheDocument();
  });

  it('«Выбрать все» выбирает и снимает все опции', async () => {
    const onChange = vi.fn();
    render(
      <Select
        options={options}
        multiple
        onChange={onChange}
        searchable={false}
        selectAllLabel="Все"
      />,
    );

    await userEvent.click(getTrigger());
    const selectAll = await screen.findByRole('checkbox', { name: 'Все' });
    expect(selectAll).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(selectAll);
    expect(onChange).toHaveBeenLastCalledWith(options);
    expect(selectAll).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(selectAll);
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('чекбокс группы отражает частичный выбор и выбирает всю группу', async () => {
    const onChange = vi.fn();
    render(
      <Select
        options={[{ label: 'Отделы', options }]}
        multiple
        defaultValue={[options[0]!]}
        onChange={onChange}
        searchable={false}
        showSelectAll={false}
      />,
    );

    await userEvent.click(getTrigger());
    const group = await screen.findByRole('checkbox', { name: 'Отделы' });
    expect(group).toHaveAttribute('aria-checked', 'mixed');

    await userEvent.click(group);

    expect(onChange).toHaveBeenLastCalledWith(options);
  });

  it('сообщает об ошибке onSearch вместо того, чтобы её глушить', async () => {
    const reportErrorMock = vi.fn();
    vi.stubGlobal('reportError', reportErrorMock);
    const error = new Error('network');
    render(<Select options={options} onSearch={() => Promise.reject(error)} />);

    await userEvent.click(getTrigger());
    await userEvent.type(await screen.findByPlaceholderText('Поиск'), 'a');

    await waitFor(() => expect(reportErrorMock).toHaveBeenCalledWith(error));
    vi.unstubAllGlobals();
  });
});
