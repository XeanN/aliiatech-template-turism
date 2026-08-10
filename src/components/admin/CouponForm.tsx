"use client";

import { useActionState } from "react";

import type { CouponFormState } from "@/lib/actions/tour-coupons";

// Shape mínimo (sin `@prisma/client`, ver CONTRACT.md).
type CouponLite = {
  code: string;
  discountType: string;
  discountValue: unknown;
  minAmount: unknown;
  maxUses: number | null;
  active: boolean;
  validFrom: Date | null;
  validUntil: Date | null;
};

const inputClass =
  "mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-900";
const labelClass = "block text-sm font-medium text-neutral-700 dark:text-neutral-300";

function toDateInput(value: Date | null | undefined) {
  return value ? value.toISOString().slice(0, 10) : "";
}

// Copia visual de src/components/admin/CouponForm.tsx.
export function CouponForm({
  action,
  coupon,
  submitLabel,
}: {
  action: (state: CouponFormState, formData: FormData) => Promise<CouponFormState>;
  coupon?: CouponLite;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-md space-y-4">
      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </p>
      )}

      <div>
        <label className={labelClass}>Código</label>
        <input
          name="code"
          defaultValue={coupon?.code}
          required
          className={`${inputClass} uppercase`}
          placeholder="VERANO25"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Tipo de descuento</label>
          <select name="discountType" defaultValue={coupon?.discountType ?? "PERCENTAGE"} className={inputClass}>
            <option value="PERCENTAGE">Porcentaje</option>
            <option value="FIXED">Monto fijo</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Valor</label>
          <input
            name="discountValue"
            type="number"
            step="0.01"
            min="0.01"
            defaultValue={coupon ? String(coupon.discountValue) : ""}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Monto mínimo (opcional)</label>
          <input
            name="minAmount"
            type="number"
            step="0.01"
            min="0"
            defaultValue={coupon?.minAmount ? String(coupon.minAmount) : ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Usos máximos (opcional)</label>
          <input
            name="maxUses"
            type="number"
            min="1"
            defaultValue={coupon?.maxUses ?? ""}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Válido desde (opcional)</label>
          <input name="validFrom" type="date" defaultValue={toDateInput(coupon?.validFrom)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Válido hasta (opcional)</label>
          <input name="validUntil" type="date" defaultValue={toDateInput(coupon?.validUntil)} className={inputClass} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={coupon?.active ?? true} />
        Activo
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {pending ? "Guardando…" : submitLabel}
      </button>
    </form>
  );
}
