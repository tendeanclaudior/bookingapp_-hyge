import { addDays, endOfMonth, format, startOfDay } from "date-fns";
import React, { memo, useCallback, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DatePickerHorizontalProps {
  onDateSelect: (date: string) => void;
}

const DatePickerHorizontal: React.FC<DatePickerHorizontalProps> = ({
  onDateSelect,
}) => {
  const today = startOfDay(new Date());
  const [selectedDate, setSelectedDate] = useState(today);

  const dates = useMemo(() => {
    const arr = [];
    let current = today;
    const lastDay = endOfMonth(today);

    while (current <= lastDay) {
      arr.push(current);
      current = addDays(current, 1);
    }
    return arr;
  }, [today]);

  const handleSelect = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      onDateSelect(format(date, "yyyy-MM-dd"));
    },
    [onDateSelect]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleMonthYears}>{format(today, "MMMM yyyy")}</Text>

      <FlatList
        horizontal
        data={dates}
        keyExtractor={(item) => item.toISOString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => {
          const isSelected =
            format(item, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <TouchableOpacity
              style={[
                styles.dateView,
                { backgroundColor: isSelected ? "#F0F0F0" : "#2D2E30" },
              ]}
              onPress={() => handleSelect(item)}
            >
              <Text
                style={[
                  styles.titleDate,
                  { color: isSelected ? "#2D2E30" : "#F0F0F0" },
                ]}
              >
                {format(item, "EEE")}
              </Text>

              <Text
                style={[
                  styles.titleDate,
                  { color: isSelected ? "#2D2E30" : "#F0F0F0" },
                ]}
              >
                {format(item, "dd")}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default memo(DatePickerHorizontal);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  titleMonthYears: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
  },
  dateView: {
    width: 50,
    height: 70,
    borderRadius: 100,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titleDate: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
});
