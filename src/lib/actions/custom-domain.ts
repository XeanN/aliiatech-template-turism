"use server";

export type CustomDomainState = {
  error?: string;
  success?: boolean;
};

// Mock — ver src/lib/actions/custom-domain.ts del repo principal.
export async function setOwnCustomDomain(
  _prevState: CustomDomainState,
  formData: FormData,
): Promise<CustomDomainState> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const value = String(formData.get("customDomain") ?? "").trim();
  if (value && !/^(?!:\/\/)([a-z0-9-]+\.)+[a-z]{2,}$/i.test(value)) {
    return { error: "Ingresa un dominio válido (ej. midominio.com)" };
  }

  return { success: true };
}
