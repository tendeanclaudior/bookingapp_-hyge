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

export const useBookingStore = create<BookingProps>((set) => ({
  pageBooking: 1,
  setPageBooking: (value) => set({ pageBooking: value }),
  selectedTabIndex: 0,
  setSelectedIndex: (value) => set({ selectedTabIndex: value }),
  selectedTabType: "",
  setSelectedTabType: (value) => set({ selectedTabType: value }),
  selectedByAscDesc: "asc",
  setSelectedByAscDesc: (value) => set({ selectedByAscDesc: value }),
}));
