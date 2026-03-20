import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useArticle } from "@/contexts/ArticeContext";
import profileService from "@/lib/profileService";
import DropdownMenu from "@/components/DropdownMenu";

export default function Article() {

  const [creatorInfo, setCreatorInfo] = useState<any>({})
  const { width } = useWindowDimensions();

  const { article } = useArticle();

  // const params = useLocalSearchParams();
  // const { id, title, content} = params

  const source = {
    html: `${article.content}`
  }

  return (
    <View style={styles.container}>
      {/* Post Title */}
      <Text style={styles.titleLabel}>{article.title}</Text>

      {/* User Info Section*/}
      <View style={styles.userConatiner}>
        <Image
          source={article.userAvatarUrl}
          style={{ height: 35, width: 35, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 16 ,fontWeight: 'bold' }}>{article.userFullName}</Text>
      </View>

      {/* Post Content */}
      <RenderHTML 
        source={source} 
        contentWidth={width}
      />

      {/* Comment Section */}
      <View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 15
  },
  titleLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10
  },
  userConatiner: {
    flexDirection: 'row',
    marginVertical: 15,
    marginBottom: 30,
    alignItems: 'center',
    gap: 15
  }
});
