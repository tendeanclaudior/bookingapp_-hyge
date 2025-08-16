import {
  createBooking,
  useGetAvailabilityFacilities,
  useGetFacilities,
} from "@/apis";
import { Button, DatePicker, Dropdown, Header, InputText } from "@/components";
import { useCreateBookingStore, useFasilitiesStore } from "@/store";
import { DropdownRef } from "@/types/components";
import { createBookingSchema, CreateBookingSchemaType } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BookFasility = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateBookingSchemaType>({
    resolver: zodResolver(createBookingSchema),
  });
  const dropdownFacilityRef = useRef<DropdownRef>(null);
  const dropdownHourRef = useRef<DropdownRef>(null);
  const { data: dataFacilities } = useGetFacilities<
    CardFasilitiesProps[] | null
  >();
  const { data: dataAvailabilFacilities, refetch: refetchAvailabilFacilities } =
    useGetAvailabilityFacilities<AvailabilFasilitiesProps | null>();
  const {
    isBookingDate,
    setIsBookingDate,
    setIsBookingAvailabilityId,
    resetCreateBooking,
  } = useCreateBookingStore();
  const { setDateAvailabilityFacilities } = useFasilitiesStore();

  const onBack = useCallback(() => {
    router.back();
    resetCreateBooking();
    setDateAvailabilityFacilities("");
  }, [resetCreateBooking, setDateAvailabilityFacilities]);

  const handleContentInput = useCallback(
    (type: string) => {
      if (type === "facility") {
        Keyboard.dismiss();
        dropdownFacilityRef.current?.open();
        return;
      }

      if (type === "booking_date") {
        Keyboard.dismiss();
        setIsBookingDate(true);
        return;
      }

      if (type === "start_hour") {
        Keyboard.dismiss();
        dropdownHourRef.current?.open();
        return;
      }
    },
    [setIsBookingDate]
  );

  const onChangeValue = useCallback(
    (type: string, item: any) => {
      if (type === "facility") {
        const selected = { id: String(item.id), name: String(item.name) };
        setValue("facility", selected, { shouldValidate: true });
        setIsBookingAvailabilityId(selected?.id);
        return;
      }

      if (type === "booking_date") {
        const formattedInput = dayjs(item).locale("id").format("DD MMMM YYYY");
        setValue("booking_date", formattedInput, { shouldValidate: true });

        const formattedFilter = dayjs(item).locale("id").format("YYYY-MM-DD");
        setDateAvailabilityFacilities(formattedFilter);
        refetchAvailabilFacilities();

        setIsBookingDate(false);
        return;
      }

      if (type === "start_hour") {
        setValue(
          "available_slots",
          { hour: String(item.hour), startTime: String(item.startTime) },
          { shouldValidate: true }
        );
        return;
      }
    },
    [
      refetchAvailabilFacilities,
      setDateAvailabilityFacilities,
      setIsBookingAvailabilityId,
      setIsBookingDate,
      setValue,
    ]
  );

  const onCreate = useCallback(
    (data: CreateBookingSchemaType) => {
      createBooking(data, reset);
    },
    [reset]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.page}>
        <StatusBar barStyle={"dark-content"} />
        <Header
          globalHeader={true}
          titleGlobal={"Book Facility"}
          onPress={() => onBack()}
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View>
              <Controller
                control={control}
                name="facility"
                render={({ field: { onChange, value } }) => (
                  <InputText
                    label={"Facility"}
                    placeholder={"Select Facility"}
                    onFocus={() => handleContentInput("facility")}
                    dropdown
                    value={value ? value.name : ""}
                    onChangeText={onChange}
                    error={errors?.facility ? true : false}
                    errorMessage={errors?.facility?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="booking_date"
                render={({ field: { onChange, value } }) => (
                  <InputText
                    label={"Booking Date"}
                    placeholder={"DD MMMM YYYYY"}
                    onFocus={() => handleContentInput("booking_date")}
                    value={value}
                    onChangeText={onChange}
                    error={errors?.booking_date ? true : false}
                    errorMessage={errors?.booking_date?.message}
                  />
                )}
              />

              <DatePicker
                visible={isBookingDate}
                onSelect={(value) => onChangeValue("booking_date", value)}
              />

              <Controller
                control={control}
                name="available_slots"
                render={({ field: { onChange, value } }) => (
                  <InputText
                    label={"Start Hour"}
                    placeholder={"00 : 00"}
                    onFocus={() => handleContentInput("start_hour")}
                    dropdown
                    value={value ? value.startTime : ""}
                    onChangeText={onChange}
                    error={errors?.available_slots ? true : false}
                    errorMessage={errors?.available_slots?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="notes"
                render={({ field: { onChange, value } }) => (
                  <InputText
                    label={"Notes"}
                    placeholder={"Notes"}
                    multiline={true}
                    value={value}
                    onChangeText={onChange}
                    error={errors?.notes ? true : false}
                    errorMessage={errors?.notes?.message}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.butonView}>
          <Button title={"Save"} onPress={handleSubmit(onCreate)} />
        </View>

        <Dropdown
          ref={dropdownFacilityRef}
          data={dataFacilities! || []}
          onSelect={(item) => onChangeValue("facility", item)}
          type={"facility"}
        />

        <Dropdown
          ref={dropdownHourRef}
          data={dataAvailabilFacilities?.timeSlots! || []}
          onSelect={(item) => onChangeValue("start_hour", item)}
          type={"start_hour"}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default BookFasility;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  butonView: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
