"use client";

import Link from "next/link";
import { useState } from "react";

import { parseSocialLinks } from "@/lib/social-links";

// Layout público del vertical Turismo — árbol propio, separado del
// chrome de e-commerce/marketplace de servicios (mismo criterio que
// ServicesMarketplaceLayout/BeautyHubLayout). Paleta emerald + acento
// cálido, inspirada en el proyecto de referencia del usuario ("South
// American Secrets") — solo paleta/estructura, nunca su código
// (arquitectura completamente distinta).
export function TourismLayout({
  tenant,
  basePath,
  customerName,
  children,
}: {
  tenant: {
    id: string;
    name: string;
    logoUrl: string | null;
    whatsappPhone: string | null;
    contactEmail: string | null;
    aboutText: string | null;
    legalTerms: unknown;
    legalPrivacy: unknown;
    legalCookies: unknown;
    socialLinks: unknown;
  };
  basePath: string;
  // Nombre del viajero logueado (cuenta de cliente, ver
  // docs/roadmap/vertical-turismo.md) — null si navega como invitado, no
  // se le impide reservar sin cuenta.
  customerName: string | null;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: basePath || "/", label: "Inicio" },
    { href: `${basePath}/tours`, label: "Tours" },
    { href: `${basePath}/sobre-nosotros`, label: "Nosotros" },
    { href: `${basePath}/blog`, label: "Blog" },
    { href: `${basePath}/contacto`, label: "Contacto" },
  ];

  const legalLinks = [
    tenant.legalTerms && { href: `${basePath}/terminos`, label: "Términos y Condiciones" },
    tenant.legalPrivacy && { href: `${basePath}/privacidad`, label: "Política de Privacidad" },
    tenant.legalCookies && { href: `${basePath}/cookies`, label: "Política de Cookies" },
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  const social = parseSocialLinks(tenant.socialLinks);
  const socialLinks = [
    social.facebook && { href: social.facebook, label: "Facebook" },
    social.instagram && { href: social.instagram, label: "Instagram" },
    social.tiktok && { href: social.tiktok, label: "TikTok" },
    social.youtube && { href: social.youtube, label: "YouTube" },
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/95 backdrop-blur dark:border-emerald-900 dark:bg-neutral-950/95">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6">
          <Link href={basePath || "/"} className="flex items-center gap-2">
            {tenant.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tenant.logoUrl}
                alt={tenant.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            )}
            <span className="text-lg font-semibold text-emerald-950 dark:text-emerald-100">
              {tenant.name}
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-5 text-sm font-medium text-neutral-600 dark:text-neutral-400 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-emerald-700 dark:hover:text-emerald-400">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href={customerName ? `${basePath}/cuenta` : `${basePath}/cuenta/login`}
              className="text-sm font-medium text-neutral-600 hover:text-emerald-700 dark:text-neutral-400 dark:hover:text-emerald-400"
            >
              {customerName ? "Mi cuenta" : "Ingresar"}
            </Link>
            <Link
              href={`${basePath}/tours`}
              className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-emerald-950 hover:bg-amber-400"
            >
              Reservar ahora
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 text-neutral-700 md:hidden dark:border-neutral-700 dark:text-neutral-300"
            aria-label="Abrir menú"
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        {open && (
          <nav className="border-t border-neutral-200 bg-white px-4 py-3 md:hidden dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-neutral-700 hover:text-emerald-700 dark:text-neutral-300"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={customerName ? `${basePath}/cuenta` : `${basePath}/cuenta/login`}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-neutral-700 hover:text-emerald-700 dark:text-neutral-300"
              >
                {customerName ? "Mi cuenta" : "Ingresar"}
              </Link>
              <Link
                href={`${basePath}/tours`}
                onClick={() => setOpen(false)}
                className="mt-1 inline-block w-fit rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-emerald-950"
              >
                Reservar ahora
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-emerald-950 text-emerald-50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-white">{tenant.name}</p>
            {tenant.aboutText && (
              <p className="mt-2 line-clamp-4 text-sm text-emerald-200">{tenant.aboutText}</p>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Explorar</p>
            <ul className="mt-3 space-y-2 text-sm text-emerald-200">
              {navLinks
                .filter((link) => link.label !== "Contacto")
                .map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Compañía</p>
            <ul className="mt-3 space-y-2 text-sm text-emerald-200">
              <li>
                <Link href={`${basePath}/sobre-nosotros`} className="hover:text-white">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/contacto`} className="hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Contacto</p>
            <ul className="mt-3 space-y-2 text-sm text-emerald-200">
              {tenant.contactEmail && <li>{tenant.contactEmail}</li>}
              {tenant.whatsappPhone && (
                <li>
                  <a
                    href={`https://wa.me/${tenant.whatsappPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
            {socialLinks.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-emerald-900 px-4 py-4 text-center text-xs text-emerald-300 sm:px-6">
          <p>
            © {new Date().getFullYear()} {tenant.name}. Todos los derechos reservados.
          </p>
          {legalLinks.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
