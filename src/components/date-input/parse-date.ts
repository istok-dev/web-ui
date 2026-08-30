export function datesEqual(a: Date | undefined, b: Date | undefined) {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  );
}

export function formatDate(date: Date | undefined): string {
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
}

function toValidDate(year: number, month: number, day: number): Date | undefined {
  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year
    || date.getMonth() !== month
    || date.getDate() !== day
  ) {
    return undefined;
  }
  return date;
}

export function parseDate(text: string): Date | undefined {
  const trimmed = text.trim();
  if (!trimmed) return undefined;

  const dotted = trimmed.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (dotted) {
    return toValidDate(Number(dotted[3]), Number(dotted[2]) - 1, Number(dotted[1]));
  }

  const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    return toValidDate(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  }

  return undefined;
}
