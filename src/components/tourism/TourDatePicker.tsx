"use client";

import { useMemo, useState } from "react";

import { dateKey, getMonthGrid } from "@/lib/calendar-grid";

type AvailabilityOption = { id: string; date: string; capacity: number };

const MONTH_LABEL = new Intl.DateTimeFormat("es-PE", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const DAY_LABEL_FULL = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "long",
  timeZone: "UTC",
});
const WEEKDAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function TourDatePicker({
  availability,
  selectedId,
  onSelect,
}: {
  availability: AvailabilityOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const byKey = useMemo(() => {
    const map = new Map<string, AvailabilityOption>();
    for (const a of availability) map.set(a.date.slice(0, 10), a);
    return map;
  }, [availability]);

  const sortedDates = useMemo(
    () => availability.map((a) => new Date(a.date)).sort((a, b) => a.getTime() - b.getTime()),
    [availability],
  );
  const firstMonth = sortedDates[0] ?? new Date();
  const lastMonth = sortedDates[sortedDates.length - 1] ?? new Date();

  const [cursor, setCursor] = useState(
    () => new Date(Date.UTC(firstMonth.getUTCFullYear(), firstMonth.getUTCMonth(), 1)),
  );

  const weeks = getMonthGrid(cursor.getUTCFullYear(), cursor.getUTCMonth());

  const canGoPrev =
    cursor.getUTCFullYear() > firstMonth.getUTCFullYear() ||
    (cursor.getUTCFullYear() === firstMonth.getUTCFullYear() &&
      cursor.getUTCMonth() > firstMonth.getUTCMonth());
  const canGoNext =
    cursor.getUTCFullYear() < lastMonth.getUTCFullYear() ||
    (cursor.getUTCFullYear() === lastMonth.getUTCFullYear() &&
      cursor.getUTCMonth() < lastMonth.getUTCMonth());

  const selected = availability.find((a) => a.id === selectedId);

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={!canGoPrev}
          onClick={() =>
            setCursor(new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() - 1, 1)))
          }
          className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent dark:border-neutral-700 dark:text-neutral-400"
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <p className="text-sm font-semibold capitalize">{MONTH_LABEL.format(cursor)}</p>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={() =>
            setCursor(new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1)))
          }
          className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent dark:border-neutral-700 dark:text-neutral-400"
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-medium text-neutral-400">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {weeks.flatMap((week, wi) =>
          week.map((day, di) => {
            if (!day) return <div key={`${wi}-${di}`} />;

            const key = dateKey(day);
            const entry = byKey.get(key);

            if (!entry) {
              return (
                <div
                  key={key}
                  className="flex aspect-square items-center justify-center rounded-md text-sm text-neutral-300 dark:text-neutral-700"
                >
                  {day.getUTCDate()}
                </div>
              );
            }

            const isSelected = entry.id === selectedId;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelect(entry.id)}
                className={`flex aspect-square items-center justify-center rounded-md text-sm font-semibold transition ${
                  isSelected
                    ? "bg-amber-500 text-emerald-950"
                    : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/20"
                }`}
              >
                {day.getUTCDate()}
              </button>
            );
          }),
        )}
      </div>

      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        {selected ? (
          <>
            Fecha elegida:{" "}
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {DAY_LABEL_FULL.format(new Date(selected.date))}
            </span>{" "}
            — {selected.capacity} {selected.capacity === 1 ? "cupo disponible" : "cupos disponibles"}
          </>
        ) : (
          "Elegí una fecha resaltada"
        )}
      </p>
    </div>
  );
}
