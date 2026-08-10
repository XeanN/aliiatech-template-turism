"use client";

import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import { logout, type LogoutState } from "@/lib/actions/auth";

const initialLogoutState: LogoutState = {};

export function UserMenu({ tenantName }: { tenantName: string }) {
  const [open, setOpen] = useState(false);
  const [logoutState, logoutAction] = useActionState(logout, initialLogoutState);
  const initial = tenantName.trim().charAt(0).toUpperCase() || "?";

  // Navegación real (no el router de Next.js) — mismo fix que el login,
  // ver comentario en src/lib/actions/auth.ts.
  useEffect(() => {
    if (logoutState.redirectUrl) {
      window.location.href = logoutState.redirectUrl;
    }
  }, [logoutState.redirectUrl]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
          {initial}
        </span>
        <span className="max-w-32 truncate text-sm font-medium">
          {tenantName}
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
            <Link
              href="/admin/configuracion"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Settings className="h-4 w-4" />
              Configuración
            </Link>
            <div className="my-1 border-t border-neutral-200 dark:border-neutral-800" />
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
