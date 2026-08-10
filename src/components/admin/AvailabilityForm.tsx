"use client";

import { useActionState } from "react";

import type { AvailabilityFormState } from "@/lib/actions/tour-availability";

const inputClass =
  "mt-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-900";

export function AvailabilityForm({
  action,
}: {
  action: (state: AvailabilityFormState, formData: FormData) => Promise<AvailabilityFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      {state?.error && (
        <p className="w-full rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Fecha
        </label>
        <input name="date" type="date" required className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Cupos
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
        {pending ? "Agregando…" : "+ Agregar fecha"}
      </button>
    </form>
  );
}
