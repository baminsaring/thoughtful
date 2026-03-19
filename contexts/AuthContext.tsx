import React, {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
} from "react";
import authService from "@/lib/authService";
import { Alert } from "react-native";

// Define the Shape of your Context data
type AuthProps = {
  updateUser: (
    fullName: string,
    avatarUrl: string | any,
    avatarFilePath: string
  ) => Promise<{ success: boolean }>;
  signIn: (email: string, password: string) => void;
  signUp: (fullName: string, email: string, password: string) => void;
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

  // Get user data if user is authenticated
  const checkUser = async () => {
    try {
      setIsLoading(true);
      const currentUser = await authService.getUser();
      //console.log("Current User Data: ", currentUser);

      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.log("CheckUser: Error: ", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      false;
    }
  };

  const signUp = async (fullName: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await authService.signUpWithEmail(
        fullName,
        email,
        password,
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
        setIsLoading(false);
        return;
      }

      if (data) {
        await checkUser();
      }
    } catch (error: any) {
      console.log("Sign in failed! ", error.message);
      setIsLoading(false);
    }
  };
 
  // Update user data
  const updateUser = async (
    fullName: string,
    avatarUrl: string | any,
    avatarFilePath: string,
  ): Promise<{ success: boolean }> => {
    try {
      const { data, success, error } = await authService.updateUser(
        fullName,
        avatarUrl,
        avatarFilePath,
      );

      if (error) {
        Alert.alert("User data update failed!");
        return {
          success: false,
        };
      }

      if (success) {
        await checkUser();
      }

      return { success: true };
    } catch (error: any) {
      console.log("Update user error: ", error.message);
      return {
        success: false,
      };
    }
  };

  // Logout user
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
        updateUser,
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
