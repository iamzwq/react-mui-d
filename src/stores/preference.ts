import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferenceState {
  preference: any[];
  setPreference: (preference: any[]) => void;
}

const usePreferenceStore = create<PreferenceState>()(
  persist(
    set => ({
      preference: [],
      setPreference: (preference: any[]) => set({ preference })
    }),
    {
      name: "preference"
    }
  )
);

export default usePreferenceStore;
