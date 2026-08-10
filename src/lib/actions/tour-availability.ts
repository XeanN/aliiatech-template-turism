"use server";

export type AvailabilityFormState = {
  error?: string;
};

// Mocks — en el repo real crean/borran TourAvailability. Firmas
// idénticas a src/lib/actions/tour-availability.ts del repo principal.
export async function addAvailability(
  _tourId: string,
  _prevState: AvailabilityFormState,
  formData: FormData,
): Promise<AvailabilityFormState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!formData.get("date")) {
    return { error: "Elige una fecha" };
  }
  return {};
}

export async function addAvailabilityRange(
  _tourId: string,
  _prevState: AvailabilityFormState,
  formData: FormData,
): Promise<AvailabilityFormState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!formData.get("startDate") || !formData.get("endDate")) {
    return { error: "Completa el rango de fechas" };
  }
  return {};
}

export async function deleteAvailabilityMany(_ids: string[]) {
  await new Promise((resolve) => setTimeout(resolve, 300));
}
