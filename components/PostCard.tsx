import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useArticle } from "@/contexts/ArticeContext";
import { ArticleType } from "@/contexts/ArticeContext";
import profileService from "@/lib/profileService";

//import user from "@/assets/images/person_placeholder.png";

type Props = {
  articleId: number;
  title: string;
  content: string;
  authorId: number;
};

type UserType = {
  fullName: string;
  avatarUrl: string;
};

export function PostCard({
  articleId,
  title,
  content,
  authorId,
}: Props) {
  const [userInfo, setUserInfo] = useState<UserType>();
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const router = useRouter();
  const MAX_CHARS = 250;
  const { width } = useWindowDimensions();

  const { user } = useAuth();
  const { setArticle } = useArticle();

  const source = {
    html: content,
  };

  /** Check is authenticated user is the creator of this article
   * If yes return true else false
  **/
  const checkIsArticleEditable = () => {
    const user_id = user?.id
    return user_id == authorId ? true : false;
  }

  /*** 
   *Get the data like full name and avatar url of user who wrote this article 
   ***/
  const getUserData = async () => {
    try {
      const { data, error } = await profileService.getUserData(authorId);

      if (data) {
        const userData: UserType = {
          fullName: data[0]?.full_name,
          avatarUrl: data[0]?.avatar_url,
        };

        setUserInfo(userData);
      }
    } catch (error) {
      console.log("getUserData :: error: ", error);
    }
  };
  
  /***
   * Check whether a user has bookmark this article
   * If yes setIsBookmark(true) else setIsBookmark(false)
  ***/
  const checkIsBookmarked = async () => {
    try {
      const response = await profileService.checkIsAlreadyExist(articleId, user?.id)

      if (response) {
        setIsBookmark(true);
      } else {
        setIsBookmark(false);
      }
    } catch (error) {
      console.log("PostCard :: checkIsBookmarked :: Error: ", error);
      
    }
  }

  /**
   * When user a user press on the Read more button
   * This will first create an object of type article
   * Then it will assign the article type data in the setArticle ArticleProvider that it will available for all the routes
   */
  const handlePress = () => {
    const article: ArticleType = {
      id: articleId,
      title: title,
      content: content,
      isEditable: checkIsArticleEditable(),
      userFullName: userInfo?.fullName!,
      userAvatarUrl: userInfo?.avatarUrl!,
    };

    setArticle(article);
    router.push("/(drawer)/(tabs)/article");
  };

  useEffect(() => {
    getUserData();
    checkIsBookmarked();
  }, [isBookmark]);

  return (
    <View style={styles.container}>
      <View style={styles.userProfileContainer}>
        {/* User Profile Image */}
        <Image
          //    source={user}
          source={userInfo?.avatarUrl}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
        {/* User Name */}
        <Text>{userInfo?.fullName}</Text>
        {/* Post created timeline */}
        {/* <Text>2 hr ago</Text> */}
      </View>

      {/* Header */}
      <Text style={styles.heading}>{title}</Text>

      {/* Sub Header */}
      {/* <Text style={styles.subHeading}>
                {content.length > MAX_CHARS ? content.slice(0, MAX_CHARS) : content}
            </Text> */}
      <RenderHtml contentWidth={width} source={source} />

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Read more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    minWidth: "100%",
    height: 300,
    padding: 15,
    marginBottom: 30,
    gap: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  userProfileContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timelineText: {
    textAlign: "right",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "justify",
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    padding: 10,
    width: "100%",
    backgroundColor: "#5263df",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
