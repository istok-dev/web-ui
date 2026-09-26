import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tabs } from './index';

describe('Tabs', () => {
  it('рендерит tablist с корректной ARIA-семантикой', () => {
    render(
      <Tabs value="b" aria-label="Разделы">
        <Tabs.Item value="a" label="A" />
        <Tabs.Item value="b" label="B" />
      </Tabs>,
    );

    expect(screen.getByRole('tablist', { name: 'Разделы' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');
  });

  it('переключает вкладку кликом и вызывает onValueChange', async () => {
    const onValueChange = vi.fn();
    const onClick = vi.fn();
    render(
      <Tabs defaultValue="a" onValueChange={onValueChange}>
        <Tabs.Item value="a" label="A" />
        <Tabs.Item value="b" label="B" onClick={onClick} />
      </Tabs>,
    );

    await userEvent.click(screen.getByRole('tab', { name: 'B' }));

    expect(onValueChange).toHaveBeenCalledWith('b');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');
  });

  it('перемещает фокус стрелками', async () => {
    render(
      <Tabs defaultValue="a">
        <Tabs.Item value="a" label="A" />
        <Tabs.Item value="b" label="B" />
      </Tabs>,
    );

    await userEvent.tab();
    expect(screen.getByRole('tab', { name: 'A' })).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveFocus();
  });

  it('не выбирает заблокированную вкладку', async () => {
    const onValueChange = vi.fn();
    render(
      <Tabs defaultValue="a" onValueChange={onValueChange}>
        <Tabs.Item value="a" label="A" />
        <Tabs.Item value="b" label="B" disabled />
      </Tabs>,
    );

    await userEvent.click(screen.getByRole('tab', { name: 'B' }));

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
