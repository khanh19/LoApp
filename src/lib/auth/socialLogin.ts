import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";

import { useAuth } from "./AuthContext";
import { useExchangeCallbackMutation, useStartLoginMutation } from "./queries";

/** Logical provider; maps to Auth0 connection names (override via env if yours differ). */
export type SocialProvider = "apple" | "google" | "facebook";

function authConnectionSlug(provider: SocialProvider): string {
  const fromEnv = {
    apple: process.env.EXPO_PUBLIC_AUTH0_CONNECTION_APPLE,
    google: process.env.EXPO_PUBLIC_AUTH0_CONNECTION_GOOGLE,
    facebook: process.env.EXPO_PUBLIC_AUTH0_CONNECTION_FACEBOOK,
  }[provider];

  if (typeof fromEnv === "string" && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }

  const defaults: Record<SocialProvider, string> = {
    apple: "apple",
    google: "google-oauth2",
    facebook: "facebook",
  };
  return defaults[provider];
}

function safeDecodeQueryValue(s: string): string {
  try {
    return decodeURIComponent(s.replace(/\+/g, " "));
  } catch {
    return s;
  }
}

/**
 * Read OAuth callback from the custom scheme URL. Handles Auth0 errors in the
 * query string or in the hash fragment.
 */
function parseOAuthRedirect(redirectUrl: string): { code: string; state: string } {
  let url: URL;
  try {
    url = new URL(redirectUrl);
  } catch {
    throw new Error("Invalid callback URL");
  }

  let error = url.searchParams.get("error");
  let errorDescription = url.searchParams.get("error_description");

  const fragment = url.hash?.startsWith("#") ? url.hash.slice(1) : url.hash;
  if (fragment && (!error || !errorDescription)) {
    const frag = new URLSearchParams(fragment);
    error ??= frag.get("error");
    errorDescription ??= frag.get("error_description");
  }

  if (error) {
    const raw = errorDescription ?? error;
    throw new Error(safeDecodeQueryValue(raw));
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) {
    throw new Error("Missing authorization code or state");
  }

  return { code, state };
}

export function useSocialLogin() {
  const { setToken } = useAuth();
  const startLogin = useStartLoginMutation();
  const exchange = useExchangeCallbackMutation();

  const authenticate = useCallback(
    async (provider?: SocialProvider) => {
      const { state, auth_code_url } = await startLogin.mutateAsync();

      const authUrl = new URL(auth_code_url);
      if (provider) {
        authUrl.searchParams.set("connection", authConnectionSlug(provider));
      }

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl.toString(),
        "loapp://callback",
      );

      if (result.type !== "success" || !result.url) {
        return null;
      }

      const { code, state: returnedState } = parseOAuthRedirect(result.url);
      if (returnedState !== state) {
        throw new Error("State mismatch");
      }

      const { token } = await exchange.mutateAsync(code);
      setToken(token);
      return token;
    },
    [startLogin, exchange, setToken],
  );

  const reset = useCallback(() => {
    startLogin.reset();
    exchange.reset();
  }, [startLogin, exchange]);

  return {
    authenticate,
    isPending: startLogin.isPending || exchange.isPending,
    error: (startLogin.error ?? exchange.error) as Error | null,
    reset,
  };
}
