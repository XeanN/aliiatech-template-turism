"use server";

export type TourBookingState = {
  error?: string;
  success?: boolean;
};

// Mock — en el repo real crea un TourBooking (PENDING), descuenta cupo
// de forma atómica y aplica el cupón. Firma idéntica a
// createTourBooking en src/lib/actions/tour-bookings.ts.
export async function createTourBooking(
  _tourId: string,
  _prevState: TourBookingState,
  formData: FormData,
): Promise<TourBookingState> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const email = String(formData.get("clientEmail") ?? "");
  if (email === "error@test.com") {
    return { error: "Esa fecha ya no tiene cupo suficiente para esa cantidad de personas" };
  }

  return { success: true };
}

// Mock — moderación (confirmar/cancelar) desde /admin/reservas. Firma
// idéntica a resolveTourBooking.
export async function resolveTourBooking(
  _id: string,
  _status: "CONFIRMED" | "CANCELLED",
) {
  await new Promise((resolve) => setTimeout(resolve, 300));
}
