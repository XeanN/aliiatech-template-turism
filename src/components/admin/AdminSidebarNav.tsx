"use client";

import {
  Building2,
  Calendar,
  CalendarCheck,
  Camera,
  ClipboardCheck,
  Gift,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  LineChart,
  type LucideIcon,
  Mail,
  Megaphone,
  MessageSquareQuote,
  Newspaper,
  Package,
  Palette,
  Scale,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  UserPlus,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  // Solo beautySalonNavItems agrupa por sección hoy — el resto de
  // verticales queda como lista plana, sin headers (retrocompatible).
  section?: string;
};

const ecommerceNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/categorias", label: "Categorías", icon: Tag },
  { href: "/admin/ofertas", label: "Ofertas", icon: Megaphone },
  { href: "/admin/combos", label: "Combos", icon: Gift },
  { href: "/admin/resenas", label: "Reseñas", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/instagram", label: "Instagram", icon: Camera },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/tema", label: "Tema", icon: Palette },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
  { href: "/admin/legal", label: "Legal", icon: Scale },
];

// Vertical Turismo (propio, no una skin de e-commerce — ver
// docs/roadmap/vertical-turismo.md) — nav calcado 1:1 del proyecto de
// referencia del usuario (South American Secrets): Tours en vez de
// Productos, Disponibilidad y Reservas con fecha/cupos/extras/cupón
// propios, Promociones y Cupones que no existen en ningún otro vertical.
const tourismNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/tours", label: "Tours", icon: Package },
  { href: "/admin/disponibilidad", label: "Disponibilidad", icon: Calendar },
  { href: "/admin/reservas", label: "Reservas", icon: CalendarCheck },
  { href: "/admin/promociones", label: "Promociones", icon: Megaphone },
  { href: "/admin/cupones", label: "Cupones", icon: Gift },
  { href: "/admin/testimonios", label: "Testimonios", icon: MessageSquareQuote },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/clientes-turismo", label: "Clientes", icon: Users },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
  { href: "/admin/legal", label: "Legal", icon: Scale },
];

// Panel del marketplace de servicios (Tu Maestro) es deliberadamente
// distinto — nada de productos/pedidos/tema, solo lo que aplica a ese
// modo (ver docs/roadmap/marketplace-servicios-tumaestro.md, Fase 2).
const servicesMarketplaceNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/maestros", label: "Maestros", icon: Wrench },
  { href: "/admin/solicitudes", label: "Solicitudes", icon: Inbox },
  { href: "/admin/resenas-maestros", label: "Reseñas", icon: Star },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
  // /admin/legal es 100% genérico (solo lee legalTerms/Privacy/Cookies del
  // tenant) — se reusa tal cual, sin duplicar la página para marketplace.
  { href: "/admin/legal", label: "Legal", icon: Scale },
];

// Panel del salón de belleza (Glosscanner — ver
// docs/roadmap/3-marketplace-verticales-nuevos.md) — nada de e-commerce,
// es agenda/caja/clientas/inventario/equipo propios de un salón. Agrupado
// por secciones (a diferencia de las otras 3 verticales, que quedan como
// lista plana) para calzar 1:1 con el dashboard de referencia del
// prototipo original de Glosscanner.
const beautySalonNavItems: NavItem[] = [
  { href: "/admin", label: "Mi día", icon: LayoutDashboard, exact: true, section: "Inicio" },
  { href: "/admin/agenda", label: "Mi agenda", icon: Calendar, section: "Operaciones" },
  { href: "/admin/caja", label: "Mi caja", icon: Wallet, section: "Operaciones" },
  { href: "/admin/mis-productos", label: "Mis productos", icon: Package, section: "Operaciones" },
  { href: "/admin/clientas", label: "Mis clientas", icon: Users, section: "Personas" },
  { href: "/admin/equipo", label: "Mi equipo", icon: Wrench, section: "Personas" },
  // Reseñas de ESTE salón — BeautySalonReview.tenantId es el propio
  // salón (cada uno modera las suyas), no el hub, a diferencia de
  // Salones/Clientes/Solicitudes que sí son del hub. El prototipo
  // original no tenía esta feature, se mantiene igual acá.
  { href: "/admin/resenas-salones", label: "Reseñas", icon: Star, section: "Personas" },
  { href: "/admin/mis-numeros", label: "Mis números", icon: LineChart, section: "Análisis" },
  { href: "/admin/formalizate", label: "Formalízate", icon: ClipboardCheck, section: "Análisis" },
  { href: "/admin/perfil-salon", label: "Mi salón", icon: Building2, section: "Configuración" },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings, section: "Configuración" },
  { href: "/admin/legal", label: "Legal", icon: Scale, section: "Configuración" },
  { href: "/admin/ayuda", label: "Ayuda", icon: HelpCircle, section: "Configuración" },
];

