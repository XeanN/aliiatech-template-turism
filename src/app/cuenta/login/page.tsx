import { CustomerLoginForm } from "@/components/storefront/CustomerLoginForm";
import { TENANT } from "@/lib/mock-data";

// Copia visual de la rama TURISMO en
// src/app/sites/[subdomain]/cuenta/login/page.tsx.
export default function CustomerLoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div>
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>
        <p className="text-sm text-neutral-500">
          Entrá a tu cuenta de {TENANT.name} para ver tus reservas.
        </p>
      </div>
      <CustomerLoginForm tenantId="tenant-demo" basePath="" />
    </main>
  );
}
