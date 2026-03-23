import { Stack, useFocusEffect } from "expo-router";
import { useRouter, usePathname } from "expo-router";
import { View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useState } from "react";
import { useArticle } from "@/contexts/ArticeContext";
import { useAuth } from "@/contexts/AuthContext";
import postService from "@/lib/postService";

import DropdownMenu from "@/components/DropdownMenu";
import profileService from "@/lib/profileService";

export default function ArticleLayout() {
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const router = useRouter();
  const { user } = useAuth();
  const { article, refresh, setRefresh, bookmarksId, setBookmarksId } = useArticle();


  const handleBookmarkIconClick = async () => {
    let newBookmarksArr = isBookmark
      ? bookmarksId.filter((id) => id !== article.id)
      : [...bookmarksId, article.id];

    try {
      await profileService.insertBookmark(user.id, newBookmarksArr);
      setIsBookmark(!isBookmark);
      setRefresh(true);
    } catch (error) {
      console.log("Failed to update bookmark:", error);
      setBookmarksId(bookmarksId);
      setIsBookmark(isBookmark);
    }
  };

  const handleEditIconClick = async () => {
    router.replace({
      pathname: "/(drawer)/add-new-article",
      params: { headerTitle: "Edit Article" }
    });
  }

  const handleDeleteIconClick = async () => {
    const { success } = await postService.deleteArticle(article.id);

    if (!success) {
      Alert.alert("Error", "Unable to delete the article!");
      return;
    }

    Alert.alert("Success", "Article deleted successfully!");
    setRefresh(true);
    router.back();
  };

   // Re-fetch data when screen gains focus
  // Update bookmark status whenever bookmarksArr or article.id changes
  useFocusEffect(
    useCallback(() => {
      if (article.id && bookmarksId.length > 0) {
        setIsBookmark(bookmarksId.includes(article.id));
      } else {
        setIsBookmark(false);
      }
    }, [bookmarksId, article.id])
  );

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
          <View style={styles.iconContainer}>
            {/* Bookmark Icon */}
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={handleBookmarkIconClick}
            >
              <Ionicons
                name={isBookmark ? "bookmark" : "bookmark-outline"}
                size={24}
              />
            </TouchableOpacity>

            {/* Dropdown Menu Icon */}
            {article.isEditable ? (
              <DropdownMenu 
              onEditIconClick={handleEditIconClick}
              onDeleteIconClick={handleDeleteIconClick} 
              />
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
