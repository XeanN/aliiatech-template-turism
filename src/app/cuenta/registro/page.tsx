import { CustomerRegisterForm } from "@/components/storefront/CustomerRegisterForm";
import { TENANT } from "@/lib/mock-data";

// Copia visual de la rama TURISMO en
// src/app/sites/[subdomain]/cuenta/registro/page.tsx — "simplified"
// (sin dirección de envío ni DNI, no aplican a una reserva de tour).
export default function CustomerRegisterPage() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div>
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <p className="text-sm text-neutral-500">
          Registrate en {TENANT.name} para ver tus reservas.
        </p>
      </div>
      <CustomerRegisterForm tenantId="tenant-demo" basePath="" simplified />
    </main>
  );
}
