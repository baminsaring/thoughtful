import { Drawer } from "expo-router/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomDrawerContent from "@/components/CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: "#5263df",
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: { marginLeft: -10 },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Overview",
          headerShown: false,
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="add-new-article"
        options={{
          drawerLabel: "Add new article",
          title: "Add new article",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="duplicate-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="your-articles"
        options={{
          drawerLabel: "Your articles",
          title: "Your articles",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      
    </Drawer>
  );
}
