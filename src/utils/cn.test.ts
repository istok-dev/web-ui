/// <reference types="vite/client" />
import { describe, expect, it } from 'vitest';

import { classGroups, cn } from './cn';

const componentSources = import.meta.glob<string>(
  ['../components/**/*.tsx', '!**/*.stories.tsx', '!**/*.test.tsx'],
  { query: '?raw', import: 'default', eager: true },
);

/** Все классы-модификаторы вида `istok-*--*` из маппингов пропов в компонентах. */
const collectModifierClasses = () => {
  const classes = new Set<string>();

  for (const source of Object.values(componentSources)) {
    const maps = source.matchAll(/Record<\w+, string> = \{([\s\S]*?)\};/g);

    for (const [, body] of maps) {
      for (const [, className] of body!.matchAll(/'(istok-[\w-]+--[\w-]+)'/g)) {
        classes.add(className!);
      }
    }
  }

  return classes;
};

describe('cn', () => {
  it('объединяет условные классы', () => {
    expect(cn('a', false && 'b', ['c', { d: true, e: false }])).toBe('a c d');
  });

  it('разрешает конфликты стандартных утилит Tailwind', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('разрешает конфликты модификаторов компонентов', () => {
    expect(cn('istok-button--md', 'istok-button--lg')).toBe('istok-button--lg');
    expect(cn('istok-button--color-primary', 'istok-button--color-base'))
      .toBe('istok-button--color-base');
    expect(cn('istok-select--md', 'istok-select--xl')).toBe('istok-select--xl');
  });

  it('не смешивает разные группы одного компонента', () => {
    expect(cn('istok-button--md', 'istok-button--primary', `
      istok-button--color-negative
    `))
      .toBe('istok-button--md istok-button--primary istok-button--color-negative');
  });

  it('разрешает конфликты типографики', () => {
    expect(cn('text-body-md', 'text-title-lg')).toBe('text-title-lg');
  });

  it('покрывает группами все модификаторы из маппингов компонентов', () => {
    const modifierClasses = collectModifierClasses();
    const grouped = new Set(Object.values(classGroups).flat());
    const missing = [...modifierClasses].filter(c => !grouped.has(c));

    expect(modifierClasses.size).toBeGreaterThan(50);
    expect(missing).toEqual([]);
  });
});
