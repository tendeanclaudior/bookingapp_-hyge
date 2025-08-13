import { Button, ButtonIcon, Gap, InputText } from "@/components";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SignUp = () => {
  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle={"dark-content"} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <ButtonIcon icon={"back"} onPress={() => router?.back()} />

            <Gap height={25} />

            <Text style={styles.title}>{"BOOKING\nAPP"}</Text>

            <Gap height={50} />

            <Text style={styles.subTitle}>Create your account</Text>

            <Gap height={25} />

            <InputText label={"Name"} placeholder={"Enter your name..."} />

            <InputText label={"Email"} placeholder={"Enter your email..."} />

            <InputText
              label={"Password"}
              secureTextEntry
              placeholder={"Enter your password..."}
            />
          </View>

          <View style={styles.buttonContent}>
            <Button title={"Sign Up"} onPress={() => console.log("Login")} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

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
  buttonContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
