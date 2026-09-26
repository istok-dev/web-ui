import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './index';

describe('Input', () => {
  it('прокидывает ref и нативные атрибуты на <input>', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Input
        ref={ref}
        id="email"
        name="email"
        aria-invalid
        required
        className="root-class"
      />,
    );

    const input = screen.getByRole('textbox');
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeRequired();
    expect(input).not.toHaveClass('root-class');
    expect(input.closest('.istok-input')).toHaveClass('root-class');
  });

  it('вызывает onChange со строкой и событием', async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);

    await userEvent.type(screen.getByRole('textbox'), 'a');

    expect(onChange).toHaveBeenCalledWith(
      'a',
      expect.objectContaining({ type: 'change' }),
    );
  });

  it('вызывает onBlur, переданный верхнеуровневым пропом', async () => {
    const onBlur = vi.fn();
    render(<Input onBlur={onBlur} />);

    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.tab();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('работает в неконтролируемом режиме через defaultValue', async () => {
    render(<Input defaultValue="abc" />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'd');

    expect(input).toHaveValue('abcd');
  });
});
