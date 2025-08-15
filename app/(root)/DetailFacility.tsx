import { useGetAvailabilityFacilities, useGetDetailFacilities } from "@/apis";
import {
  CardAvailabilFacilities,
  DatePickerHorizontal,
  Gap,
  Header,
} from "@/components";
import { useFasilitiesStore } from "@/store";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

const DetailFacility = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: dataDetailFacilities, loading: loadingDetailFacilities } =
    useGetDetailFacilities<DetailFasilitiesProps | null>(id);
  const { data: dataAvailabilFacilities, refetch: refetchAvailabilFacilities } =
    useGetAvailabilityFacilities<AvailabilFasilitiesProps | null>(id);
  const { setDateAvailabilityFacilities } = useFasilitiesStore();

  const handleDateSelect = useCallback(
    (date: string) => {
      setDateAvailabilityFacilities(date);

      setTimeout(() => refetchAvailabilFacilities(), 300);
    },
    [refetchAvailabilFacilities, setDateAvailabilityFacilities]
  );

  return (
    <View
      style={[
        styles.page,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
        },
      ]}
    >
      <StatusBar barStyle={"dark-content"} />
      <Header globalHeader={true} titleGlobal={"Detail Facility"} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!loadingDetailFacilities && (
          <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dataDetailFacilities?.images?.map((item, index) => (
                <Image
                  key={index}
                  source={{ uri: item?.filePath }}
                  style={styles.imageView}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            <Gap height={10} />

            <View>
              <Text style={styles.title}>{`${
                dataDetailFacilities?.name || ""
              } | Capacity : ${dataDetailFacilities?.maxCapacity || ""} | ${
                dataDetailFacilities?.status || ""
              }`}</Text>

              <Gap height={5} />

              <Text style={styles.subTitle}>
                {dataDetailFacilities?.description || ""}
              </Text>

              <DatePickerHorizontal onDateSelect={handleDateSelect} />

              <Gap height={5} />

              <CardAvailabilFacilities
                data={dataAvailabilFacilities?.timeSlots!}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailFacility;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageView: {
    width: screenWidth - 40,
    height: (screenWidth - 40) * 0.56,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#14151A",
    textTransform: "capitalize",
  },
  subTitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#14151A",
  },
});
