import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TourBookingActions } from "@/components/admin/TourBookingActions";
import { BOOKINGS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
};

// Copia visual de src/app/admin/reservas/page.tsx.
export default function AdminBookingsPage() {
  const bookings = BOOKINGS;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Reservas" />

      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3 font-medium">Tour</th>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Personas</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Contacto</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-4 py-3 font-medium">{booking.tourTitle}</td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                  {booking.date.toLocaleDateString("es-PE", { timeZone: "UTC" })}
                </td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{booking.pax}</td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                  {formatCurrency(booking.totalAmount)} {booking.currency}
                </td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{booking.clientName}</td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                  {booking.clientPhone}
                  <br />
                  {booking.clientEmail}
                </td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                  {STATUS_LABEL[booking.status] ?? booking.status}
                </td>
                <td className="px-4 py-3">
                  {booking.status === "PENDING" ? <TourBookingActions id={booking.id} /> : "—"}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-neutral-500 dark:text-neutral-400">
                  Todavía no hay reservas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
