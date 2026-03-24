import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import SplashScreenController from "./splash";
//import { supabase } from "@/lib/supabase";

export default function RootLayout() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // useEffect(() => {
  //   const { data } = supabase.auth.onAuthStateChange((event, session) => {
  //     if (event == "SIGNED_OUT") {
  //       router.replace("/(auth)/sign-in")
  //     }
  //   });

  //   return () => {
  //     data.subscription.unsubscribe()
  //   }
  // }, [])

  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { isLoggedIn } = useAuth();

  //if (isLoading) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </GestureHandlerRootView>
  );
}
