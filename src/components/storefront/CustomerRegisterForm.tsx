"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import { PasswordInput } from "@/components/PasswordInput";
import { LocationSelects } from "@/components/marketplace/LocationSelects";
import {
  customerRegister,
  type CustomerAuthState,
} from "@/lib/actions/customer-auth";

const initialState: CustomerAuthState = {};

const inputClass =
  "rounded-md border border-neutral-300 px-3 py-2 text-base font-normal outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900";

export function CustomerRegisterForm({
  tenantId,
  basePath,
  simplified = false,
}: {
  tenantId: string;
  basePath: string;
  // Turismo: sin dirección de envío ni DNI, no aplican a una reserva de
  // tour (ver docs/roadmap/vertical-turismo.md).
  simplified?: boolean;
}) {
  const action = customerRegister.bind(null, tenantId, basePath);
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [department, setDepartment] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  // Navegación real (no el router de Next.js) — ver el comentario en
  // customerRegister sobre el 404 momentáneo al dejar que Auth.js
  // redirija solo tras un Server Action hacia una ruta hermana.
  useEffect(() => {
    if (state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state.redirectUrl]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Nombre
          <input name="firstName" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Apellido
          <input name="lastName" required className={inputClass} />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Email
        <input
          name="email"
          type="email"
          required
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Teléfono (opcional)
        <input
          name="phone"
          className={inputClass}
        />
      </label>

      {!simplified && (
        <>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">Dirección</span>
            <input type="hidden" name="department" value={department} />
            <input type="hidden" name="province" value={province} />
            <input type="hidden" name="district" value={district} />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <LocationSelects
                department={department}
                province={province}
                district={district}
                onDepartmentChange={setDepartment}
                onProvinceChange={setProvince}
                onDistrictChange={setDistrict}
                required
                className={inputClass}
              />
            </div>
            <input
              name="addressLine"
              placeholder="Calle, número, referencia"
              required
              className={inputClass}
            />
          </div>

          <label className="flex flex-col gap-1 text-sm font-medium">
            DNI (opcional)
            <input
              name="dni"
              inputMode="numeric"
              maxLength={8}
              placeholder="8 dígitos"
              className={inputClass}
            />
          </label>
        </>
      )}

      <PasswordInput
        label="Contraseña"
        name="password"
        minLength={8}
        autoComplete="new-password"
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
        {isPending ? "Creando cuenta..." : "Crear cuenta"}
      </button>

      <p className="text-center text-sm text-neutral-500">
        ¿Ya tenés cuenta?{" "}
        <Link
          href={`${basePath}/cuenta/login`}
          className="font-medium underline"
        >
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
