import { useGetFacilities, useGetUser } from "@/apis";
import {
  ButtonIcon,
  CardFasilities,
  CardHeaderFasilities,
  Gap,
  InputSearch,
  NoData,
} from "@/components";
import { useCreateBookingStore, useFasilitiesStore } from "@/store";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const Home = () => {
  const { data: dataUser, refetch: refetchUser } = useGetUser();
  const {
    data: dataFacilities,
    loading: loadingFacilities,
    refetch: refetchFasilities,
  } = useGetFacilities<CardFasilitiesProps[] | null>();
  const {
    searchFasilities,
    setSearchFasilities,
    isSearchFasilities,
    setIsSearchFasilities,
  } = useFasilitiesStore();
  const { setIsBookingAvailabilityId } = useCreateBookingStore();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useFocusEffect(
    useCallback(() => {
      refetchUser();
    }, [refetchUser])
  );

  const handleSearchFacilities = useCallback(
    (type: string) => {
      if (type === "search_true") {
        setIsSearchFasilities(true);
        return;
      }

      if (type === "search_false") {
        Keyboard.dismiss();
        setIsSearchFasilities(false);
        return;
      }
    },
    [setIsSearchFasilities]
  );

  const onSearchFacilities = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        setSearchFasilities(value);
        refetchFasilities();
      }, 300);
    },
    [refetchFasilities, setSearchFasilities]
  );

  const goToDetailFasilities = useCallback(
    (item: any) => {
      router.push({
        pathname: "/(root)/DetailFacility",
        params: { id: String(item?.id) },
      });
      setIsBookingAvailabilityId(item?.id);
    },
    [setIsBookingAvailabilityId]
  );

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle={"dark-content"} />

      <View style={styles.container}>
        <View style={styles.headerView}>
          <InputSearch
            placeholder={"Search fasilities"}
            defaultValue={searchFasilities}
            onChangeText={onSearchFacilities}
            onFocus={() => handleSearchFacilities("search_true")}
            onBlur={() => handleSearchFacilities("search_false")}
          />

          {!isSearchFasilities && (
            <ButtonIcon
              icon={"profile"}
              onPress={() => router.navigate("/(root)/Profile")}
            />
          )}

          {isSearchFasilities && (
            <ButtonIcon
              icon={"cancel_search"}
              onPress={() => handleSearchFacilities("search_false")}
            />
          )}
        </View>

        <Gap height={10} />

        <FlatList
          data={dataFacilities! || []}
          keyExtractor={(item, index) => `${item?.id}_${index}`}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <CardFasilities
              item={item}
              onPress={() => goToDetailFasilities(item)}
            />
          )}
          ListHeaderComponent={() => (
            <CardHeaderFasilities name={dataUser?.name} />
          )}
          ListEmptyComponent={loadingFacilities ? null : <NoData />}
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
