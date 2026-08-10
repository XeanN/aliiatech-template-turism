"use server";

export type PromotionFormState = {
  error?: string;
};

// Mocks — firmas idénticas a src/lib/actions/tour-promotions.ts.
export async function createPromotion(
  _prevState: PromotionFormState,
  formData: FormData,
): Promise<PromotionFormState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!formData.get("title")) {
    return { error: "Ingresa un título" };
  }
  return {};
}

export async function updatePromotion(
  _promotionId: string,
  _prevState: PromotionFormState,
  formData: FormData,
): Promise<PromotionFormState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!formData.get("title")) {
    return { error: "Ingresa un título" };
  }
  return {};
}

export async function deletePromotion(_promotionId: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
}
