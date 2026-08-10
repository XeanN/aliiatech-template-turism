import { AlertTriangle, Package, ShoppingBag, Wallet } from "lucide-react";
import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { MetricCard } from "@/components/admin/MetricCard";
import { AVAILABILITY, BOOKINGS, TOURS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

// Copia visual de la rama TURISMO en src/app/admin/page.tsx del repo
// principal.
export default function AdminDashboardPage() {
  const totalTours = TOURS.length;
  const publishedTours = TOURS.filter((t) => t.status === "PUBLISHED").length;
  const pendingBookings = BOOKINGS.filter((b) => b.status === "PENDING").length;
  const activeBookings = BOOKINGS.filter((b) => b.status === "PENDING" || b.status === "CONFIRMED");
  const estimatedRevenue = activeBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const currency = activeBookings[0]?.currency ?? "PEN";

  const upcomingLowStock = AVAILABILITY.filter((a) => a.capacity <= 5)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5)
    .map((a) => ({ ...a, tourTitle: TOURS.find((t) => t.id === a.tourId)?.title ?? "" }));

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Dashboard" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <MetricCard label="Tours totales" value={String(totalTours)} icon={Package} />
        <MetricCard label="Tours publicados" value={String(publishedTours)} icon={ShoppingBag} />
        <MetricCard label="Reservas pendientes" value={String(pendingBookings)} icon={AlertTriangle} />
        <MetricCard label="Ingreso estimado (sin cobrar)" value={formatCurrency(estimatedRevenue)} icon={Wallet} />
      </div>
      {pendingBookings > 0 && (
        <Link
          href="/admin/reservas"
          className="flex items-center gap-3 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200 dark:hover:bg-amber-900/40"
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            <strong>{pendingBookings}</strong>{" "}
            {pendingBookings === 1 ? "reserva espera" : "reservas esperan"} confirmación.
          </span>
          <span className="ml-auto shrink-0 font-medium underline">Revisar</span>
        </Link>
      )}

      <div className="rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
        <p className="mb-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">Fechas con poco cupo</p>
        {upcomingLowStock.length === 0 ? (
          <p className="text-sm text-neutral-400 dark:text-neutral-600">Ninguna fecha próxima con 5 cupos o menos.</p>
        ) : (
          <ul className="flex flex-col gap-2 text-sm">
            {upcomingLowStock.map((row) => (
              <li key={row.id} className="flex items-center justify-between gap-3">
                <span className="truncate">{row.tourTitle}</span>
                <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                  {new Date(row.date).toLocaleDateString("es-PE", { timeZone: "UTC" })} — {row.capacity} cupos
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-xs text-neutral-400 dark:text-neutral-600">
        Moneda de referencia: {currency}. Todavía no se cobra en el momento — el ingreso estimado
        es solo referencia hasta que conectes tu pasarela de pagos en Configuración.
      </p>
    </div>
  );
}
