import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { LegalSettingsForm } from "@/components/admin/LegalSettingsForm";
import { TENANT } from "@/lib/mock-data";

// Copia visual de src/app/admin/legal/page.tsx — genérico, reusado tal cual.
export default function AdminLegalPage() {
  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Legal" />
      <LegalSettingsForm tenantName={TENANT.name} legalTerms={null} legalPrivacy={null} legalCookies={null} />
    </div>
  );
}
