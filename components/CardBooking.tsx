import { CardBookingProps } from "@/types/components";
import dayjs from "dayjs";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CardBooking = ({
  item,
  onPress,
}: {
  item: CardBookingProps;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.cardView}
      onPress={onPress}
    >
      <Text style={styles.title}>{item?.status}</Text>

      <View style={styles.contentCard}>
        <View>
          <Text>Booking Date</Text>
          <Text>{dayjs(item?.bookingDate).format("DD MMMM YYYY")}</Text>
        </View>

        <View>
          <Text>Created Date</Text>
          <Text>{dayjs(item?.createdAt).format("DD MMMM YYYY")}</Text>
        </View>
      </View>

      <View>
        <Text>Notes</Text>
        <Text>{item?.notes}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CardBooking);

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textTransform: "capitalize",
  },
  contentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
