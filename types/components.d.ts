import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface InputFieldProps extends TextInputProps {
  label: string;
  secureTextEntry?: boolean;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

declare interface GapProps {
  width?: number;
  height?: number;
}

declare interface ButtonIconProps {
  icon: string;
  onPress: () => void;
  disabled?: boolean;
}
