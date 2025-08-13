import { GapProps } from "@/types/components";
import React from "react";
import { View } from "react-native";

const Gap = ({ width, height }: GapProps) => {
  return <View style={{ width, height }} />;
};

export default Gap;
