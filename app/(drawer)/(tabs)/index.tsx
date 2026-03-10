import { Text, View, FlatList, StyleSheet } from "react-native";

import { SearchBar } from "@/components/SearchBar";
import { PostCard } from "@/components/PostCard";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Index() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    try {
      const { data, error } = await supabase.from('posts').select('*');
      //console.log("Data: ", data)
      //console.log("Error: ", error)
      setPosts(data || [])
    } catch (error: any) {
      console.log("Error: ", error.message)
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList 
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostCard title={item.title} content={item.content} userImgUri={item.cover_img_url}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});
