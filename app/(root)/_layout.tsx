import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="BookFasility"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack>
  );
};

export default Layout;
