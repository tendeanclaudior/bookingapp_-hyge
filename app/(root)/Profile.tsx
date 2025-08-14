import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const Profile = () => {
  return (
    <SafeAreaView style={styles.page}>
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
