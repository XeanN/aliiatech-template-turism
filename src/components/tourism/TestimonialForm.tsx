"use client";

import { Star } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

import { submitTestimonial, type SubmitTestimonialState } from "@/lib/actions/testimonials";

const initialState: SubmitTestimonialState = {};

export function TestimonialForm({
  tenantId,
  basePath,
  tourId,
}: {
  tenantId: string;
  basePath: string;
  tourId?: string | null;
}) {
  const action = submitTestimonial.bind(null, tenantId, basePath, tourId ?? null);
  const [state, formAction, isPending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  const [prevSuccess, setPrevSuccess] = useState(state.success);
  if (state.success !== prevSuccess) {
    setPrevSuccess(state.success);
    if (state.success) {
      setRating(5);
    }
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
    >
      <p className="text-sm font-semibold">Contanos tu experiencia</p>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => {
          const value = i + 1;
          const filled = value <= (hovered ?? rating);
          return (
            <button
              key={value}
              type="button"
              aria-label={`${value} estrellas`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(null)}
              className="p-0.5"
            >
              <Star
                className={`h-6 w-6 ${
                  filled
                    ? "fill-amber-400 text-amber-400"
                    : "fill-neutral-200 text-neutral-200 dark:fill-neutral-700 dark:text-neutral-700"
                }`}
              />
            </button>
          );
        })}
      </div>
      <input type="hidden" name="rating" value={rating} />

      <input
        type="text"
        name="authorName"
        placeholder="Tu nombre"
        required
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 dark:border-neutral-700 dark:bg-neutral-900"
      />

      <textarea
        name="text"
        placeholder="¿Cómo fue tu viaje con nosotros?"
        rows={3}
        required
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 dark:border-neutral-700 dark:bg-neutral-900"
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-900 disabled:opacity-60"
      >
        {isPending ? "Enviando..." : "Enviar testimonio"}
      </button>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          ¡Gracias! Tu testimonio se va a mostrar apenas lo revisemos.
        </p>
      )}
    </form>
  );
}
