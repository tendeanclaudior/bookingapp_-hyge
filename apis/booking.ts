import { fetchAPIAxios } from "@/lib";
import { apiUrl, CreateBookingSchemaType } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { router } from "expo-router";
import { Alert } from "react-native";

dayjs.extend(customParseFormat);

export const createBooking = async (
  data: CreateBookingSchemaType,
  reset: () => void
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const formattedDate = dayjs(
      data?.booking_date,
      "DD MMMM YYYY",
      "id"
    ).format("YYYY-MM-DD");
    const response = await fetchAPIAxios(`${apiUrl}/facilities/bookings`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        facilityId: parseFloat(data?.facility?.id || ""),
        bookingDate: data?.booking_date ? formattedDate : "",
        startHour: parseFloat(data?.available_slots?.hour || ""),
        notes: data?.notes || "",
      },
    });

    if (response?.message === "Booking created successfully") {
      Alert.alert("Booking Fasilities", response?.message, [
        { text: "OK", onPress: () => router.replace("/(root)/(tabs)/Booking") },
      ]);
      reset();
    } else {
      Alert.alert("Booking Fasilities", response?.data?.message);
    }
  } catch (error: any) {
    Alert.alert("Error", error?.message);
  }
};
