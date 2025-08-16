import { fetchAPIAxios } from "@/lib";
import { useBookingStore } from "@/store";
import { apiUrl, CreateBookingSchemaType } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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

export const useGetBookingUser = <T = any>() => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { pageBooking, setPageBooking } = useBookingStore();

  const fetchData = useCallback(
    async (reset = false) => {
      if (!hasMore && !reset) return;

      setLoading(true);
      try {
        const { selectedTabType, selectedByAscDesc } =
          useBookingStore.getState();
        const token = await AsyncStorage.getItem("token");

        const params = {
          page: pageBooking,
          pageSize: 10,
          sortBy: "createdAt",
          status: selectedTabType ? selectedTabType : undefined,
          sortDirection: selectedByAscDesc,
        };

        const response = await fetchAPIAxios(
          `${apiUrl}/facilities/bookings/my`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params,
          }
        );
        const bookings = response?.bookings || [];

        if (reset) {
          setData(bookings);
        } else {
          setData((prev) => [...prev, ...bookings]);
        }

        setHasMore(bookings.length === 10);
        setLoading(false);
        setLoadingMore(false);
      } catch (err) {
        setLoading(false);
        setLoadingMore(false);
        console.error(err);
      }
    },
    [pageBooking, hasMore]
  );

  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;

    setLoadingMore(true);
    setPageBooking(pageBooking + 1);
    fetchData();
  }, [loading, loadingMore, hasMore, setPageBooking, pageBooking, fetchData]);

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  return {
    data,
    loading,
    loadingMore,
    hasMore,
    refetch: () => fetchData(true),
    loadMore,
  };
};

export const deleteBooking = async (id: number, refetch: () => void) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetchAPIAxios(
      `${apiUrl}/facilities/bookings/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.message === "Booking cancelled successfully") {
      Alert.alert("Delete Booking", response?.message, [
        {
          text: "OK",
          onPress: () => refetch(),
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert("Delete Booking", response?.data?.message);
    }
  } catch (error: any) {
    Alert.alert("Error", error?.message);
  }
};
