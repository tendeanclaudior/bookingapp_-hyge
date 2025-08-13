import React from "react";
import { ButtonProps, StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.buttonView} {...props}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonView: {
    width: "100%",
    padding: 10,
    backgroundColor: "#14151A",
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
