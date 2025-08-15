import React, { memo } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Gap from "./Gap";

const CardAvailabilFacilities = ({ data }: { data: any[] }) => {
  return (
    <View>
      {data?.map((item, index) => {
        const isLast = index === data.length - 1;

        return (
          <View
            key={index}
            style={{ paddingBottom: Platform.OS === "ios" && isLast ? 50 : 0 }}
          >
            <View style={[styles.cardView, ,]}>
              <View>
                <Text style={styles.title}>{`Current Bookings ( ${
                  String(item?.currentBookings) || "0"
                } )`}</Text>

                <Gap height={10} />

                <Text style={styles.subTitle}>
                  Start Time {item?.startTime || ""} - End Time{" "}
                  {item?.endTime || ""}
                </Text>
              </View>

              <View
                style={[
                  styles.availableView,
                  {
                    backgroundColor: item?.available ? "#08CB00" : "#C5172E",
                  },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default memo(CardAvailabilFacilities);

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: "#F6F6F6",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  availableView: {
    width: 15,
    height: 15,
    borderRadius: 100,
  },
});
