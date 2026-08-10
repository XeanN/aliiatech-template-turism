"use client";

import { useActionState } from "react";

import type { AvailabilityFormState } from "@/lib/actions/tour-availability";

const inputClass =
  "mt-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-900";

const DAYS = [
  { value: 1, label: "Lun" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Mié" },
  { value: 4, label: "Jue" },
  { value: 5, label: "Vie" },
  { value: 6, label: "Sáb" },
  { value: 0, label: "Dom" },
];

export function AvailabilityRangeForm({
  action,
}: {
  action: (state: AvailabilityFormState, formData: FormData) => Promise<AvailabilityFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-3">
      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Desde
          </label>
          <input name="startDate" type="date" required className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Hasta
          </label>
          <input name="endDate" type="date" required className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Cupos por fecha
          </label>
          <input
            name="capacity"
            type="number"
            min="0"
            step="1"
            defaultValue="10"
            required
            className={`${inputClass} w-24`}
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
        >
          {pending ? "Agregando…" : "+ Agregar rango"}
        </button>
      </div>

      <div>
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Días de la semana (opcional — dejalos todos vacíos para incluir todos)
        </p>
        <div className="mt-1 flex flex-wrap gap-3">
          {DAYS.map((day) => (
            <label
              key={day.value}
              className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400"
            >
              <input type="checkbox" name="daysOfWeek" value={day.value} />
              {day.label}
            </label>
          ))}
        </div>
      </div>

      <p className="text-xs text-neutral-400">
        Se crea una fecha por cada día del rango (o solo los días marcados
        arriba) con los mismos cupos. Las fechas que ya existan se dejan
        como están.
      </p>
    </form>
  );
}
