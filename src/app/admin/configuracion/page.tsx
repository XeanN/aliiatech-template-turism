import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CustomDomainSection } from "@/components/admin/CustomDomainSection";
import { PaymentGatewaySettingsForm } from "@/components/admin/PaymentGatewaySettingsForm";
import { TourismSettingsForm } from "@/components/admin/TourismSettingsForm";
import { TENANT } from "@/lib/mock-data";

// Copia visual de la rama TURISMO en src/app/admin/configuracion/page.tsx
// del repo principal.
export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Configuración" />
      <TourismSettingsForm tenant={TENANT} />
      <div className="flex max-w-lg flex-col gap-6">
        <CustomDomainSection customDomain={TENANT.customDomain} />
        <div>
          <h2 className="mb-3 text-lg font-semibold">Pasarela de pagos</h2>
          <PaymentGatewaySettingsForm provider="NONE" publicKey={null} hasSecretKey={false} />
        </div>
      </div>
    </div>
  );
}
