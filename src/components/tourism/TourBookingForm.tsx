"use client";

import { useActionState, useState } from "react";

import { createTourBooking, type TourBookingState } from "@/lib/actions/tour-bookings";
import { formatCurrency } from "@/lib/format";

import { TourDatePicker } from "./TourDatePicker";

type AvailabilityOption = { id: string; date: string; capacity: number };
type TourExtra = { name: string; price: number };

const inputClass =
  "mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 dark:border-neutral-700 dark:bg-neutral-900";

const initialState: TourBookingState = {};

export function TourBookingForm({
  tourId,
  price,
  currency,
  availability,
  extras,
  customer,
}: {
  tourId: string;
  price: number;
  currency: string;
  availability: AvailabilityOption[];
  extras: TourExtra[];
  // Si el viajero está logueado (cuenta de cliente), se prellenan sus
  // datos de contacto — sigue siendo editable, no se bloquea el campo.
  customer?: { name: string; email: string } | null;
}) {
  const action = createTourBooking.bind(null, tourId);
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [availabilityId, setAvailabilityId] = useState(availability[0]?.id ?? "");
  const [pax, setPax] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

  if (state.success) {
    return (
      <div className="mt-8 flex flex-col gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-500/10">
        <p className="font-semibold text-emerald-900 dark:text-emerald-300">¡Listo! Recibimos tu reserva.</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Te confirmamos por WhatsApp o email en breve.
        </p>
      </div>
    );
  }

  if (availability.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
        Todavía no hay fechas disponibles para este tour — escribinos para coordinar.
      </div>
    );
  }

  const selected = availability.find((a) => a.id === availabilityId);
  const maxPax = selected?.capacity ?? 1;
  const extrasTotal = extras
    .filter((extra) => selectedExtras.has(extra.name))
    .reduce((sum, extra) => sum + extra.price, 0);
  const subtotal = price * pax + extrasTotal;

  function toggleExtra(name: string) {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
      <input type="hidden" name="date" value={selected?.date.slice(0, 10) ?? ""} />

      {state.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Fecha</label>
        <div className="mt-2 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
          <TourDatePicker
            availability={availability}
            selectedId={availabilityId}
            onSelect={(id) => {
              setAvailabilityId(id);
              const opt = availability.find((a) => a.id === id);
              if (opt && pax > opt.capacity) setPax(opt.capacity);
            }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="pax" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Viajeros
        </label>
        <input
          id="pax"
          name="pax"
          type="number"
          min={1}
          max={maxPax}
          value={pax}
          onChange={(e) => setPax(Math.min(Math.max(Number(e.target.value) || 1, 1), maxPax))}
          className={`${inputClass} w-24`}
        />
      </div>

      {extras.length > 0 && (
        <div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Extras opcionales</p>
          <div className="mt-2 space-y-2">
            {extras.map((extra) => (
              <label
                key={extra.name}
                className="flex items-center justify-between gap-3 rounded-md border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="extras"
                    value={extra.name}
                    checked={selectedExtras.has(extra.name)}
                    onChange={() => toggleExtra(extra.name)}
                  />
                  {extra.name}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  + {formatCurrency(extra.price)} {currency}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="couponCode" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Código de cupón (opcional)
        </label>
        <input id="couponCode" name="couponCode" type="text" className={`${inputClass} uppercase`} />
      </div>

      <div className="space-y-4 border-t border-neutral-100 pt-4 dark:border-neutral-900">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Nombre completo
          </label>
          <input
            id="clientName"
            name="clientName"
            type="text"
            defaultValue={customer?.name ?? ""}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="clientEmail" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Email
          </label>
          <input
            id="clientEmail"
            name="clientEmail"
            type="email"
            defaultValue={customer?.email ?? ""}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="clientPhone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            WhatsApp
          </label>
          <input id="clientPhone" name="clientPhone" type="tel" placeholder="987654321" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Algo más que quieras contarnos (opcional)
          </label>
          <textarea id="message" name="message" rows={2} className={inputClass} />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-900">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Total estimado</p>
          <p className="text-xl font-semibold">
            {formatCurrency(subtotal)} {currency}
          </p>
        </div>
        <button
          type="submit"
          disabled={isPending || !selected}
          className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-amber-400 disabled:opacity-60"
        >
          {isPending ? "Enviando..." : "Confirmar reserva"}
        </button>
      </div>
      <p className="text-xs text-neutral-400">
        Esto es un pedido de reserva, no un cobro — te confirmamos disponibilidad y forma de pago por WhatsApp o email.
      </p>
    </form>
  );
}
