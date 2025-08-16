import { TabButtonProps } from "@/types/components";
import React, { memo, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TabButton = ({ data, selectedIndex, onPress }: TabButtonProps) => {
  const onSelectedInde = useCallback(
    (item: any, index: number) => {
      if (onPress) {
        onPress(item, index);
      }
    },
    [onPress]
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.isArray(data) &&
          data?.map((item, index) => {
            const isSelected = selectedIndex === index;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={[
                  styles.tabView,
                  {
                    backgroundColor: isSelected ? "#F0F0F0" : "#2D2E30",
                  },
                ]}
                onPress={() => onSelectedInde(item, index)}
              >
                <Text
                  style={[
                    styles.titleTab,
                    { color: isSelected ? "#2D2E30" : "#F0F0F0" },
                  ]}
                >
                  {item?.value}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default memo(TabButton);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabView: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  titleTab: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
});
