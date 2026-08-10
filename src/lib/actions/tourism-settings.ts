"use server";

export type TourismSettingsState = {
  error?: string;
  success?: boolean;
};

// Mock — en el repo real guarda name/logoUrl/faviconUrl/heroTitle/
// heroSubtitle/whatsappPhone/contactEmail/socialLinks/aboutText/
// aboutImages del tenant. Firma idéntica a updateTourismSettings en
// src/lib/actions/tourism-settings.ts.
export async function updateTourismSettings(
  _prevState: TourismSettingsState,
  formData: FormData,
): Promise<TourismSettingsState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!formData.get("name")) {
    return { error: "Ingresa el nombre del negocio" };
  }
  return { success: true };
}
