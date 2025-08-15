import React, { memo } from "react";
import { ButtonProps, StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ title, disabled, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.buttonView,
        { backgroundColor: disabled ? "#AAAAAA" : "#14151A" },
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  buttonView: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});
