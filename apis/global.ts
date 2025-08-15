import { fetchAPIAxios } from "@/lib";
import { apiUrl } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRefreshToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetchAPIAxios(`${apiUrl}/auth/refresh`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        refreshToken: token,
      },
    });

    if (response?.accessToken && response?.refreshToken) {
      await AsyncStorage.setItem("token", response?.accessToken);
      await AsyncStorage.setItem("refreshToken", response?.refreshToken);
    }
  } catch (error: any) {
    throw error;
  }
};
