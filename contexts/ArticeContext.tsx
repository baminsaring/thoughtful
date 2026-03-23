import {
  useContext,
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import postService from "@/lib/postService";
import profileService from "@/lib/profileService";

export type ArticleType = {
    id: number;
    title: string;
    content: string;
    isEditable: boolean;
    userFullName: string;
    userAvatarUrl: string;
}

type ArticleProps = {
  isLoading: boolean;
  refresh: boolean;
  setRefresh: ( status: boolean) => void;
  article: any;
  articleList: any[];
  setArticle: ({ id, title, content, userFullName, userAvatarUrl }: ArticleType) => void;
  bookmarksId: number[];
  setBookmarksId: (bookmarksId: number[]) => void;
};

const ArticleContext = createContext<ArticleProps | null>(null);

export default function ArticleProvider({ children }: PropsWithChildren) {
  const [article, setArticle] = useState<ArticleType>();
  const [articleList, setArticleList] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookmarksId, setBookmarksId] = useState<number[]>([]);

  const { user } = useAuth();

  const getArticles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await postService.getArticles();

      if (error) throw new error();

      setArticleList(data || []);
    } catch (error) {
        setArticleList([]);
        console.log("Failed to fetch articles: ", error);
    } finally {
        setIsLoading(false)
    }
  };


  const getBookmarks = async () => {
    try {
      const response = await profileService.getBookmarks(user.id);
      setBookmarksId(response?.bookmarks || []);
    } catch (error) {
      console.log("getBookmarks :: error : ", error);
    }
  };

  useEffect(() => {
    getArticles();
    getBookmarks();
    if (refresh) setRefresh(false);
  }, [refresh]);

  return (
    <ArticleContext.Provider
      value={{
        isLoading,
        refresh,
        setRefresh,
        article,
        articleList,
        setArticle,
        bookmarksId,
        setBookmarksId
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}

export const useArticle = () => {
  const context = useContext(ArticleContext);

  if (!context) {
    throw new Error("useArticle must be used within a ArticleProvider");
  }

  return context;
};
