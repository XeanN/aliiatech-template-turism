"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";

import { PasswordInput } from "@/components/PasswordInput";
import {
  customerLogin,
  type CustomerAuthState,
} from "@/lib/actions/customer-auth";

const initialState: CustomerAuthState = {};

export function CustomerLoginForm({
  tenantId,
  basePath,
}: {
  tenantId: string;
  basePath: string;
}) {
  const action = customerLogin.bind(null, tenantId, basePath);
  const [state, formAction, isPending] = useActionState(action, initialState);

  // Navegación real (no el router de Next.js) — ver el comentario en
  // customerLogin sobre el 404 momentáneo al dejar que Auth.js redirija
  // solo tras un Server Action hacia una ruta hermana.
  useEffect(() => {
    if (state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state.redirectUrl]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium">
        Email
        <input
          name="email"
          type="email"
          required
          className="rounded-md border border-neutral-300 px-3 py-2 text-base font-normal outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
        />
      </label>

      <PasswordInput
        label="Contraseña"
        name="password"
        autoComplete="current-password"
        required
      />

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-md bg-neutral-900 px-4 py-2.5 font-medium text-white hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-neutral-900"
      >
        {isPending ? "Ingresando..." : "Iniciar sesión"}
      </button>

      <div className="flex flex-col gap-1 text-center text-sm text-neutral-500">
        <Link
          href={`${basePath}/cuenta/olvide-password`}
          className="font-medium underline"
        >
          Olvidé mi contraseña
        </Link>
        <span>
          ¿No tenés cuenta?{" "}
          <Link
            href={`${basePath}/cuenta/registro`}
            className="font-medium underline"
          >
            Registrate
          </Link>
        </span>
      </div>
    </form>
  );
}
