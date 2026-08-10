import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PromotionActions } from "@/components/admin/PromotionActions";
import { PROMOTIONS, TOURS } from "@/lib/mock-data";

// Copia visual de src/app/admin/promociones/page.tsx.
export default function AdminPromotionsPage() {
  const promotions = PROMOTIONS;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <AdminPageHeader title="Promociones" />
        <Link href="/admin/promociones/nuevo" className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
          + Nueva promoción
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Tour</th>
              <th className="px-4 py-3 font-medium">Descuento</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {promotions.map((promotion) => (
              <tr key={promotion.id}>
                <td className="px-4 py-3 font-medium">{promotion.title}</td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                  {TOURS.find((t) => t.id === promotion.tourId)?.title ?? "—"}
                </td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                  {promotion.discountPercent ? `${promotion.discountPercent}%` : "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      promotion.active
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                        : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                    }`}
                  >
                    {promotion.active ? "Activa" : "Inactiva"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/promociones/${promotion.id}`}
                      className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                      Editar
                    </Link>
                    <PromotionActions id={promotion.id} />
                  </div>
                </td>
              </tr>
            ))}
            {promotions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-neutral-500 dark:text-neutral-400">
                  Todavía no hay promociones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
