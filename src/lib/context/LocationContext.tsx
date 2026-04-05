import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface Location {
  label: string;
  latitude: number;
  longitude: number;
}

interface LocationContextValue {
  location: Location;
  setLocation: (loc: Location) => void;
}

const DEFAULT_LOCATION: Location = {
  label: "District 1, HCMC",
  latitude: 10.7769,
  longitude: 106.7009,
};

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<Location>(DEFAULT_LOCATION);

  const setLocation = useCallback((loc: Location) => {
    setLocationState(loc);
  }, []);

  const value = useMemo(
    () => ({ location, setLocation }),
    [location, setLocation],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation(): LocationContextValue {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return ctx;
}
