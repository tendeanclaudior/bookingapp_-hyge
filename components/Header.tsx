import { HeaderProps } from "@/types/components";
import { router } from "expo-router";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonIcon from "./ButtonIcon";

const Header = ({ globalHeader, titleGlobal }: HeaderProps) => {
  return (
    <>
      {globalHeader && (
        <View style={styles.headerGlobalView}>
          <ButtonIcon icon={"back"} onPress={() => router.back()} />

          <View style={styles.titleGlobalView}>
            <Text style={styles.titleGlobal}>{titleGlobal}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  headerGlobalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  titleGlobalView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  titleGlobal: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#14151A",
    textTransform: "capitalize",
  },
});
