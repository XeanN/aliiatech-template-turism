"use server";

export type CustomerAuthState = {
  error?: string;
  redirectUrl?: string;
};

// Mocks — en el repo real validan contra Customer/bcrypt y firman la
// sesión con Auth.js. Firmas idénticas a customerLogin/customerRegister/
// customerLogout en src/lib/actions/customer-auth.ts (mismos primeros
// argumentos vía .bind: tenantId, basePath).
export async function customerLogin(
  _tenantId: string,
  basePath: string,
  _prevState: CustomerAuthState,
  formData: FormData,
): Promise<CustomerAuthState> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const email = String(formData.get("email") ?? "");
  if (email === "error@test.com") {
    return { error: "Correo o contraseña incorrectos" };
  }

  return { redirectUrl: `${basePath}/cuenta` };
}

export async function customerRegister(
  _tenantId: string,
  basePath: string,
  _prevState: CustomerAuthState,
  formData: FormData,
): Promise<CustomerAuthState> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const email = String(formData.get("email") ?? "");
  if (email === "error@test.com") {
    return { error: "Ya existe una cuenta con ese email" };
  }

  return { redirectUrl: `${basePath}/cuenta` };
}

export async function customerLogout(_basePath: string) {
  // No-op — sin sesión real que cerrar en este repo de diseño.
}
