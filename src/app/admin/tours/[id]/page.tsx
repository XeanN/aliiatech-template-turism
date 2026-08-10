import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TourForm } from "@/components/admin/TourForm";
import { updateTour } from "@/lib/actions/tours";
import { TOURS } from "@/lib/mock-data";

// Copia visual de src/app/admin/tours/[id]/page.tsx.
export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = TOURS.find((t) => t.id === id);
  if (!tour) {
    notFound();
  }

  const updateTourWithId = updateTour.bind(null, tour.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <AdminPageHeader title={`Editar: ${tour.title}`} />
        <Link href="/admin/tours" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          ← Volver
        </Link>
      </div>
      <TourForm action={updateTourWithId} tour={tour} submitLabel="Guardar cambios" />
    </div>
  );
}
