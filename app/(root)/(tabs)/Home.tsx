import { useGetUser } from "@/apis";
import { ButtonIcon } from "@/components";
import { sliceTitleView } from "@/utils";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const Home = () => {
  const { data } = useGetUser();

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle={"dark-content"} />

      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.titleWelcome}>
            Welcome, {sliceTitleView(data?.name, 15)} 👋
          </Text>

          <ButtonIcon
            icon={"profile"}
            onPress={() => router.navigate("/(root)/Profile")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleWelcome: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "#14151A",
  },
});
