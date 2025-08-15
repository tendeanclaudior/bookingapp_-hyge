import { updateProfile, useGetUser } from "@/apis";
import { Button, Header, InputText } from "@/components";
import { updateProfileSchema, UpdateProfileSchemaType } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const EditProfile = () => {
  const { data: dataUser, refetch } = useGetUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const formValue = watch();

  const isButtonDisable = useMemo(() => {
    if (!dataUser) {
      return false;
    }

    const isChangeForm = formValue?.name !== dataUser?.name;

    return isChangeForm;
  }, [dataUser, formValue?.name]);

  useEffect(() => {
    if (dataUser) {
      reset({
        name: dataUser?.name || "",
        email: dataUser?.email || "",
      });
    }
  }, [dataUser, reset]);

  const onChange = useCallback(
    async (data: UpdateProfileSchemaType) => {
      await updateProfile(data);
      await refetch();
    },
    [refetch]
  );

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle={"dark-content"} />
      <Header globalHeader={true} titleGlobal={"Edit Profile"} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View>
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
                  editable={false}
                  error={errors?.email ? true : false}
                  errorMessage={errors?.email?.message}
                />
              )}
            />
          </View>

          <View>
            <Button
              title={"Save"}
              onPress={handleSubmit(onChange)}
              disabled={!isButtonDisable}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

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
