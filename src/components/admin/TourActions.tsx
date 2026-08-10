"use client";

import { useTransition } from "react";

import { deleteTour } from "@/lib/actions/tours";

export function TourActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm("¿Eliminar este tour? Esta acción no se puede deshacer.")) {
          startTransition(() => deleteTour(id));
        }
      }}
      className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
    >
      Eliminar
    </button>
  );
}
