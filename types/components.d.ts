import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface InputFieldProps extends TextInputProps {
  label: string;
  secureTextEntry?: boolean;
  dropdown?: boolean;
  multiline?: boolean;
  error?: boolean;
  errorMessage?: string;
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

declare interface HeaderProps {
  mainHeader?: boolean;
  titleMain?: string;
  globalHeader: boolean;
  titleGlobal?: string;
  onPress?: () => void;
}

declare interface InputSearchProps extends TextInputProps {
  placeholder?: string;
}

declare interface DropdownRef {
  open: () => void;
  close: () => void;
}

declare interface DropdownProps {
  data: any[];
  onSelect: (item: { value: string | number; name: string | number }) => void;
  type: string;
}

declare interface DatePickerProps {
  visible: boolean;
  onSelect: (date: Date) => void;
}
