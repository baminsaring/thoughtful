import React, {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
} from "react";
import authService from "@/lib/authService";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

// Define the Shape of your Context data
type AuthProps = {
  signIn: (email: string, password: string) => void;
  signUp: (fullName: string, email: string, password: string, avatarUrl: string) => void;
  logout: () => void;
  user: any;
  isLoggedIn: boolean;
  isLoading: boolean;
};

// Create the Context with a default value (or undefined)
const AuthContext = createContext<AuthProps | null>(null);

// Create a Provider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  const checkUser = async () => {
    try {
      setIsLoading(true);
      const currentUser = await authService.getUser();
      //console.log("Current User: ", currentUser);

      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser)
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.log("CheckUser: Error: ", error);
      setIsLoggedIn(false)
      setUser(null)
    } finally {
      false
    }
  };

  const signUp = async (fullName: string, email: string, password: string, avatarUrl: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await authService.signUpWithEmail(
        fullName,
        email,
        password,
        avatarUrl
      );
      setIsLoading(false);

      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      console.log("Sign up failed!", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await authService.signInWithEmail(
        email,
        password,
      );

      if (error) {
        Alert.alert("Login failed. Check your credentials!");
        setIsLoading(false)
        return;
      }

      if (data) {
        await checkUser();
      }

    } catch (error: any) {
      console.log("Sign in failed! ", error.message);
      setIsLoading(false)
    }
  };

  const logout = async () => {
    try {
      const { success } = await authService.logout();
      setIsLoggedIn(false);
      setUser(null);
    } catch (error: any) {
      console.log("Logout error: ", error.message);
    }
  };

  useEffect(() => {

    checkUser(); 
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        signIn,
        signUp,
        logout,
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easy consumption
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
