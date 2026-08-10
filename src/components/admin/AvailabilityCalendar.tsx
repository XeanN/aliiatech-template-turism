"use client";

import { useMemo, useState, useTransition } from "react";

import { dateKey, getMonthGrid, WEEKDAY_LABELS } from "@/lib/calendar-grid";

type AvailabilityEntry = { id: string; date: string; capacity: number };

const MONTH_LABEL = new Intl.DateTimeFormat("es-PE", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function AvailabilityCalendar({
  availability,
  onDeleteMany,
}: {
  availability: AvailabilityEntry[];
  onDeleteMany: (ids: string[]) => Promise<void>;
}) {
  const byKey = useMemo(() => {
    const map = new Map<string, AvailabilityEntry>();
    for (const a of availability) map.set(a.date.slice(0, 10), a);
    return map;
  }, [availability]);

  const [cursor, setCursor] = useState(() => {
    const first = availability[0] ? new Date(availability[0].date) : new Date();
    return new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1));
  });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();

  // Si se llega a esta página sin ninguna fecha cargada todavía, cursor
  // arranca en el mes actual (fallback de arriba). Cuando el tenant
  // agrega su primera fecha (0 → N), sin esto el calendario se queda
  // trabado en el mes viejo y la fecha recién cargada puede no ser
  // visible sin navegar manualmente — se ajusta acá siguiendo el patrón
  // de "ajustar estado durante el render" (mismo criterio que
  // AdminShell con prevPathname), no en un efecto.
  const [prevCount, setPrevCount] = useState(availability.length);
  if (availability.length !== prevCount) {
    setPrevCount(availability.length);
    if (prevCount === 0 && availability.length > 0) {
      const first = new Date(availability[0].date);
      setCursor(new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1)));
    }
  }

  const weeks = getMonthGrid(cursor.getUTCFullYear(), cursor.getUTCMonth());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleDelete() {
    const ids = Array.from(selected);
    startTransition(async () => {
      await onDeleteMany(ids);
      setSelected(new Set());
    });
  }

  if (availability.length === 0) {
    return (
      <p className="rounded-lg border border-neutral-200 bg-white p-6 text-center text-sm text-neutral-400 dark:border-neutral-800 dark:bg-neutral-950">
        Este tour todavía no tiene fechas de disponibilidad.
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setCursor(new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() - 1, 1)))
          }
          className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <p className="text-sm font-semibold capitalize">{MONTH_LABEL.format(cursor)}</p>
        <button
          type="button"
          onClick={() =>
            setCursor(new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1)))
          }
          className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
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

            const isSelected = selected.has(entry.id);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(entry.id)}
                className={`flex aspect-square flex-col items-center justify-center gap-0.5 rounded-md text-sm font-semibold transition ${
                  isSelected
                    ? "bg-red-100 text-red-800 ring-2 ring-red-400 dark:bg-red-500/15 dark:text-red-300"
                    : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/20"
                }`}
              >
                <span>{day.getUTCDate()}</span>
                <span className="text-[10px] font-normal">{entry.capacity} cupos</span>
              </button>
            );
          }),
        )}
      </div>

      <p className="mt-3 text-xs text-neutral-400">
        Hacé clic en una o varias fechas para seleccionarlas y eliminarlas.
      </p>

      {selected.size > 0 && (
        <div className="mt-3 flex items-center justify-between rounded-md bg-red-50 px-4 py-3 dark:bg-red-500/10">
          <p className="text-sm text-red-800 dark:text-red-300">
            {selected.size} fecha{selected.size === 1 ? "" : "s"} seleccionada
            {selected.size === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {pending ? "Eliminando…" : "Eliminar seleccionadas"}
          </button>
        </div>
      )}
    </div>
  );
}
