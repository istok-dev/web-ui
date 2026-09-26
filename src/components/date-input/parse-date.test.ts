import { describe, expect, it } from 'vitest';

import { datesEqual, formatDate, parseDate } from './parse-date';

describe('parseDate', () => {
  it('разбирает формат ДД.ММ.ГГГГ и ДД/ММ/ГГГГ', () => {
    expect(parseDate('05.03.2024')).toEqual(new Date(2024, 2, 5));
    expect(parseDate('5/3/2024')).toEqual(new Date(2024, 2, 5));
  });

  it('разбирает ISO-формат', () => {
    expect(parseDate('2024-03-05')).toEqual(new Date(2024, 2, 5));
  });

  it('отбрасывает несуществующие даты', () => {
    expect(parseDate('31.02.2024')).toBeUndefined();
    expect(parseDate('2023-02-29')).toBeUndefined();
  });

  it('принимает 29 февраля високосного года', () => {
    expect(parseDate('29.02.2024')).toEqual(new Date(2024, 1, 29));
  });

  it('возвращает undefined для пустой строки и мусора', () => {
    expect(parseDate('')).toBeUndefined();
    expect(parseDate('   ')).toBeUndefined();
    expect(parseDate('завтра')).toBeUndefined();
    expect(parseDate('05.03.24')).toBeUndefined();
  });
});

describe('formatDate', () => {
  it('форматирует с ведущими нулями', () => {
    expect(formatDate(new Date(2024, 0, 7))).toBe('07.01.2024');
  });

  it('возвращает пустую строку для undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('обратим с parseDate', () => {
    const date = new Date(2031, 11, 31);
    expect(parseDate(formatDate(date))).toEqual(date);
  });
});

describe('datesEqual', () => {
  it('сравнивает только календарную дату', () => {
    expect(datesEqual(new Date(2024, 2, 5, 10), new Date(2024, 2, 5, 23))).toBe(true);
    expect(datesEqual(new Date(2024, 2, 5), new Date(2024, 2, 6))).toBe(false);
  });

  it('корректно обрабатывает undefined', () => {
    expect(datesEqual(undefined, undefined)).toBe(true);
    expect(datesEqual(new Date(), undefined)).toBe(false);
  });
});
