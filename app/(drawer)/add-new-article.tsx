import { StyleSheet, Text, View, Alert } from "react-native";

import RTE from "@/components/RTE";
import InputBox from "@/components/InputBox";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import postService from "@/lib/postService";
import { useAuth } from "@/contexts/AuthContext";
import { useArticle } from "@/contexts/ArticeContext";

export default function AddNewArticle() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { refresh, setRefresh } = useArticle();
  const { user } = useAuth();
  const user_id = user?.id ?? "";

  const handlePublish = async() => {
    if (title.trim() && content.trim()) {
      const { success } =await postService.uploadArticle(title, content, user_id)

      if (success) {
        Alert.alert("Article published!");
        setRefresh(true);
        setTitle("");
        setContent("");
      }
    }
  }

  useEffect(() => {
    setContent("");
  }, [refresh])

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create Article</Text>

      <InputBox
        label="Title"
        text={title}
        onChangeText={setTitle}
        placeholder="Title"
      />

      <View style={styles.contentContainer}>
        <Text>Content</Text>

        <RTE initialContent={content} onContentChange={setContent} clearContent={refresh}/>
      </View>

      <Button label="Publish" onClick={handlePublish} />
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
  }
});
