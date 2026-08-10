import { TourCard } from "@/components/tourism/TourCard";
import { TOURS } from "@/lib/mock-data";

// Copia visual de src/app/sites/[subdomain]/tours/page.tsx.
export default async function ToursListPage({
  searchParams,
}: {
  searchParams: Promise<{ destino?: string }>;
}) {
  const { destino } = await searchParams;

  const tours = TOURS.filter(
    (t) => t.status === "PUBLISHED" && (!destino || t.destination === destino),
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">{destino ? `Tours en ${destino}` : "Todos los tours"}</h1>

      {tours.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Todavía no hay tours publicados{destino ? " para ese destino" : ""}.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} basePath="" />
          ))}
        </div>
      )}
    </div>
  );
}
