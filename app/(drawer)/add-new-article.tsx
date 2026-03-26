import { StyleSheet, Text, View, Alert } from "react-native";

import RTE from "@/components/RTE";
import InputBox from "@/components/InputBox";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button";
import postService from "@/lib/postService";
import { useAuth } from "@/contexts/AuthContext";
import { useArticle } from "@/contexts/ArticeContext";
import { useRoute } from "@/contexts/RouteContext";
import Progressbar from "@/components/ProgressBar";

import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";

export default function AddNewArticle() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clearContent, setClearContent] = useState<boolean>(false);

  const navigation = useNavigation();
  // const router = useRouter();
  // const { headerTitle } = useLocalSearchParams();

  const { isEditScreen, setIsEditScreen } = useRoute();
  const { refresh, setRefresh } = useArticle();
  const { user } = useAuth();
  const user_id = user?.id ?? "";

  const { article } = useArticle();

  const setData = () => {
    setTitle(article.title);
    setContent(article.content);
  };

  const clearData = () => {
    setTitle("");
    setContent("");
  };

  const handlePublish = async () => {
    try {
      if (title.trim() && content.trim()) {
        setIsLoading(true);

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
      console.log("Error update or publishing article: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      if (title.trim() && content.trim()) {
        const response = await postService.updateArticle(
          article.id,
          title,
          content
        );

        if (response) {
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
        console.log("Content: ", content);
      } else {
        clearData();
      }
    }, [isEditScreen]),
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

      {isEditScreen ? (
        <Button
          label="Update"
          onClick={handleUpdate}
        />
      ) : (
        <Button
          label="Publish"
          onClick={handlePublish}
        />
      )}

      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Progressbar color="blue" size={80} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
