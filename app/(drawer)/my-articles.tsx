import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useArticle } from "@/contexts/ArticeContext";
import { FlatList } from "react-native-gesture-handler";
import { PostCard } from "@/components/PostCard";
import { ArticleType } from "@/contexts/ArticeContext";
import { useAuth } from "@/contexts/AuthContext";

export default function my_articles() {
  const [ myArticles, setMyArticles ] = useState<any[]>([])

  const { articleList } = useArticle();
  const { user } = useAuth()

  const filterArticles = () => {
    const filterData = articleList.filter(item => item.user_id === user.id)
    setMyArticles(filterData);
  }

  useEffect(() => {
    filterArticles();
  }, [articleList, user.id]);

  return (
    <View style={styles.container}>
      <FlatList
        data={myArticles}
        keyExtractor={(item) => item.user_id}
        renderItem={({ item }) => (
          <PostCard
            articleId={item.id}
            title={item.title}
            content={item.content}
            userId={item.user_id}
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
