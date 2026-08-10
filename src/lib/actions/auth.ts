"use server";

export type LogoutState = {
  redirectUrl?: string;
};

// Mock — ver src/lib/actions/auth.ts del repo principal.
export async function logout(_prevState: LogoutState): Promise<LogoutState> {
  return { redirectUrl: "/" };
}
