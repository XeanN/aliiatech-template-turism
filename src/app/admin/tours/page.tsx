import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TourActions } from "@/components/admin/TourActions";
import { TOURS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

// Copia visual de src/app/admin/tours/page.tsx.
export default function AdminToursPage() {
  const tours = TOURS;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <AdminPageHeader title="Tours" />
        <Link href="/admin/tours/nuevo" className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
          + Nuevo tour
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Destino</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {tours.map((tour) => (
              <tr key={tour.id}>
                <td className="px-4 py-3 font-medium">{tour.title}</td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{tour.destination ?? "—"}</td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                  {formatCurrency(tour.price)} {tour.currency}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      tour.status === "PUBLISHED"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                        : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                    }`}
                  >
                    {tour.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/tours/${tour.id}`}
                      className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                      Editar
                    </Link>
                    <Link
                      href={`/admin/disponibilidad?tourId=${tour.id}`}
                      className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                      Disponibilidad
                    </Link>
                    <TourActions id={tour.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
