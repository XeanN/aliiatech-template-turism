import Link from "next/link";

import { TestimonialsSection } from "@/components/tourism/TestimonialsSection";
import { TourCard } from "@/components/tourism/TourCard";
import { PROMOTIONS, TENANT, TESTIMONIALS, TOURS } from "@/lib/mock-data";

// Copia visual de la rama TURISMO en src/app/sites/[subdomain]/page.tsx
// del repo principal (home hero + destacados + promoción + testimonios).
export default function HomePage() {
  const featuredTours = TOURS.filter((t) => t.status === "PUBLISHED").slice(0, 6);
  const destinations = Array.from(
    new Set(TOURS.map((t) => t.destination).filter((d): d is string => Boolean(d))),
  );
  const promotion = PROMOTIONS.find((p) => p.active);
  const promotionTour = promotion?.tourId ? TOURS.find((t) => t.id === promotion.tourId) : null;
  const testimonials = TESTIMONIALS.filter((t) => t.status === "APPROVED");

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-800 px-4 py-20 text-center text-white sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">{TENANT.heroTitle}</h1>
          <p className="mt-4 text-lg text-emerald-100">{TENANT.heroSubtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#destinos"
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-emerald-950 hover:bg-amber-400"
            >
              Explorar destinos
            </a>
            <Link
              href="/tours"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Ver experiencias
            </Link>
          </div>
        </div>
      </section>

      {promotion && (
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-3 rounded-xl bg-amber-50 px-6 py-4 dark:bg-amber-500/10 sm:flex-row sm:items-center">
            <div>
              {promotion.badge && (
                <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-emerald-950">
                  {promotion.badge}
                </span>
              )}
              <p className="mt-1 font-medium">
                {promotion.title}
                {promotion.discountPercent ? ` — ${promotion.discountPercent}% off` : ""}
              </p>
              {promotion.description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{promotion.description}</p>
              )}
            </div>
            <Link
              href={promotionTour ? `/tours/${promotionTour.slug}` : "/tours"}
              className="shrink-0 rounded-full bg-emerald-900 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Ver tour
            </Link>
          </div>
        </section>
      )}

      {destinations.length > 0 && (
        <section id="destinos" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 sm:px-6">
          <h2 className="mb-4 text-2xl font-semibold">Destinos populares</h2>
          <div className="flex flex-wrap gap-2">
            {destinations.map((destination) => (
              <Link
                key={destination}
                href={`/tours?destino=${encodeURIComponent(destination)}`}
                className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
              >
                {destination}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="mb-4 text-2xl font-semibold">Tours destacados</h2>
        {featuredTours.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Todavía no hay tours publicados.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} basePath="" />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <TestimonialsSection tenantId="tenant-demo" basePath="" testimonials={testimonials} />
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold">¿Listo para tu próxima aventura?</h2>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Contanos qué estás buscando y armamos la experiencia con vos.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/tours"
            className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Ver experiencias
          </Link>
        </div>
      </section>
    </div>
  );
}
