import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TourForm } from "@/components/admin/TourForm";
import { createTour } from "@/lib/actions/tours";

// Copia visual de src/app/admin/tours/nuevo/page.tsx.
export default function NewTourPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <AdminPageHeader title="Nuevo tour" description="Se guarda como borrador hasta que lo publiques." />
        <Link href="/admin/tours" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          ← Volver
        </Link>
      </div>
      <TourForm action={createTour} submitLabel="Crear tour" />
    </div>
  );
}
