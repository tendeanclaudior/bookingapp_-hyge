declare interface FacilitiesProps {
  searchFasilities: string;
  setSearchFasilities: (value: string) => void;
  isSearchFasilities: boolean;
  setIsSearchFasilities: (value: boolean) => void;
  dateAvailabilityFacilities: string;
  setDateAvailabilityFacilities: (value: string) => void;
}

declare interface CreateBookingProps {
  isBookingDate: boolean;
  setIsBookingDate: (value: boolean) => void;
  isBookingAvailabilityId: string;
  setIsBookingAvailabilityId: (value: string) => void;
  resetCreateBooking?: any;
}

declare interface BookingProps {
  pageBooking: number;
  setPageBooking: (value: number) => void;
  selectedTabIndex: number;
  setSelectedIndex: (value: number) => void;
  selectedTabType: string;
  setSelectedTabType: (value: string) => void;
  selectedByAscDesc: string;
  setSelectedByAscDesc: (value: string) => void;
}
