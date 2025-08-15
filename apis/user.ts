import { fetchAPIAxios } from "@/lib";
import {
  apiUrl,
  ChangePasswordSchemaType,
  UpdateProfileSchemaType,
} from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { getRefreshToken } from "./global";

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

      if (response?.data?.statusCode === 401) {
        getRefreshToken();
      } else {
        setData(response?.user);
        setLoading(false);
      }
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
      Alert.alert("Update Profile", response?.data?.message);
    }
  } catch (error: any) {
    Alert.alert("Error", error?.message);
  }
};

export const changePassword = async (
  data: ChangePasswordSchemaType,
  reset: (values: { current_password: string; new_password: string }) => void
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetchAPIAxios(`${apiUrl}/auth/profile`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        currentPassword: data?.current_password,
        newPassword: data?.new_password,
      },
    });

    if (response?.message === "Profile updated successfully") {
      Alert.alert("Change Password", response?.message);
      reset({ current_password: "", new_password: "" });
    } else {
      Alert.alert("Change Password", response?.data?.message);
    }
  } catch (error: any) {
    Alert.alert("Error", error?.message);
  }
};
