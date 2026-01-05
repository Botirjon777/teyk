import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserLocation {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  timestamp: number;
}

interface LocationState {
  location: UserLocation | null;
  isLoading: boolean;
  error: string | null;
  setLocation: (location: UserLocation) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: null,
      isLoading: false,
      error: null,
      setLocation: (location) => set({ location, error: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),
      clearLocation: () => set({ location: null, error: null }),
    }),
    {
      name: "location-storage",
      version: 1,
      skipHydration: true,
    }
  )
);
