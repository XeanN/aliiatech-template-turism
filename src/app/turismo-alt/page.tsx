import { TourismHeaderAlt } from "@/components/tourism/alt/TourismHeaderAlt";
import { TourismHeroAlt } from "@/components/tourism/alt/TourismHeroAlt";
import { TourismDestinationsGridAlt } from "@/components/tourism/alt/TourismDestinationsGridAlt";
import { TENANT, TOURS } from "@/lib/mock-data";

// Preview de la segunda opción de diseño para el vertical Turismo — ver
// CONTRACT.md. No reemplaza TourismLayout.tsx (la home real sigue en
// src/app/page.tsx); esta ruta es solo para que el founder/equipo de
// UX/UI puedan ver el diseño renderizado antes de decidir si se
// construye un selector real entre las dos opciones.
export default function TurismoAltPreviewPage() {
  const featuredTours = TOURS.filter((t) => t.status === "PUBLISHED").slice(0, 8);
  const destinations = Array.from(
    new Set(TOURS.map((t) => t.destination).filter((d): d is string => Boolean(d))),
  ).map((name) => ({ name, imageUrl: null }));

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-950">
      <TourismHeaderAlt
        tenant={TENANT}
        basePath=""
        customerName={null}
      />
      <main className="flex-1">
        <TourismHeroAlt
          basePath=""
          storeName={TENANT.name}
          heroTitle={TENANT.heroTitle}
          heroSubtitle={TENANT.heroSubtitle}
          bannerImages={[]}
          destinations={destinations}
        />
        <TourismDestinationsGridAlt tours={featuredTours} basePath="" />
      </main>
    </div>
  );
}
