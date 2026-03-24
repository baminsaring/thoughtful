import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useArticle } from "@/contexts/ArticeContext";
import Toast from "react-native-toast-message";

import { PostCard } from "@/components/PostCard";
import CircularProgress from "@/components/ProgressBar";

export default function Index() {
  const [articles, setArticles] = useState<any[]>([]);
  //const [isLoading, setIsLoading] = useState<boolean>(true)

  const router = useRouter();
  const { articleList, isLoading, refresh } = useArticle();


  useEffect(() => {
    setArticles(articleList);
  }, [refresh]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.progressBarOverlay}>
          <CircularProgress color="blue" size={80}/>
        </View>
      ) : (
        <View>
          <FlatList
            data={articleList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PostCard
                  articleId={item.id}
                  title={item.title}
                  content={item.content}
                  authorId={item.author_id}
                />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    padding: 20,
  },
  progressBarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
