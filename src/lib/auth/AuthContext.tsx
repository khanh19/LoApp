import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface AuthContextValue {
  token: string | null;
  setToken: (token: string | null) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  const setToken = useCallback((t: string | null) => {
    setTokenState(t);
  }, []);

  const signOut = useCallback(() => {
    setTokenState(null);
  }, []);

  const value = useMemo(
    () => ({ token, setToken, signOut }),
    [token, setToken, signOut],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
