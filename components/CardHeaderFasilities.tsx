import { sliceTitleView } from "@/utils";
import React, { memo } from "react";
import { View } from "react-native";
import TitleContent from "./TitleContent";

const CardHeaderFasilities = ({ name }: { name: string }) => {
  return (
    <View>
      <TitleContent title={`Welcome, ${sliceTitleView(name, 15)} 👋`} />

      <TitleContent title={"Facilities"} />
    </View>
  );
};

export default memo(CardHeaderFasilities);
