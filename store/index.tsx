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

export const useCreateBookingStore = create<CreateBookingProps>((set) => ({
  isBookingDate: false,
  setIsBookingDate: (value) => set({ isBookingDate: value }),
  isBookingAvailabilityId: "",
  setIsBookingAvailabilityId: (value) =>
    set({ isBookingAvailabilityId: value }),
  resetCreateBooking: () =>
    set(() => ({
      isBookingDate: false,
      isBookingAvailabilityId: "",
    })),
}));
