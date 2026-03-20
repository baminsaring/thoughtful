import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useArticle } from "@/contexts/ArticeContext";
import postService from "@/lib/postService";

import DropdownMenu from "@/components/DropdownMenu";

export default function ArticleLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

  const router = useRouter();
  const { article } = useArticle();

  const handleIconClick = async (selectedItem: string) => {
    const articleId = article.id
    const { success } = await postService.deleteArticle(articleId)
    //console.log("Layout: ", selectedItem, "Id: ", articleId);

    if (!success) throw new Error("Unable to delete the article!");

    if (success) Alert.alert("Article deleted successfully!")
      router.back();
  }

  return (
    <Stack
      screenOptions={{
        title: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={24} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          // Dropdown Menu
          <View style={styles.iconContainer}>
            {/* Bookmark Icon */}
            <TouchableOpacity style={{ padding: 10 }} onPress={() => {}}>
              <Ionicons name="bookmark-outline" size={24} />
            </TouchableOpacity>

            {/* Dropdown Menu Icon */}
            {article.isEditable ? (
              <DropdownMenu onPressIcon={handleIconClick} />
            ) : null}
          </View>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
