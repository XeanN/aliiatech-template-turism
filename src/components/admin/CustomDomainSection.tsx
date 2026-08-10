"use client";

import { useActionState } from "react";

import { setOwnCustomDomain, type CustomDomainState } from "@/lib/actions/custom-domain";

const initialState: CustomDomainState = {};

// Reusable en cualquier verticalType — e-commerce, marketplace, salón de
// belleza o el hub. Guarda el dominio directo (sin pasar por
// AdminRequest/staff, a diferencia del cambio de subdominio), pero no
// hace nada visible hasta que el DNS del dominio apunte a esta
// plataforma y Staff lo confirme en Cloudflare — ese paso sigue siendo
// manual (ver CLAUDE.md).
export function CustomDomainSection({ customDomain }: { customDomain: string | null }) {
  const [state, formAction, isPending] = useActionState(setOwnCustomDomain, initialState);

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
      <div>
        <p className="text-sm font-medium">Dominio propio</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {customDomain
            ? `Conectado: ${customDomain}`
            : "Todavía no conectaste un dominio propio."}
        </p>
      </div>

      <form action={formAction} className="flex flex-wrap items-center gap-2">
        <input
          name="customDomain"
          placeholder="midominio.com"
          defaultValue={customDomain ?? ""}
          className="min-w-0 flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          {isPending ? "Guardando..." : "Guardar"}
        </button>
      </form>

      <p className="text-xs text-neutral-400 dark:text-neutral-600">
        Después de guardar, avísale al equipo para apuntar el DNS y
        activar el certificado — el dominio no funciona solo con esto.
      </p>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-emerald-600" role="status">
          Guardado.
        </p>
      )}
    </section>
  );
}
