import { Redirect } from "expo-router";
import React from "react";

const App = () => {
  return <Redirect href={"/(auth)/signin"} />;
};

export default App;
