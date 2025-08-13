import { Button, ButtonIcon, Gap, InputText } from "@/components";
import { signupSchema, SignUpSchemaType } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
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

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignUpSchemaType) => {
    console.log("Form data:", data);
    // TODO: Kirim ke API / proses register
  };

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

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <InputText
                  label={"Name"}
                  placeholder={"Enter your name..."}
                  value={value}
                  onChangeText={onChange}
                  error={errors?.name ? true : false}
                  errorMessage={errors?.name?.message}
                />
              )}
            />

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
          </View>

          <View style={styles.buttonContent}>
            <Button title={"Sign Up"} onPress={handleSubmit(onSubmit)} />
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
