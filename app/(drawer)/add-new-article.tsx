import { StyleSheet, Text, View, Alert } from "react-native";

import RTE from "@/components/RTE";
import InputBox from "@/components/InputBox";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button";
import postService from "@/lib/postService";
import { useAuth } from "@/contexts/AuthContext";
import { useArticle } from "@/contexts/ArticeContext";
import { useRoute } from "@/contexts/RouteContext";

import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";

export default function AddNewArticle() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // const router = useRouter();
  const navigation = useNavigation();
  // const { headerTitle } = useLocalSearchParams();

  const { isEditScreen, setIsEditScreen } = useRoute();
  const { refresh, setRefresh } = useArticle();
  const { user } = useAuth();
  const user_id = user?.id ?? "";

  const { article } = useArticle();

  const setData = () => {
    setTitle(article.title);
    setContent(article.content);
  }

  const clearData = () => {
    setTitle("");
    setContent("");
  }

  const handlePublish = async () => {
    if (title.trim() && content.trim()) {
      const { success } = await postService.uploadArticle(
        title,
        content,
        user_id,
      );

      if (success) {
        Alert.alert("Article published!");
        setRefresh(true);
        setTitle("");
        setContent("");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      if (title.trim() && content.trim()) {
        const { success } = await postService.uploadArticle(
          title,
          content,
          user_id,
        );

        if (success) {
          Alert.alert("Article published!");
          setRefresh(true);
          setTitle("");
          setContent("");
        }
      }
    } catch (error) {
      console.log("Error updating the article");
    }
  };

  useFocusEffect(
    useCallback(() => {
      
      navigation.setOptions({
        title: isEditScreen ? "Edit Article" : "Create Article",
      });

      if (isEditScreen) {
        setData();
      } else {
        clearData();
      }

      return () => {
        setIsEditScreen(false);
      };
    }, [refresh, isEditScreen]),
  );

  return (
    <View style={styles.container}>
      <InputBox
        label="Title"
        text={title}
        onChangeText={setTitle}
        placeholder="Title"
      />

      <View style={styles.contentContainer}>
        <Text>Content</Text>

        <RTE
          initialContent={content}
          onContentChange={setContent}
          clearContent={refresh}
        />
      </View>

      <Button
        label={isEditScreen ? "Update" : "Publish"}
        onClick={handlePublish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  contentContainer: {
    width: "100%",
    gap: 5,
    marginVertical: 10,
  },
});
