"use server";

export type PaymentGatewayState = {
  error?: string;
  success?: boolean;
};

// Mocks — en el repo real guarda provider/publicKey/secretKey (cifrada)
// del tenant. Firmas idénticas a src/lib/actions/payment-gateway.ts.
export async function savePaymentGatewaySettings(
  _prevState: PaymentGatewayState,
  _formData: FormData,
): Promise<PaymentGatewayState> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true };
}

export async function clearPaymentGatewaySecretKey() {
  await new Promise((resolve) => setTimeout(resolve, 200));
}
