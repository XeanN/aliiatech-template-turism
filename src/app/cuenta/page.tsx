import { customerLogout } from "@/lib/actions/customer-auth";
import { BOOKINGS } from "@/lib/mock-data";

const TOUR_BOOKING_STATUS_LABEL: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
};

// Copia visual de la rama TURISMO en
// src/app/sites/[subdomain]/cuenta/page.tsx — sin gate de sesión real,
// siempre muestra las reservas de ejemplo (ver CONTRACT.md).
export default function CustomerAccountPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mi cuenta</h1>
          <p className="text-sm text-neutral-500">demo@southtrails.pe</p>
        </div>
        <form action={customerLogout.bind(null, "")}>
          <button
            type="submit"
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Cerrar sesión
          </button>
        </form>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">
          Mis reservas {BOOKINGS.length > 0 && `(${BOOKINGS.length})`}
        </h2>
        {BOOKINGS.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Todavía no reservaste ningún tour.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-neutral-100 rounded-lg border border-neutral-200 dark:divide-neutral-900 dark:border-neutral-800">
            {BOOKINGS.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{booking.tourTitle}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {booking.date.toLocaleDateString("es-PE", { timeZone: "UTC" })} ·{" "}
                    {booking.pax} {booking.pax === 1 ? "persona" : "personas"}
                  </p>
                </div>
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  {TOUR_BOOKING_STATUS_LABEL[booking.status] ?? booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
