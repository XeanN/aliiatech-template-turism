"use client";

import { useActionState } from "react";

import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { PromotionFormState } from "@/lib/actions/tour-promotions";

// Shape mínimo (sin `@prisma/client`, ver CONTRACT.md).
type PromotionLite = {
  title: string;
  badge: string | null;
  description: string | null;
  image: string | null;
  discountPercent: number | null;
  tourId: string | null;
  startDate: Date | null;
  endDate: Date | null;
  active: boolean;
};

const inputClass =
  "mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-900";
const labelClass = "block text-sm font-medium text-neutral-700 dark:text-neutral-300";

function toDateInput(value: Date | null | undefined) {
  return value ? value.toISOString().slice(0, 10) : "";
}

// Copia visual de src/components/admin/PromotionForm.tsx.
export function PromotionForm({
  action,
  promotion,
  tours,
  submitLabel,
}: {
  action: (state: PromotionFormState, formData: FormData) => Promise<PromotionFormState>;
  promotion?: PromotionLite;
  tours: { id: string; title: string }[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-md space-y-4">
      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </p>
      )}

      <div>
        <label className={labelClass}>Título</label>
        <input name="title" defaultValue={promotion?.title} required className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Badge (opcional)</label>
        <input
          name="badge"
          defaultValue={promotion?.badge ?? ""}
          placeholder="Early Bird"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Descripción (opcional)</label>
        <textarea
          name="description"
          defaultValue={promotion?.description ?? ""}
          rows={3}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Imagen (opcional)</label>
        <ImageUploadField name="image" label="" defaultValue={promotion?.image ?? ""} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>% de descuento (opcional)</label>
          <input
            name="discountPercent"
            type="number"
            min="0"
            max="100"
            defaultValue={promotion?.discountPercent ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Tour relacionado (opcional)</label>
          <select name="tourId" defaultValue={promotion?.tourId ?? ""} className={inputClass}>
            <option value="">Ninguno</option>
            {tours.map((tour) => (
              <option key={tour.id} value={tour.id}>
                {tour.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Desde (opcional)</label>
          <input
            name="startDate"
            type="date"
            defaultValue={toDateInput(promotion?.startDate)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Hasta (opcional)</label>
          <input
            name="endDate"
            type="date"
            defaultValue={toDateInput(promotion?.endDate)}
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={promotion?.active ?? true} />
        Activa
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {pending ? "Guardando…" : submitLabel}
      </button>
    </form>
  );
}
