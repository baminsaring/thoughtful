import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useArticle } from "@/contexts/ArticeContext";

import { SearchBar } from "@/components/SearchBar";
import { PostCard } from "@/components/PostCard";
import CircularProgress from "@/components/ProgressBar";

export default function Index() {
  const [articles, setArticles] = useState<any[]>([]);
  //const [isLoading, setIsLoading] = useState<boolean>(true)

  const router = useRouter();
  const { articleList, isLoading } = useArticle();

  // const handleButton = (articleId: number, title: string, content: string) => {

  //   router.push({
  //     pathname: "/(drawer)/(tabs)/article",
  //     params: { 
  //       postId: '1', title: `${title}`, content: `${content}` 
  //     }
  //   });
  // };

  useEffect(() => {
    setArticles(articleList);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.progressBarOverlay}>
          <CircularProgress />
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
                  coverImgUrl={item.cover_img_url}
                  userId={item.user_id}
                />
            )}
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
