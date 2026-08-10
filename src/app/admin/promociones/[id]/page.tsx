import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PromotionForm } from "@/components/admin/PromotionForm";
import { updatePromotion } from "@/lib/actions/tour-promotions";
import { PROMOTIONS, TOURS } from "@/lib/mock-data";

// Copia visual de src/app/admin/promociones/[id]/page.tsx.
export default async function EditPromotionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const promotion = PROMOTIONS.find((p) => p.id === id);
  if (!promotion) {
    notFound();
  }

  const tours = TOURS.map((t) => ({ id: t.id, title: t.title }));
  const updatePromotionWithId = updatePromotion.bind(null, promotion.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <AdminPageHeader title={`Editar: ${promotion.title}`} />
        <Link href="/admin/promociones" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          ← Volver
        </Link>
      </div>
      <PromotionForm action={updatePromotionWithId} promotion={promotion} tours={tours} submitLabel="Guardar cambios" />
    </div>
  );
}
