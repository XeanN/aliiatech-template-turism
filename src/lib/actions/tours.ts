"use server";

export type TourFormState = {
  error?: string;
};

// Mocks — en el repo real crean/actualizan/borran Tour contra la base
// real. Firmas idénticas a src/lib/actions/tours.ts del repo principal.
export async function createTour(
  _prevState: TourFormState,
  formData: FormData,
): Promise<TourFormState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!formData.get("title")) {
    return { error: "Ingresa un título" };
  }
  return {};
}

export async function updateTour(
  _tourId: string,
  _prevState: TourFormState,
  formData: FormData,
): Promise<TourFormState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!formData.get("title")) {
    return { error: "Ingresa un título" };
  }
  return {};
}

export async function deleteTour(_tourId: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
}
