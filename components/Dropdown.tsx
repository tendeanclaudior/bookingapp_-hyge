import { DropdownProps, DropdownRef } from "@/types/components";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Dropdown = forwardRef<DropdownRef, DropdownProps>(
  ({ data, onSelect, type }, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["30%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetModalRef.current?.present(),
      close: () => bottomSheetModalRef.current?.dismiss(),
    }));

    const handleSelect = useCallback(
      (item: any) => {
        if (type === "start_hour") {
          if (item?.available) {
            onSelect(item);
            bottomSheetModalRef.current?.dismiss();
          } else {
            Alert.alert("Warning", "Sorry, time is already full");
          }
          return;
        }

        onSelect(item);
        bottomSheetModalRef.current?.dismiss();
      },
      [onSelect, type]
    );

    const renderItem = ({ item }: { item: any }) => {
      return type === "start_hour" ? (
        <TouchableOpacity
          style={styles.optionView}
          onPress={() => handleSelect(item)}
        >
          <Text style={styles.title}>
            {item?.startTime} - {item?.endTime}
          </Text>

          <View
            style={[
              styles.availableView,
              {
                backgroundColor: item?.available ? "#08CB00" : "#C5172E",
              },
            ]}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.optionView}
          onPress={() => handleSelect(item)}
        >
          <Text style={styles.title}>{item.value || item?.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
        >
          <BottomSheetFlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  optionView: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#14151A",
    textTransform: "capitalize",
  },
  availableView: {
    width: 15,
    height: 15,
    borderRadius: 100,
  },
});
