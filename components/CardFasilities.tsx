import { sliceTitleView } from "@/utils";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CardFasilities = ({
  item,
  onPress,
}: {
  item: CardFasilitiesProps;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.cardView}
      onPress={onPress}
    >
      <View style={styles.headerView}>
        <Text style={styles.title}>{sliceTitleView(item?.name, 25)}</Text>

        <Text style={styles.subTitle}>{item?.status}</Text>
      </View>

      <View>
        <Text style={styles.title}>Desc</Text>

        <Text style={styles.titleDesc}>{item?.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CardFasilities);

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    gap: 10,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#14151A",
    textTransform: "capitalize",
  },
  subTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#14151A",
    textTransform: "capitalize",
  },
  titleDesc: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#14151A",
    textTransform: "capitalize",
  },
});
