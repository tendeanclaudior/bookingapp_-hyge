import { useGetFacilities, useGetUser } from "@/apis";
import {
  ButtonIcon,
  CardFasilities,
  CardHeaderFasilities,
  Gap,
  InputSearch,
} from "@/components";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const Home = () => {
  const { data: dataUser, refetch: refetchUser } = useGetUser();
  const { data: dataFacilities } = useGetFacilities<
    CardFasilitiesProps[] | null
  >();

  useFocusEffect(
    useCallback(() => {
      refetchUser();
    }, [refetchUser])
  );

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle={"dark-content"} />

      <View style={styles.container}>
        <View style={styles.headerView}>
          <InputSearch placeholder={"Search fasilities"} />

          <ButtonIcon
            icon={"profile"}
            onPress={() => router.navigate("/(root)/Profile")}
          />
        </View>

        <Gap height={10} />

        <FlatList
          data={dataFacilities! || []}
          keyExtractor={(item, index) => `${item?.id}_${index}`}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <CardFasilities item={item} onPress={() => console.log("")} />
          )}
          ListHeaderComponent={() => (
            <CardHeaderFasilities name={dataUser?.name} />
          )}
        />
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
});
