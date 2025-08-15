import { logout } from "@/apis";
import { ButtonIcon, Header } from "@/components";
import { router } from "expo-router";
import React, { useCallback } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const Profile = () => {
  const handleProfileContent = useCallback((type: string) => {
    if (type === "logout") {
      Alert.alert("Logout", "Are you sure to log out your account?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => logout() },
      ]);
      return;
    }

    if (type === "edit_profile") {
      router.navigate("/(root)/EditProfile");
      return;
    }
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle={"dark-content"} />
      <Header globalHeader={true} titleGlobal={"Profile"} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <ButtonIcon
            icon={"edit_profile"}
            onPress={() => handleProfileContent("edit_profile")}
          />

          <ButtonIcon
            icon={"logout"}
            onPress={() => handleProfileContent("logout")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
