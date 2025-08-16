import { DatePickerProps } from "@/types/components";
import React, { memo, useCallback, useState } from "react";
import { View } from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

const DatePicker = ({ visible, onSelect }: DatePickerProps) => {
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>();
  const now = new Date();
  const endDateMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const handleSelect = useCallback(
    (date: DateType) => {
      if (date instanceof Date) {
        onSelect(date);
        setSelected(date);
      }
    },
    [onSelect]
  );

  return (
    <View>
      {visible && (
        <DateTimePicker
          mode="single"
          date={selected}
          minDate={new Date()}
          maxDate={endDateMonth}
          onChange={({ date }) => handleSelect(date)}
          styles={defaultStyles}
        />
      )}
    </View>
  );
};

export default memo(DatePicker);
