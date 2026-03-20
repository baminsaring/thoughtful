import {
  useContext,
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import postService from "@/lib/postService";

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
};

const ArticleContext = createContext<ArticleProps | null>(null);

export default function ArticleProvider({ children }: PropsWithChildren) {
  const [article, setArticle] = useState<ArticleType>();
  const [articleList, setArticleList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false)

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

  useEffect(() => {
    getArticles();

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
        setArticle
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
