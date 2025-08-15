import { InputFieldProps } from "@/types/components";
import React, { memo, useCallback, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ButtonIcon from "./ButtonIcon";
import Gap from "./Gap";

const InputText = ({
  label,
  secureTextEntry,
  error,
  errorMessage,
  ...props
}: InputFieldProps) => {
  const [focus, setFocus] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const pressSecurePassword = useCallback(() => {
    setSecurePassword((prevState) => !prevState);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios" || Platform.OS === "android"
          ? "padding"
          : "height"
      }
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ marginBottom: 10 }}>
          <Text>{label}</Text>

          <Gap height={5} />

          <View
            style={[
              styles.inputView,
              {
                borderWidth: focus ? 0.5 : 0,
                borderColor: focus ? "#14151A" : "transparent",
              },
            ]}
          >
            <View style={styles.contentInput}>
              <TextInput
                style={styles.inputContent}
                placeholderTextColor={"#AAAAAA"}
                secureTextEntry={secureTextEntry ? securePassword : false}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                {...props}
              />

              {secureTextEntry && (
                <>
                  {securePassword ? (
                    <ButtonIcon
                      icon={"eye-slash"}
                      onPress={() => pressSecurePassword()}
                    />
                  ) : (
                    <ButtonIcon
                      icon={"eye"}
                      onPress={() => pressSecurePassword()}
                    />
                  )}
                </>
              )}
            </View>
          </View>

          {error && <Text style={styles.errorTitle}>{errorMessage}</Text>}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default memo(InputText);

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "#F6F8FA",
    borderRadius: 8,
    padding: 10,
  },
  contentInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  inputContent: {
    flex: 1,
    padding: 5,
    fontSize: 14,
    fontFamily: "Jakarta-SemiBold",
    color: "#14151A",
  },
  errorTitle: {
    color: "#E14434",
    fontSize: 12,
    marginTop: 4,
  },
});
