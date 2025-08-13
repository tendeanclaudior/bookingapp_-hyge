import { Stack } from "expo-router";
import "react-native-reanimated";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="signup"
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack>
  );
};

export default Layout;
