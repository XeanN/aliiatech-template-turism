import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BOOKINGS } from "@/lib/mock-data";

// Copia visual de src/app/admin/clientes-turismo/page.tsx — sin cuenta
// de cliente propia, derivado de quién ya reservó.
export default function AdminTourismCustomersPage() {
  const byEmail = new Map<
    string,
    { name: string; email: string; phone: string; count: number; lastBooking: Date }
  >();
  for (const booking of BOOKINGS) {
    const existing = byEmail.get(booking.clientEmail);
    if (existing) {
      existing.count += 1;
    } else {
      byEmail.set(booking.clientEmail, {
        name: booking.clientName,
        email: booking.clientEmail,
        phone: booking.clientPhone,
        count: 1,
        lastBooking: booking.createdAt,
      });
    }
  }
  const customers = Array.from(byEmail.values()).sort((a, b) => b.lastBooking.getTime() - a.lastBooking.getTime());

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Clientes"
        description="Derivado de quién ya reservó un tour — sin cuenta propia, la reserva siempre es de invitado."
      />

      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Contacto</th>
              <th className="px-4 py-3 font-medium">Reservas</th>
              <th className="px-4 py-3 font-medium">Última reserva</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {customers.map((customer) => (
              <tr key={customer.email}>
                <td className="px-4 py-3 font-medium">{customer.name}</td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                  {customer.phone}
                  <br />
                  {customer.email}
                </td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{customer.count}</td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                  {customer.lastBooking.toLocaleDateString("es-PE")}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-neutral-500 dark:text-neutral-400">
                  Todavía no hay clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
