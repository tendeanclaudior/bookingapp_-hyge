import { InputSearchProps } from "@/types/components";
import React, { memo } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

const InputSearch = ({ ...props }: InputSearchProps) => {
  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios" || Platform.OS === "android"
          ? "padding"
          : "height"
      }
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputView}>
          <View style={styles.contentInput}>
            <MagnifyingGlassIcon size={20} color={"#AAAAAA"} />

            <TextInput
              style={styles.inputContent}
              placeholderTextColor={"#AAAAAA"}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default memo(InputSearch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
  },
  inputView: {
    backgroundColor: "#F6F8FA",
    borderRadius: 8,
    padding: 5,
  },
  contentInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContent: {
    flex: 1,
    padding: 5,
    fontSize: 14,
    fontFamily: "Jakarta-SemiBold",
    color: "#14151A",
  },
});
