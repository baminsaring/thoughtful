import { useAuth } from "@/contexts/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { useRouter, Link } from "expo-router";
import { Text, View, StyleSheet, Pressable, Alert} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import avatarPlaceholder from "@/assets/images/avatar.png";
import { useEffect, useState } from "react";
import storageService from "@/lib/storageService";

const BUCKET_NAME = "avatars"

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  const { user, logout } = useAuth();
  const userData = {
    fullName: user?.user_metadata?.full_name ?? "",
    avatarUrl: user?.user_metadata?.avatar_url ?? "",
  }

  const [avatar, setAvatar] = useState<string | any>(avatarPlaceholder)

  useEffect(() => {
    if (userData.avatarUrl) {
      setAvatar(userData.avatarUrl)
    } else {
      setAvatar(avatarPlaceholder)
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: "#dde3fe" }}
      >
        <View style={{ padding: 20 }}>
          <Pressable onPress={() => router.navigate("/(drawer)/(tabs)/profile") }>
            {/* Avatar */}
            <Image
              source={avatar}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                borderRadius: 50,
              }}
            />
          </Pressable>

          {/* User Name */}
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "500",
              fontSize: 18,
              paddingTop: 10,
              color: "#5363df",
            }}
          >
            {userData.fullName}
          </Text>
        </View>

        <View style={{ backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            icon={({ size, color }) => (
              <Ionicons name="log-out-outline" size={size} color={color} />
            )}
            onPress={async () => {
              await logout();
            }}
          />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      >
        <Pressable onPress={() => alert("close")}>
          <Ionicons name="close-outline" size={28} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
