"use client";

import { useActionState, useState } from "react";

import {
  clearPaymentGatewaySecretKey,
  savePaymentGatewaySettings,
  type PaymentGatewayState,
} from "@/lib/actions/payment-gateway";

const inputClass =
  "rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-900";

const initialState: PaymentGatewayState = {};

const PROVIDER_LABEL: Record<string, string> = {
  NONE: "Ninguna (seguir sin cobrar en el momento)",
  CULQI: "Culqi",
  IZIPAY: "IziPay",
};

export function PaymentGatewaySettingsForm({
  provider,
  publicKey,
  hasSecretKey,
}: {
  provider: string;
  publicKey: string | null;
  hasSecretKey: boolean;
}) {
  const [state, formAction, isPending] = useActionState(
    savePaymentGatewaySettings,
    initialState,
  );
  const [selectedProvider, setSelectedProvider] = useState(provider);
  const [secretConfigured, setSecretConfigured] = useState(hasSecretKey);

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Todavía no procesamos el cobro real desde acá — esto solo guarda tus
        credenciales para cuando esa parte esté lista. Mientras tanto, tus
        pedidos/reservas siguen funcionando igual que hoy (sin pago en el
        momento).
      </p>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Pasarela
        <select
          name="provider"
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className={inputClass}
        >
          {Object.entries(PROVIDER_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      {selectedProvider !== "NONE" && (
        <>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Llave pública
            <input
              type="text"
              name="publicKey"
              defaultValue={publicKey ?? ""}
              placeholder={selectedProvider === "CULQI" ? "pk_live_..." : "..."}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            Llave secreta
            <input
              type="password"
              name="secretKey"
              placeholder={
                secretConfigured
                  ? "•••••••••• (dejar en blanco para no cambiarla)"
                  : "sk_live_..."
              }
              autoComplete="off"
              className={inputClass}
            />
            {secretConfigured && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Ya tenés una guardada — por seguridad no se vuelve a mostrar.{" "}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("¿Borrar la llave secreta guardada?")) {
                      clearPaymentGatewaySecretKey();
                      setSecretConfigured(false);
                    }
                  }}
                  className="underline"
                >
                  Borrarla
                </button>
              </span>
            )}
          </label>
        </>
      )}

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Guardado.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
      >
        {isPending ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
