import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

const TitleContent = ({ title }: { title: string }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default memo(TitleContent);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#14151A",
    marginBottom: 10,
  },
});
