import { fetchAPIAxios } from "@/lib";
import { apiUrl, UpdateProfileSchemaType } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

export const useGetUser = <T = any>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetchAPIAxios(`${apiUrl}/auth/profile`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response?.user);
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

export const updateProfile = async (data: UpdateProfileSchemaType) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetchAPIAxios(`${apiUrl}/auth/profile`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: data?.name,
        email: data?.email,
      },
    });

    if (response?.message === "Profile updated successfully") {
      Alert.alert("Update Profile", response?.message);
    } else {
      Alert.alert("Update Profile", response?.message);
    }
  } catch (error: any) {
    Alert.alert("Error", error?.message);
  }
};
