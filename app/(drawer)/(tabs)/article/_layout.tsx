import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ArticleLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        title: "",
        headerLeft: () => (
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back-outline" size={24} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => router.back()}
          >
            <Ionicons name="bookmark-outline" size={24} />
          </TouchableOpacity>
        ),
      }}
    />
  );
}
