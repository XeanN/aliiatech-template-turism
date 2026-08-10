import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CouponForm } from "@/components/admin/CouponForm";
import { createCoupon } from "@/lib/actions/tour-coupons";

// Copia visual de src/app/admin/cupones/nuevo/page.tsx.
export default function NewCouponPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <AdminPageHeader title="Nuevo cupón" />
        <Link href="/admin/cupones" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          ← Volver
        </Link>
      </div>
      <CouponForm action={createCoupon} submitLabel="Crear cupón" />
    </div>
  );
}
