import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PromotionForm } from "@/components/admin/PromotionForm";
import { createPromotion } from "@/lib/actions/tour-promotions";
import { TOURS } from "@/lib/mock-data";

// Copia visual de src/app/admin/promociones/nuevo/page.tsx.
export default function NewPromotionPage() {
  const tours = TOURS.map((t) => ({ id: t.id, title: t.title }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <AdminPageHeader title="Nueva promoción" />
        <Link href="/admin/promociones" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          ← Volver
        </Link>
      </div>
      <PromotionForm action={createPromotion} tours={tours} submitLabel="Crear promoción" />
    </div>
  );
}
