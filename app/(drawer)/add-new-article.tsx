import { StyleSheet, Text, View } from "react-native";

import RTE from "@/components/RTE";
import InputBox from "@/components/InputBox";
import { useState } from "react";
import Button from "@/components/Button";
import postService from "@/lib/postService";
import { useAuth } from "@/contexts/AuthContext";

export default function AddNewArticle() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>('');

  const { user } = useAuth();
  const user_id = user?.id ?? "";

  const handleSave = async() => {
    if (title.trim() && content.trim()) {
      await postService.uploadArticle(title, content, user_id)
    }
  }

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
        <RTE initialContent={content} onContentChange={setContent} />
      </View>

      <Button label="Create" onClick={handleSave} />
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
