import { fetchAPIAxios } from "@/lib";
import { apiUrl, SignInSchemaType, SignUpSchemaType } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

export const signUp = async (data: SignUpSchemaType) => {
  try {
    const response = await fetchAPIAxios(`${apiUrl}/auth/register`, {
      method: "post",
      data: {
        name: data?.name,
        email: data?.email,
        password: data?.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response?.message === "User registered successfully") {
      await AsyncStorage.setItem("token", response?.accessToken);
      await AsyncStorage.setItem("refreshToken", response?.refreshToken);

      router.replace("/(root)/(tabs)/Home");
    } else {
      Alert.alert(response?.data?.error, response?.data?.message);
    }
  } catch (error: any) {
    Alert.alert("Error", error?.message);
  }
};

export const signIn = async (data: SignInSchemaType) => {
  try {
    const response = await fetchAPIAxios(`${apiUrl}/auth/login`, {
      method: "post",
      data: {
        email: data?.email,
        password: data?.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response?.message === "Login successful") {
      await AsyncStorage.setItem("token", response?.accessToken);
      await AsyncStorage.setItem("refreshToken", response?.refreshToken);

      router.replace("/(root)/(tabs)/Home");
    } else {
      Alert.alert(response?.data?.error, response?.data?.message);
    }
  } catch (error: any) {
    Alert.alert("Error", error?.message);
  }
};

export const logout = async () => {
  try {
    const response = await fetchAPIAxios(`${apiUrl}/auth/logout`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response?.message === "Logged out successfully") {
      router.replace("/(auth)/signin");

      await AsyncStorage.multiRemove(["token", "refreshToken"]);
    } else {
      Alert.alert(response?.message);
    }
  } catch (error: any) {
    Alert.alert("Error", error?.message);
  }
};
