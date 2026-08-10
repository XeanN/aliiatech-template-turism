import { AdminShell } from "@/components/admin/AdminShell";
import { TENANT } from "@/lib/mock-data";

// Copia visual de src/app/admin/layout.tsx del repo principal — sin la
// resolución real de sesión/tenant. Siempre renderiza como si ya
// hubieras iniciado sesión como dueña de "South Trails Perú".
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell tenantName={TENANT.name} verticalType="TURISMO" storeUrl="/">
      {children}
    </AdminShell>
  );
}
