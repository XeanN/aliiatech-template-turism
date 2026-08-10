export const WEEKDAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function getMonthGrid(year: number, month: number): (Date | null)[][] {
  const first = new Date(Date.UTC(year, month, 1));
  const startWeekday = (first.getUTCDay() + 6) % 7; // Lunes = 0 ... Domingo = 6
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(Date.UTC(year, month, d)));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}
