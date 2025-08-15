import { logout } from "@/apis";
import { ButtonIcon, Header } from "@/components";
import React, { useCallback } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const Profile = () => {
  const handleLogout = useCallback(() => {
    Alert.alert("Logout", "Are you sure to log out your account?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "OK", onPress: () => logout() },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <Header globalHeader={true} titleGlobal={"Profile"} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <ButtonIcon icon={"edit_profile"} onPress={() => null} />

          <ButtonIcon icon={"logout"} onPress={() => handleLogout()} />
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
