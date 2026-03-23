import { PostCard } from "@/components/PostCard";
import { useArticle } from "@/contexts/ArticeContext";
import postService from "@/lib/postService";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function BookmarksScreen() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<any[]>([]);

  const { bookmarksId } = useArticle();

  const getArticlesById = async () => {
    try {
      const response = await postService.getArticlesById(bookmarksId);
      setBookmarkedArticles(response!)
    } catch (error) {
      console.log("bookmarks :: Error :: ", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
    getArticlesById();
    }, [bookmarksId])
  );

  if (bookmarksId.length == 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center' ,justifyContent: 'center' }}>
        <Text style={{
          fontSize: 18,
          fontWeight: '500',
        }}>
          You haven't bookmarked any article
          </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            articleId={item.id}
            title={item.title}
            content={item.content}
            authorId={item.author_id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
});
