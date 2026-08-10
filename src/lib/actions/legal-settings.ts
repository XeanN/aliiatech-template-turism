"use server";

export type LegalSettingsState = {
  error?: string;
  success?: boolean;
};

// Mock — ver src/lib/actions/legal-settings.ts del repo principal.
export async function updateLegalSettings(
  _prevState: LegalSettingsState,
  _formData: FormData,
): Promise<LegalSettingsState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true };
}
