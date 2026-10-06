import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DateInput } from './index';

function Harness({
  disabled = false,
  onChange = vi.fn(),
}: {
  disabled?: boolean;
  onChange?: (date: Date | undefined) => void;
}) {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <DateInput
      value={value}
      disabled={disabled}
      onChange={(date) => {
        onChange(date);
        setValue(date);
      }}
    />
  );
}

describe('DateInput', () => {
  it('открывает календарь по фокусу поля', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('textbox'));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('не открывает календарь, если поле заблокировано', async () => {
    const user = userEvent.setup();
    render(<Harness disabled />);

    await user.click(screen.getByRole('textbox'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('оставляет календарь открытым при повторном клике в поле', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByRole('textbox');

    await user.click(input);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.click(input);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('закрывает календарь после выбора даты', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);

    await user.click(screen.getByRole('textbox'));
    const dialog = await screen.findByRole('dialog');
    const day = dialog.querySelector('[data-day] button');
    expect(day).toBeTruthy();

    await user.click(day!);

    expect(onChange).toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
