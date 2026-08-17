"use client";

import { Search, Menu, X, Plane } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Propuesta visual alternativa de header para el vertical Turismo —
// portada desde el sandbox de Ecommerce (layout "turismo" en
// aliiatech-template-ecommerce), que colisionaba conceptualmente con este
// vertical real (buscador de fechas/pasajeros, "reservas", itinerarios).
// Acá esos mismos elementos SÍ tienen sentido porque este es el vertical
// real de reservas de tours — a diferencia del sandbox de Ecommerce, no
// hay Cart/Wishlist (un tour no se "agrega al carrito", se consulta/
// reserva directo, ver TourBookingForm). Segunda opción de diseño junto a
// TourismLayout.tsx — todavía no hay un selector real que alterne entre
// las dos, ver nota en CONTRACT.md.
export function TourismHeaderAlt({
  tenant,
  basePath,
  customerName,
  announcementMessage,
}: {
  tenant: {
    name: string;
    category?: string | null;
    aboutText: string | null;
    contactEmail: string | null;
    whatsappPhone: string | null;
  };
  basePath: string;
  customerName: string | null;
  announcementMessage?: string | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: `${basePath}/tours`, label: "Destinos" },
    tenant.aboutText ? { href: `${basePath}/sobre-nosotros`, label: "Nuestra Agencia" } : null,
    tenant.contactEmail || tenant.whatsappPhone
      ? { href: `${basePath}/contacto`, label: "Asesoría" }
      : null,
  ].filter((link): link is { href: string; label: string } => link !== null);

  return (
    <header className="sticky top-0 z-50">
      {announcementMessage && (
        <div className="bg-sky-600 px-4 py-2 text-center text-xs font-medium text-white tracking-wide">
          {announcementMessage}
        </div>
      )}

      {/* DESKTOP */}
      <div className="hidden lg:block bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md shadow-sm border-b border-sky-100 dark:border-sky-900/30">
        <div className="mx-auto max-w-7xl px-8 py-5">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link href={basePath || "/"} className="flex flex-col items-center justify-center group">
              <div className="flex items-center gap-2">
                <Plane className="h-6 w-6 text-sky-500 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span className="text-2xl font-light text-slate-900 dark:text-white tracking-widest uppercase">
                  {tenant.name}
                </span>
              </div>
              {tenant.category && (
                <span className="text-[10px] text-sky-600 dark:text-sky-400 font-medium tracking-[0.2em] uppercase mt-1">
                  {tenant.category}
                </span>
              )}
            </Link>

            <div className="flex items-center justify-end gap-6">
              <Link
                href={customerName ? `${basePath}/cuenta` : `${basePath}/cuenta/login`}
                className="text-slate-500 hover:text-sky-600 text-sm font-medium transition-colors"
              >
                {customerName ? "Mi cuenta" : "Ingresar"}
              </Link>
              <Link
                href={`${basePath}/tours`}
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 py-2 text-sm font-semibold transition-colors"
              >
                Reservar ahora
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex flex-col lg:hidden bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md shadow-sm border-b border-sky-100 dark:border-sky-900/30">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-slate-600 dark:text-slate-300">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href={basePath || "/"} className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-sky-500" />
            <span className="text-lg font-light text-slate-900 dark:text-white uppercase tracking-widest">
              {tenant.name}
            </span>
          </Link>

          <Link href={`${basePath}/tours`} className="text-sm font-semibold text-sky-600 dark:text-sky-400">
            Reservar
          </Link>
        </div>

        {mobileOpen && (
          <div className="px-6 py-6 flex flex-col gap-4 border-t border-sky-50 dark:border-sky-900/30 bg-white dark:bg-neutral-950">
            <form action={`${basePath}/tours`} className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                name="destino"
                placeholder="Buscar destino..."
                className="w-full bg-slate-50 dark:bg-slate-900 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none"
              />
            </form>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-lg font-light text-slate-800 dark:text-slate-200">
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                href={customerName ? `${basePath}/cuenta` : `${basePath}/cuenta/login`}
                className="text-sm font-medium text-slate-600 dark:text-slate-400"
              >
                {customerName ? "Mi cuenta" : "Ingresar"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
