import { fetchAPIAxios } from "@/lib";
import { apiUrl } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export const useGetFacilities = <T = any>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetchAPIAxios(`${apiUrl}/facilities`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: "",
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
