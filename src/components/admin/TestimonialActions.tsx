"use client";

import { useTransition } from "react";

import { deleteTestimonial, resolveTestimonial } from "@/lib/actions/testimonials";

export function TestimonialActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => resolveTestimonial(id, "APPROVED"))}
        className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-neutral-900"
      >
        Aprobar
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => resolveTestimonial(id, "REJECTED"))}
        className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-800"
      >
        Rechazar
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          if (confirm("¿Eliminar este testimonio? Esta acción no se puede deshacer.")) {
            startTransition(() => deleteTestimonial(id));
          }
        }}
        className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
      >
        Eliminar
      </button>
    </div>
  );
}
