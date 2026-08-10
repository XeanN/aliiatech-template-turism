import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AvailabilityCalendar } from "@/components/admin/AvailabilityCalendar";
import { AvailabilityForm } from "@/components/admin/AvailabilityForm";
import { AvailabilityRangeForm } from "@/components/admin/AvailabilityRangeForm";
import {
  addAvailability,
  addAvailabilityRange,
  deleteAvailabilityMany,
} from "@/lib/actions/tour-availability";
import { availabilityForTour, TOURS } from "@/lib/mock-data";

// Copia visual de src/app/admin/disponibilidad/page.tsx.
export default async function AvailabilityPage({
  searchParams,
}: {
  searchParams: Promise<{ tourId?: string }>;
}) {
  const { tourId } = await searchParams;
  const tours = TOURS;

  const requestedTourValid = tourId && tours.some((tour) => tour.id === tourId);
  const selectedTourId = requestedTourValid ? tourId : tours[0]?.id;

  const availability = selectedTourId ? availabilityForTour(selectedTourId) : [];

  const addAvailabilityForSelectedTour = selectedTourId ? addAvailability.bind(null, selectedTourId) : null;
  const addAvailabilityRangeForSelectedTour = selectedTourId ? addAvailabilityRange.bind(null, selectedTourId) : null;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Disponibilidad" description="Fechas y cupos disponibles por tour." />

      {tours.length === 0 ? (
        <p className="text-neutral-400">Todavía no hay tours creados. Creá un tour primero.</p>
      ) : (
        <>
          <form method="GET" className="flex items-end gap-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Tour</label>
              <select
                name="tourId"
                defaultValue={selectedTourId}
                className="mt-1 w-72 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-900"
              >
                {tours.map((tour) => (
                  <option key={tour.id} value={tour.id}>
                    {tour.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Ver
            </button>
          </form>

          {addAvailabilityForSelectedTour && (
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
              <p className="mb-3 text-sm font-semibold">Agregar una fecha</p>
              <AvailabilityForm action={addAvailabilityForSelectedTour} />
            </div>
          )}

          {addAvailabilityRangeForSelectedTour && (
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
              <p className="mb-3 text-sm font-semibold">Agregar un rango de fechas</p>
              <AvailabilityRangeForm action={addAvailabilityRangeForSelectedTour} />
            </div>
          )}

          <AvailabilityCalendar
            availability={availability.map((entry) => ({ id: entry.id, date: entry.date, capacity: entry.capacity }))}
            onDeleteMany={deleteAvailabilityMany}
          />
        </>
      )}
    </div>
  );
}