// Belleza independiente (BEAUTY_STANDALONE) — mismo panel que un salón de
// Glosscanner (mismos modelos Beauty*), pero sin secciones propias del
// hub (Salones/Solicitudes/Clientes son de BEAUTY_HUB, no aplican acá).
const beautyStandaloneNavItems: NavItem[] = [
  { href: "/admin", label: "Mi día", icon: LayoutDashboard, exact: true, section: "Inicio" },
  { href: "/admin/agenda", label: "Mi agenda", icon: Calendar, section: "Operaciones" },
  { href: "/admin/caja", label: "Mi caja", icon: Wallet, section: "Operaciones" },
  { href: "/admin/mis-productos", label: "Mis productos", icon: Package, section: "Operaciones" },
  { href: "/admin/clientas", label: "Mis clientas", icon: Users, section: "Personas" },
  { href: "/admin/equipo", label: "Mi equipo", icon: Wrench, section: "Personas" },
  { href: "/admin/resenas-salones", label: "Reseñas", icon: Star, section: "Personas" },
  { href: "/admin/mis-numeros", label: "Mis números", icon: LineChart, section: "Análisis" },
  { href: "/admin/formalizate", label: "Formalízate", icon: ClipboardCheck, section: "Análisis" },
  { href: "/admin/perfil-salon", label: "Mi salón", icon: Building2, section: "Configuración" },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings, section: "Configuración" },
  { href: "/admin/legal", label: "Legal", icon: Scale, section: "Configuración" },
  { href: "/admin/ayuda", label: "Ayuda", icon: HelpCircle, section: "Configuración" },
];

// Landing de Servicios — dashboard genérico a propósito: los 12 layouts
// (ver docs/roadmap/4-landing-servicios-sistema-nuevo.md) todavía no están
// construidos, así que no hay nada propio del vertical que mostrar todavía
// (ni catálogo, ni reservas, ni proveedores) más allá de identidad y
// configuración básica del negocio.
const landingServicesNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
  { href: "/admin/legal", label: "Legal", icon: Scale },
];

// Panel del tenant único "glosscanner" (ver
// docs/roadmap/3-marketplace-verticales-nuevos.md) — identidad de marca,
// altas de salones, clientes registrados. No gestiona la operación
// diaria de cada salón (agenda/caja/equipo/reseñas) — eso vive en el
// propio tenant/subdominio de cada uno.
const beautyHubNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/salones", label: "Salones", icon: Building2 },
  { href: "/admin/solicitudes-salon", label: "Solicitudes", icon: UserPlus },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
  { href: "/admin/legal", label: "Legal", icon: Scale },
];

export function AdminSidebarNav({
  verticalType,
}: {
  verticalType:
    | "ECOMMERCE"
    | "SERVICES_MARKETPLACE"
    | "BEAUTY_SALON"
    | "BEAUTY_HUB"
    | "TURISMO"
    | "BEAUTY_STANDALONE"
    | "LANDING_SERVICES";
}) {
  const pathname = usePathname();
  const isBeauty =
    verticalType === "BEAUTY_SALON" ||
    verticalType === "BEAUTY_HUB" ||
    verticalType === "BEAUTY_STANDALONE";
  const navItems =
    verticalType === "SERVICES_MARKETPLACE"
      ? servicesMarketplaceNavItems
      : verticalType === "BEAUTY_SALON"
        ? beautySalonNavItems
        : verticalType === "BEAUTY_HUB"
          ? beautyHubNavItems
          : verticalType === "BEAUTY_STANDALONE"
            ? beautyStandaloneNavItems
            : verticalType === "TURISMO"
              ? tourismNavItems
              : verticalType === "LANDING_SERVICES"
                ? landingServicesNavItems
                : ecommerceNavItems;

  return (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {navItems.map((item, index) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;
        const section = item.section;
        const showSectionHeader = section !== undefined && section !== navItems[index - 1]?.section;

        return (
          <div key={item.href} className="contents">
            {showSectionHeader && (
              <p
                className={`mb-1 mt-4 px-3 text-xs font-semibold uppercase tracking-wide first:mt-0 ${
                  isBeauty ? "text-beauty-midnight/40" : "text-neutral-400 dark:text-neutral-600"
                }`}
              >
                {section}
              </p>
            )}
            <Link
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? isBeauty
                    ? "bg-beauty-rosewood/15 text-beauty-rosewood"
                    : "bg-violet-500/15 text-violet-600 dark:text-violet-400"
                  : isBeauty
                    ? "text-beauty-midnight/60 hover:bg-beauty-rosewood/10 hover:text-beauty-midnight"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
