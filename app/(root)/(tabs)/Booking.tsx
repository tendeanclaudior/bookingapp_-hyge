import { deleteBooking, useGetBookingUser } from "@/apis";
import { CardBooking, Header, NoData, TabButton } from "@/components";
import { useBookingStore } from "@/store";
import { dataTabBookingList } from "@/utils";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

const Booking = () => {
  const {
    data: dataBooking,
    loading: loadingBooking,
    loadingMore: loadingMoreBooking,
    refetch: refetchBooking,
    loadMore: loadMoreBooking,
  } = useGetBookingUser();
  const {
    selectedTabIndex,
    setSelectedIndex,
    setSelectedTabType,
    selectedByAscDesc,
    setSelectedByAscDesc,
  } = useBookingStore();

  const onTabChanged = useCallback(
    (value: any, index: number) => {
      setSelectedIndex(index);
      setSelectedTabType(value?.key);

      setTimeout(() => refetchBooking(), 300);
    },
    [refetchBooking, setSelectedIndex, setSelectedTabType]
  );

  const onAscDescChanged = useCallback(() => {
    const isChange = selectedByAscDesc === "asc" ? "desc" : "asc";
    setSelectedByAscDesc(isChange);

    setTimeout(() => refetchBooking(), 300);
  }, [refetchBooking, selectedByAscDesc, setSelectedByAscDesc]);

  const createTwoButtonAlert = useCallback(
    (item: any) => {
      if (item?.status === "cancelled") {
        return;
      }

      Alert.alert(`Status ${item?.status}`, "Are you sure to cancel?", [
        {
          text: "Close",
          onPress: () => null,
        },
        {
          text: "OK",
          onPress: () => deleteBooking(item?.id, refetchBooking),
          style: "destructive",
        },
      ]);
    },
    [refetchBooking]
  );

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle={"dark-content"} />
      <Header
        mainHeader={true}
        titleMain={"Booking List"}
        mainAscDesc={true}
        onPress={() => onAscDescChanged()}
        globalHeader={false}
      />

      {!loadingBooking && (
        <FlatList
          data={dataBooking}
          keyExtractor={(item, index) => `${item?.id}_${index}`}
          contentContainerStyle={styles.container}
          ListHeaderComponent={() => (
            <TabButton
              data={dataTabBookingList}
              selectedIndex={selectedTabIndex}
              onPress={(value, index) => onTabChanged(value, index)}
            />
          )}
          renderItem={({ item }) => (
            <CardBooking
              item={item}
              onPress={() => createTwoButtonAlert(item)}
            />
          )}
          onEndReached={loadMoreBooking}
          onEndReachedThreshold={16}
          ListEmptyComponent={<NoData />}
          ListFooterComponent={
            loadingMoreBooking ? (
              <ActivityIndicator size={"large"} color={"#000000"} />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
