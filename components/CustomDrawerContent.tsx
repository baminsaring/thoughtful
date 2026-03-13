import { useAuth } from "@/contexts/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  const { user, logout} =  useAuth();
  const userName = user?.user_metadata?.full_name ?? ""
  const avatarUrl = user?.user_metadata?.avatar_url ?? ""

  // uri: "https://imgs.search.brave.com/0M93Cj9KEPOwuG8uaecx67yJ4qtySoL7cBE9VOBTXSQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LnNo/dXR0ZXJzdG9jay5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvNS8y/MDI0LzA2L3Byb2Zp/bGVfcGhvdG9fc2Ft/cGxlXzIzLmpwZz9z/c2w9MQ",

  return (
    <View style={{ flex: 1}}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: "#dde3fe"}}
      >
        <View style={{ padding: 20 }}>
          {/* Avatar */}
          <Image
            source={avatarUrl}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
              borderRadius: 50,
            }}
          />

          <View style={{ borderWidth: 1, width: 100, height: 100, borderRadius: 50, alignSelf: 'center' }}>
            <Text>Edit</Text>
          </View>

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
            {userName}
          </Text>
        </View>

        <View style={{ backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
          <DrawerItem 
            label="Logout" 
            icon={ ({size, color}) => <Ionicons name="log-out-outline" size={size} color={color}/>}
            onPress={ async () => {
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

const styles = StyleSheet.create({})