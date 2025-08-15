import { fetchAPIAxios } from "@/lib";
import { useFasilitiesStore } from "@/store";
import { apiUrl, formattedDateToday } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export const useGetFacilities = <T = any>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const { searchFasilities } = useFasilitiesStore?.getState();
      const token = await AsyncStorage.getItem("token");
      const response = await fetchAPIAxios(`${apiUrl}/facilities`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: searchFasilities,
        },
      });

      setData(response);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setData(null);

      throw err;
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
};

export const useGetDetailFacilities = <T = any>(id: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetchAPIAxios(
        `${apiUrl}/facilities/${parseFloat(id)}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setData(null);

      throw err;
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
};

export const useGetAvailabilityFacilities = <T = any>(id: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const { dateAvailabilityFacilities } = useFasilitiesStore?.getState();
      const token = await AsyncStorage.getItem("token");
      const response = await fetchAPIAxios(
        `${apiUrl}/facilities/${parseFloat(id)}/availability/daily`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            date: dateAvailabilityFacilities || formattedDateToday,
          },
        }
      );

      setData(response);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setData(null);

      throw err;
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
};
