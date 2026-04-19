import { useMutation } from "@tanstack/react-query";

import { apiFetch } from "../api/client";

export const authKeys = { all: ["auth"] as const };

export function useStartLoginMutation() {
  return useMutation({
    mutationKey: [...authKeys.all, "start"],
    mutationFn: () =>
      apiFetch<{ state: string; auth_code_url: string }>("/auth/login", {
        method: "POST",
      }),
  });
}

export function useExchangeCallbackMutation() {
  return useMutation({
    mutationKey: [...authKeys.all, "callback"],
    mutationFn: (code: string) =>
      apiFetch<{ token: string }>("/auth/callback", {
        method: "POST",
        body: { code },
      }),
  });
}
