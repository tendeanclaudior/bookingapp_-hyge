import { ButtonIconProps } from "@/types/components";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  ArrowLeftIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronRightIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
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
      case "edit_profile":
        return (
          <View style={styles.contentProfile}>
            <View style={styles.contentProfileView}>
              <UserCircleIcon size={24} color={"#393E46"} />
              <Text style={styles.titleProfileView}>Edit profile</Text>
            </View>

            <ChevronRightIcon size={24} color={"#393E46"} />
          </View>
        );
      case "logout":
        return (
          <View style={styles.contentProfile}>
            <View style={styles.contentProfileView}>
              <ArrowRightStartOnRectangleIcon size={24} color={"#393E46"} />
              <Text style={styles.titleProfileView}>Logout</Text>
            </View>

            <ChevronRightIcon size={24} color={"#393E46"} />
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
    backgroundColor: "#2D2E30",
    width: 30,
    height: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  contentProfile: {
    backgroundColor: "#F6F6F6",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  contentProfileView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  titleProfileView: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#393E46",
  },
});
