import { SplashScreen } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function SplashScreenController() {
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  return null;
}
