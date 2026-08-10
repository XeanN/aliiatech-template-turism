"use client";

import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";

export function PasswordInput({
  label,
  name,
  required,
  minLength,
  autoComplete,
}: {
  label: string;
  name: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <label htmlFor={id} className="flex flex-col gap-1 text-sm font-medium">
      {label}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 pr-10 text-base font-normal outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          tabIndex={-1}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </label>
  );
}
