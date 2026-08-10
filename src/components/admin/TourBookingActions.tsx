"use client";

import { useTransition } from "react";

import { resolveTourBooking } from "@/lib/actions/tour-bookings";

export function TourBookingActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => resolveTourBooking(id, "CONFIRMED"))}
        className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-neutral-900"
      >
        Confirmar
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => resolveTourBooking(id, "CANCELLED"))}
        className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
      >
        Cancelar
      </button>
    </div>
  );
}
