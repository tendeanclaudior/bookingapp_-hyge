import { router, Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import {
  HomeIcon,
  ListBulletIcon,
  PlusIcon,
} from "react-native-heroicons/solid";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#2D2E30",
          borderRadius: 30,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <HomeIcon size={30} color={"#FFFFFF"} />
              ) : (
                <HomeIcon size={30} color={"#AAAAAA"} />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="Book"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.navigate("/(root)/BookFasility")}
            >
              <View
                style={{
                  top: -30,
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  backgroundColor: "#65AEFF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlusIcon size={30} color={"#FFFFFF"} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="Booking"
        options={{
          title: "Booking",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <ListBulletIcon size={30} color={"#FFFFFF"} />
              ) : (
                <ListBulletIcon size={30} color={"#AAAAAA"} />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
