import { Text, View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

import { SearchBar } from "@/components/SearchBar";
import { PostCard } from "@/components/PostCard";
import CircularProgress from "@/components/ProgressBar";

export default function Index() {
  const [posts, setPosts] = useState<any[]>([]);

  const { isLoading } = useAuth();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { data, error } = await supabase.from("posts").select("*");
      setPosts(data || []);
    } catch (error: any) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard
              title={item.title}
              content={item.content}
              userImgUri={item.cover_img_url}
            />
          )}
        />
      </View>

      { isLoading ??  
       <View style={styles.progressBarOverlay}>
        <CircularProgress />
       </View>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: "center",
    padding: 20,
  },
  progressBarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
