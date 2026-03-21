import { View, Text, StyleSheet, FlatList } from "react-native";
import { useArticle } from "@/contexts/ArticeContext";

import { SearchBar } from "@/components/SearchBar";
import { PostCard } from "@/components/PostCard";
import { useEffect, useState } from "react";

export default function Search() {
  const [filterArticles, setFilterArticles] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { articleList } = useArticle();

  const handleSearch = () => {
    const filterData = filterArticles.filter((item) => item.title.toLowerCase() === searchText.toLowerCase());
    setFilterArticles(filterData);
  };

  useEffect(() => {
    setFilterArticles(articleList);
  }, [searchText]);

  return (
    <View style={styles.searchContainer}>
      <SearchBar 
      searchText={searchText}
      setSearchText={setSearchText}
      onClick={handleSearch} 
      />
      <FlatList
        data={filterArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            articleId={item.id}
            title={item.title}
            content={item.content}
            userId={item.user_id}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});
