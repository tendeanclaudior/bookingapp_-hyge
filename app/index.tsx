import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";

const App = () => {
  const [tokenAccess, setTokenAccess] = useState<string | null>(null);
  const [isLoadAccess, setIsLoadAccess] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setTokenAccess(token);
      } catch (error) {
        throw error;
      } finally {
        setIsLoadAccess(false);
      }
    };

    loadToken();
  }, []);

  if (isLoadAccess) {
    return null;
  }

  if (tokenAccess) {
    return <Redirect href={"/(root)/(tabs)/Home"} />;
  }

  return <Redirect href={"/(auth)/signin"} />;
};

export default App;
