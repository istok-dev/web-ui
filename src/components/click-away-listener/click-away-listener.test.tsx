import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ClickAwayListener } from './index';

describe('ClickAwayListener', () => {
  it('вызывает колбэк один раз при нажатии снаружи', () => {
    const onAwayClick = vi.fn();
    render(
      <>
        <button type="button">Снаружи</button>
        <ClickAwayListener onAwayClick={onAwayClick}>
          <span>Внутри</span>
        </ClickAwayListener>
      </>,
    );

    fireEvent.pointerDown(screen.getByText('Снаружи'));

    expect(onAwayClick).toHaveBeenCalledTimes(1);
  });

  it('не реагирует на нажатия внутри', () => {
    const onAwayClick = vi.fn();
    render(
      <ClickAwayListener onAwayClick={onAwayClick}>
        <span>Внутри</span>
      </ClickAwayListener>,
    );

    fireEvent.pointerDown(screen.getByText('Внутри'));

    expect(onAwayClick).not.toHaveBeenCalled();
  });

  it('не реагирует, когда disabled', () => {
    const onAwayClick = vi.fn();
    render(
      <ClickAwayListener onAwayClick={onAwayClick} disabled>
        <span>Внутри</span>
      </ClickAwayListener>,
    );

    fireEvent.pointerDown(document.body);

    expect(onAwayClick).not.toHaveBeenCalled();
  });

  it('вызывает актуальный колбэк после перерендера', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(
      <ClickAwayListener onAwayClick={first}>Внутри</ClickAwayListener>,
    );

    rerender(<ClickAwayListener onAwayClick={second}>Внутри</ClickAwayListener>);
    fireEvent.pointerDown(document.body);

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('рендерит элемент из render и прокидывает атрибуты', () => {
    render(
      <ClickAwayListener
        onAwayClick={() => {}}
        render={<section />}
        data-testid="area"
      >
        Внутри
      </ClickAwayListener>,
    );

    expect(screen.getByTestId('area').tagName).toBe('SECTION');
  });
});
