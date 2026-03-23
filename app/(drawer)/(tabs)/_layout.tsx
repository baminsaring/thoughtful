import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Text, Pressable, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerLeft: () => {
          return router.canGoBack() ? (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back-outline" size={24} />
            </TouchableOpacity>
          ) : (
            <DrawerToggleButton />
          );
        },
        headerRight: () => {
          return router.canGoBack() ? null : (
            <TouchableOpacity
              style={{ paddingRight: 10 }}
              onPress={() => alert("No notifications")}
            >
              <Ionicons name="notifications-outline" size={24} />
            </TouchableOpacity>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarStyle: {
            display: "flex",
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={ focused ? "person" : "person-outline" }
              color={color}
              size={24}
            />
          )
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          href: null,
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="article"
        options={{
          title: "Bro",
          headerShown: false,
          href: null,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
    </Tabs>
  );
}
