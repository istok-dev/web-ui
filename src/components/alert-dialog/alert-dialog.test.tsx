import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AlertDialog } from './index';

const renderDialog = (props: Partial<Parameters<typeof AlertDialog>[0]> = {}) =>
  render(
    <AlertDialog
      open
      title="Удалить файл?"
      text="Действие нельзя отменить"
      actionLabel="Удалить"
      {...props}
    />,
  );

describe('AlertDialog', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('связывает диалог с заголовком и описанием', () => {
    renderDialog();

    const dialog = screen.getByRole('alertdialog', { name: 'Удалить файл?' });
    expect(dialog).toHaveAccessibleDescription('Действие нельзя отменить');
  });

  it('вызывает onAction и закрывается', async () => {
    const onAction = vi.fn();
    const onOpenChange = vi.fn();
    renderDialog({ onAction, onOpenChange });

    await userEvent.click(screen.getByRole('button', { name: 'Удалить' }));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('вызывает onCancel и закрывается по кнопке отмены', async () => {
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    renderDialog({ onCancel, onOpenChange, cancelLabel: 'Нет' });

    await userEvent.click(screen.getByRole('button', { name: 'Нет' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('не закрывается, пока выполняется асинхронное действие', async () => {
    let resolveAction!: () => void;
    const onAction = vi.fn(() => new Promise<void>((resolve) => {
      resolveAction = resolve;
    }));
    const onOpenChange = vi.fn();
    renderDialog({ onAction, onOpenChange, cancelLabel: 'Отмена' });

    await userEvent.click(screen.getByRole('button', { name: 'Удалить' }));

    expect(screen.getByRole('button', { name: 'Отмена' })).toBeDisabled();
    expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-busy', 'true');

    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).not.toHaveBeenCalled();

    resolveAction();

    await waitFor(() => expect(onOpenChange).toHaveBeenLastCalledWith(false));
  });

  it('остаётся открытым и сообщает об ошибке, если действие упало', async () => {
    const reportErrorMock = vi.fn();
    vi.stubGlobal('reportError', reportErrorMock);
    const error = new Error('network');
    const onOpenChange = vi.fn();
    renderDialog({ onAction: () => Promise.reject(error), onOpenChange });

    await userEvent.click(screen.getByRole('button', { name: 'Удалить' }));

    await waitFor(() => expect(reportErrorMock).toHaveBeenCalledWith(error));
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Удалить' })).toBeEnabled();
  });
});
