import { IconNotFound } from "@/assets/svg";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Gap from "./Gap";

const NoData = () => {
  return (
    <View style={styles.container}>
      <IconNotFound />

      <Gap height={20} />

      <Text style={styles.title}>Data not Found</Text>
    </View>
  );
};

export default memo(NoData);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "Jakarta-SemiBold",
    color: "#14151A",
  },
});
