import { ButtonIconProps } from "@/types/components";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { EyeIcon, EyeSlashIcon, UserIcon } from "react-native-heroicons/solid";

const ButtonIcon = ({ icon, onPress, disabled }: ButtonIconProps) => {
  const Icon = () => {
    switch (icon) {
      case "eye":
        return (
          <View>
            <EyeIcon size={24} color={"#14151A"} />
          </View>
        );
      case "eye-slash":
        return (
          <View>
            <EyeSlashIcon size={24} color={"#14151A"} />
          </View>
        );
      case "back":
        return (
          <View style={styles.backView}>
            <ArrowLeftIcon size={24} color={"#14151A"} />
          </View>
        );
      case "profile":
        return (
          <View style={styles.profileView}>
            <UserIcon size={20} color={"#FFFFFF"} />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={disabled}>
      {Icon()}
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  backView: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  profileView: {
    backgroundColor: "#14151A",
    width: 30,
    height: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
