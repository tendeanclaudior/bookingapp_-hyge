import { Button, Gap, InputText } from "@/components";
import { signinSchema, SignInSchemaType } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({ resolver: zodResolver(signinSchema) });

  const onSubmit = (data: SignInSchemaType) => {
    console.log("Form data:", data);
    // TODO: Kirim ke API / proses register
  };

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

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputText
                  label={"Email"}
                  placeholder={"Enter your email..."}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors?.email ? true : false}
                  errorMessage={errors?.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <InputText
                  label={"Password"}
                  secureTextEntry
                  placeholder={"Enter your password..."}
                  value={value}
                  onChangeText={onChange}
                  error={errors?.password ? true : false}
                  errorMessage={errors?.password?.message}
                />
              )}
            />

            <Gap height={50} />

            <Button title={"Login"} onPress={handleSubmit(onSubmit)} />
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
