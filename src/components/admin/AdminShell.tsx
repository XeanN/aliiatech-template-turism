"use client";

import { Bell, ExternalLink, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AdminSidebarNav } from "@/components/admin/AdminSidebarNav";
import { ThemeToggle } from "@/components/admin/ThemeToggle";
import { UserMenu } from "@/components/admin/UserMenu";

// Antes el sidebar era fijo (w-60, siempre visible) sin ningún modo
// mobile — en un celular (360-400px de ancho) eso dejaba casi todo el
// contenido real aplastado en una franja mínima. Debajo de `lg` el
// sidebar pasa a ser un drawer que se abre con el botón de hamburguesa
// y se cierra solo al navegar; de `lg` para arriba se comporta exacto
// igual que antes (columna fija siempre visible).
export function AdminShell({
  tenantName,
  verticalType,
  storeUrl,
  children,
}: {
  tenantName: string;
  verticalType:
    | "ECOMMERCE"
    | "SERVICES_MARKETPLACE"
    | "BEAUTY_SALON"
    | "BEAUTY_HUB"
    | "TURISMO"
    | "BEAUTY_STANDALONE"
    | "LANDING_SERVICES";
  storeUrl: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Cierra el drawer al navegar — reset durante el render (no en un
  // efecto) siguiendo el patrón recomendado por React para "resetear
  // estado cuando cambia una prop/valor derivado".
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Glosscanner (BEAUTY_SALON/BEAUTY_HUB) lleva su propia identidad
  // visual — fondo cálido y acento rosewood en vez del violeta genérico
  // de e-commerce/TuMaestro (paleta en src/app/beauty-theme.css, portada
  // 1:1 del prototipo original). Sin variante oscura a propósito: el
  // producto real de Glosscanner no maneja modo oscuro hoy.
  const isBeauty =
    verticalType === "BEAUTY_SALON" ||
    verticalType === "BEAUTY_HUB" ||
    verticalType === "BEAUTY_STANDALONE";

  return (
    <div
      className={
        isBeauty
          ? "flex min-h-screen bg-beauty-pearl text-beauty-midnight"
          : "flex min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
      }
    >
      {open && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col transition-transform duration-200 lg:static lg:z-auto lg:w-60 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${
          isBeauty
            ? "border-r border-beauty-rosewood/20 bg-white"
            : "border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
        }`}
      >
        <div
          className={`flex items-center justify-between border-b px-5 py-5 ${
            isBeauty ? "border-beauty-rosewood/20" : "border-neutral-200 dark:border-neutral-800"
          }`}
        >
          <div className="truncate">
            {isBeauty && (
              <p className="truncate text-xs text-beauty-rosewood">Tu salón</p>
            )}
            <p className="truncate text-sm font-semibold">{tenantName}</p>
          </div>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <AdminSidebarNav verticalType={verticalType} />
        {!isBeauty && (
          <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
            <ThemeToggle />
          </div>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={`flex items-center justify-between gap-2 border-b px-4 py-3 sm:justify-end sm:px-8 ${
            isBeauty ? "border-beauty-rosewood/20" : "border-neutral-200 dark:border-neutral-800"
          }`}
        >
          {isBeauty && (
            <span className="rounded-full bg-beauty-champagne/20 px-3 py-1 text-xs font-medium text-beauty-midnight sm:mr-auto">
              Buenos días
            </span>
          )}
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
            className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={storeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 sm:px-3"
            >
              <span className="hidden sm:inline">Ver tienda</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              aria-label="Notificaciones"
              className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <Bell className="h-4 w-4" />
            </button>
            <UserMenu tenantName={tenantName} />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
