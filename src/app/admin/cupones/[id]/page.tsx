import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CouponForm } from "@/components/admin/CouponForm";
import { updateCoupon } from "@/lib/actions/tour-coupons";
import { COUPONS } from "@/lib/mock-data";

// Copia visual de src/app/admin/cupones/[id]/page.tsx.
export default async function EditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coupon = COUPONS.find((c) => c.id === id);
  if (!coupon) {
    notFound();
  }

  const updateCouponWithId = updateCoupon.bind(null, coupon.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <AdminPageHeader title={`Editar: ${coupon.code}`} />
        <Link href="/admin/cupones" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          ← Volver
        </Link>
      </div>
      <CouponForm action={updateCouponWithId} coupon={coupon} submitLabel="Guardar cambios" />
    </div>
  );
}
