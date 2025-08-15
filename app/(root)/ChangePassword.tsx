import { changePassword, useGetUser } from "@/apis";
import { Button, Header, InputText } from "@/components";
import { changePasswordSchema, ChangePasswordSchemaType } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const ChangePassword = () => {
  const { refetch } = useGetUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onChange = useCallback(
    async (data: ChangePasswordSchemaType) => {
      await changePassword(data, reset);
      await refetch();
    },
    [refetch, reset]
  );

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle={"dark-content"} />
      <Header globalHeader={true} titleGlobal={"Change Password"} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View>
            <Controller
              control={control}
              name="current_password"
              render={({ field: { onChange, value } }) => (
                <InputText
                  label={"Current Password"}
                  secureTextEntry
                  placeholder={"Enter your current password..."}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  textContentType="oneTimeCode"
                  error={errors?.current_password ? true : false}
                  errorMessage={errors?.current_password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange, value } }) => (
                <InputText
                  label={"New Password"}
                  secureTextEntry
                  placeholder={"Enter your new password..."}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  textContentType="oneTimeCode"
                  error={errors?.new_password ? true : false}
                  errorMessage={errors?.new_password?.message}
                />
              )}
            />
          </View>

          <View>
            <Button title={"Save"} onPress={handleSubmit(onChange)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;

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
    paddingVertical: 10,
    justifyContent: "space-between",
  },
});
