import { Button, Gap, InputText } from "@/components";
import { Link } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SignIn = () => {
  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle={"dark-content"} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.title}>{"BOOKING\nAPP"}</Text>

            <Gap height={50} />

            <Text style={styles.subTitle}>Login with email 👋</Text>

            <Gap height={25} />

            <InputText label={"Email"} placeholder={"Enter your email..."} />

            <InputText
              label={"Password"}
              secureTextEntry
              placeholder={"Enter your password..."}
            />

            <Gap height={50} />

            <Button title={"Login"} onPress={() => console.log("Login")} />
          </View>

          <View style={{ alignItems: "center" }}>
            <Link href={"/(auth)/signup"}>
              <Text style={styles.signupTitle}>
                Don’t have an account? Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#14151A",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#14151A",
  },
  signupTitle: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#252529",
  },
});
