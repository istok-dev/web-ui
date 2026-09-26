import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './index';

describe('Checkbox.Item', () => {
  it('связан с подписью и переключается в неконтролируемом режиме', async () => {
    render(
      <Checkbox>
        <Checkbox.Item label="Согласен" />
      </Checkbox>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Согласен' });
    expect(checkbox).not.toBeChecked();

    await userEvent.click(screen.getByText('Согласен'));

    expect(checkbox).toBeChecked();
  });

  it('прокидывает ref на нативный input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox.Item ref={ref} label="A" name="agree" />);

    expect(ref.current).toBe(screen.getByRole('checkbox'));
    expect(ref.current).toHaveAttribute('name', 'agree');
  });

  it('выставляет indeterminate на нативный input', () => {
    render(<Checkbox.Item label="A" indeterminate />);

    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
  });

  it('в контролируемом режиме только сообщает об изменении', async () => {
    const onChange = vi.fn();
    render(<Checkbox.Item label="A" checked={false} onChange={onChange} />);

    await userEvent.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
