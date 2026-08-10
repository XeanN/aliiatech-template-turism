"use client";

import { useActionState } from "react";

import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { TourFormState } from "@/lib/actions/tours";

// Shape mínimo (sin `import type { Tour } from "@prisma/client"` — este
// repo no tiene Prisma, ver CONTRACT.md).
type TourLite = {
  title: string;
  slug: string;
  destination: string | null;
  price: unknown;
  currency: string;
  description: string;
  images: unknown;
  includes: unknown;
  excludes: unknown;
  itinerary: unknown;
  faqs: unknown;
  extras: unknown;
  status: string;
};

const inputClass =
  "mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100";
const labelClass = "block text-sm font-medium text-neutral-700 dark:text-neutral-300";

function linesFromJson(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value.filter((v): v is string => typeof v === "string").join("\n");
}

function faqsFromJson(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) =>
      item && typeof item === "object" && "question" in item && "answer" in item
        ? `${(item as { question: string }).question} :: ${(item as { answer: string }).answer}`
        : null,
    )
    .filter((v): v is string => Boolean(v))
    .join("\n");
}

function extrasFromJson(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) =>
      item && typeof item === "object" && "name" in item && "price" in item
        ? `${(item as { name: string }).name} :: ${(item as { price: number }).price}`
        : null,
    )
    .filter((v): v is string => Boolean(v))
    .join("\n");
}

// Copia visual de src/components/admin/TourForm.tsx.
export function TourForm({
  action,
  tour,
  submitLabel,
}: {
  action: (state: TourFormState, formData: FormData) => Promise<TourFormState>;
  tour?: TourLite;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const images = Array.isArray(tour?.images) ? (tour.images as string[]) : [];

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </p>
      )}

      <div>
        <label className={labelClass}>Título</label>
        <input name="title" defaultValue={tour?.title} required className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Slug (URL) — déjalo vacío para generarlo del título</label>
        <input
          name="slug"
          defaultValue={tour?.slug}
          placeholder="machu-picchu-tour-privado"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Destino</label>
          <input
            name="destination"
            defaultValue={tour?.destination ?? ""}
            placeholder="Cusco, Perú"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={labelClass}>Precio</label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={tour ? String(tour.price) : ""}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Moneda</label>
            <select name="currency" defaultValue={tour?.currency ?? "PEN"} className={inputClass}>
              <option value="PEN">PEN</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>Descripción</label>
        <textarea
          name="description"
          defaultValue={tour?.description}
          required
          rows={4}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Foto de portada</label>
        <ImageUploadField name="imageUrl" label="" defaultValue={images[0] ?? ""} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Incluye — uno por línea</label>
          <textarea
            name="includes"
            defaultValue={linesFromJson(tour?.includes)}
            rows={4}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>No incluye — uno por línea</label>
          <textarea
            name="excludes"
            defaultValue={linesFromJson(tour?.excludes)}
            rows={4}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Itinerario — un paso por línea</label>
        <textarea
          name="itinerary"
          defaultValue={linesFromJson(tour?.itinerary)}
          rows={4}
          placeholder={"06:00 Recojo en el hotel\n08:00 Llegada a Aguas Calientes"}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          Preguntas frecuentes — formato: Pregunta :: Respuesta (una por línea)
        </label>
        <textarea
          name="faqs"
          defaultValue={faqsFromJson(tour?.faqs)}
          rows={3}
          placeholder="¿Incluye guía? :: Sí, guía turístico certificado."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          Extras opcionales — formato: Nombre :: Precio (uno por línea)
        </label>
        <textarea
          name="extras"
          defaultValue={extrasFromJson(tour?.extras)}
          rows={3}
          placeholder={"Almuerzo buffet premium :: 45\nGuía privado :: 50"}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-neutral-400">
          Aparecen como opciones adicionales que el cliente puede sumar a su
          reserva en el checkout.
        </p>
      </div>

      <div>
        <label className={labelClass}>Estado</label>
        <select name="status" defaultValue={tour?.status ?? "DRAFT"} className={inputClass}>
          <option value="DRAFT">Borrador</option>
          <option value="PUBLISHED">Publicado</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {pending ? "Guardando…" : submitLabel}
      </button>
    </form>
  );
}
