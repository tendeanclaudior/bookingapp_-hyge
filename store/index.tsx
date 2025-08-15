import { create } from "zustand";

export const useFasilitiesStore = create<FacilitiesProps>((set) => ({
  searchFasilities: "",
  setSearchFasilities: (value) => set({ searchFasilities: value }),
  isSearchFasilities: false,
  setIsSearchFasilities: (value) => set({ isSearchFasilities: value }),
  dateAvailabilityFacilities: "",
  setDateAvailabilityFacilities: (value) =>
    set({ dateAvailabilityFacilities: value }),
}));
