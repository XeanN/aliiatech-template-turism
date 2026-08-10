"use server";

export type SubmitTestimonialState = {
  error?: string;
  success?: boolean;
};

// Mock — público, sin auth, arranca PENDING. Firma idéntica a
// submitTestimonial en src/lib/actions/testimonials.ts.
export async function submitTestimonial(
  _tenantId: string,
  _basePath: string,
  _tourId: string | null,
  _prevState: SubmitTestimonialState,
  formData: FormData,
): Promise<SubmitTestimonialState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!formData.get("authorName") || !formData.get("text")) {
    return { error: "Completa tu nombre y comentario" };
  }
  return { success: true };
}

export async function resolveTestimonial(_id: string, _status: "APPROVED" | "REJECTED") {
  await new Promise((resolve) => setTimeout(resolve, 200));
}

export async function deleteTestimonial(_id: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
}
