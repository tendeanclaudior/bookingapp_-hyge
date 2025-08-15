declare interface CardFasilitiesProps {
  name: string;
  description: string;
  status: string;
  id?: number;
  maxAdvanceBookingDays?: number;
  maxCapacity?: number;
  createdAt?: string;
  updatedAt?: string;
}

declare interface DetailFasilitiesProps {
  name: string;
  description: string;
  status: string;
  id?: number;
  maxAdvanceBookingDays?: number;
  maxCapacity?: number;
  createdAt?: string;
  updatedAt?: string;
  images?: any[];
}
declare interface AvailabilFasilitiesProps {
  date?: string;
  dayName?: string;
  fullyBooked?: boolean;
  timeSlots: any[];
}
