"use server";

export type CouponFormState = {
  error?: string;
};

// Mocks — firmas idénticas a src/lib/actions/tour-coupons.ts.
export async function createCoupon(
  _prevState: CouponFormState,
  formData: FormData,
): Promise<CouponFormState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!formData.get("code")) {
    return { error: "Ingresa un código" };
  }
  return {};
}

export async function updateCoupon(
  _couponId: string,
  _prevState: CouponFormState,
  formData: FormData,
): Promise<CouponFormState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!formData.get("code")) {
    return { error: "Ingresa un código" };
  }
  return {};
}

export async function deleteCoupon(_couponId: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
}
