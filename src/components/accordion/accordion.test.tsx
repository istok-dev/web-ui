import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Accordion, type AccordionRootProps } from './index';

const renderAccordion = (props: Omit<AccordionRootProps, 'children'> = {}) =>
  render(
    <Accordion {...props}>
      <Accordion.Item value="item-1" title="Первый">
        <input aria-label="Поле в контенте" />
      </Accordion.Item>
      <Accordion.Item value="item-10" title="Десятый">
        Контент десятого
      </Accordion.Item>
    </Accordion>,
  );

const trigger = (name: string) => screen.getByRole('button', { name });

describe('Accordion', () => {
  it('принимает строку в defaultValue', () => {
    renderAccordion({ defaultValue: 'item-10' });

    expect(trigger('Десятый')).toHaveAttribute('aria-expanded', 'true');
    // 'item-10' не должен открывать 'item-1' через совпадение по подстроке
    expect(trigger('Первый')).toHaveAttribute('aria-expanded', 'false');
  });

  it('открывает и закрывает пункт по клику на заголовок', async () => {
    renderAccordion();

    await userEvent.click(trigger('Первый'));
    expect(trigger('Первый')).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(trigger('Первый'));
    expect(trigger('Первый')).toHaveAttribute('aria-expanded', 'false');
  });

  it('не закрывает пункт при клике внутри контента', async () => {
    renderAccordion({ defaultValue: 'item-1' });

    await userEvent.click(screen.getByLabelText('Поле в контенте'));

    expect(trigger('Первый')).toHaveAttribute('aria-expanded', 'true');
  });

  it('передаёт в onValueChange массив', async () => {
    const onValueChange = vi.fn();
    renderAccordion({ onValueChange });

    await userEvent.click(trigger('Десятый'));

    expect(onValueChange).toHaveBeenLastCalledWith(['item-10']);
  });

  it('в контролируемом режиме следует за value', () => {
    const { rerender } = render(
      <Accordion value={['item-1']}>
        <Accordion.Item value="item-1" title="Первый">A</Accordion.Item>
      </Accordion>,
    );
    expect(trigger('Первый')).toHaveAttribute('aria-expanded', 'true');

    rerender(
      <Accordion value={[]}>
        <Accordion.Item value="item-1" title="Первый">A</Accordion.Item>
      </Accordion>,
    );
    expect(trigger('Первый')).toHaveAttribute('aria-expanded', 'false');
  });
});
