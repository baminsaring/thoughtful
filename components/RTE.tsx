import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RichText, Toolbar, useEditorBridge, TenTapStartKit } from "@10play/tentap-editor";

type Props = {
  initialContent: string;
  onContentChange: (content: string) => void;
  clearContent: boolean;
}

export default function RTE({ initialContent, onContentChange, clearContent }: Props) {

  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    initialContent: initialContent,
    bridgeExtensions: TenTapStartKit,
    onChange: () => {
      handleHtml();
    }
  });


  const handleHtml = async () => {
    const htmlContent = await editor.getHTML();
    onContentChange(htmlContent);
  }

  const clearContentData = () => {
    editor.setContent('');
  }

  useEffect(() => {
    if (clearContent) clearContentData();
  }, [clearContent])

  return (
    <SafeAreaView style={styles.container}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 400,
    borderWidth: 1
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
