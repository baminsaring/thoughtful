import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import CircularProgress from "@/components/ProgressBar";

import InputBox from "@/components/InputBox";
import Button from "@/components/Button";
import { Link } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loadProgressbar, setLoadProgressbar] = useState<boolean>(false);

  const { signIn } = useAuth();

  const onLogin = () => {
    setLoadProgressbar(true);
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Fields can't be empty!");
    } else {
      signIn(email, password);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <Text style={styles.headingText}>Sign In</Text>
        <Text style={styles.subHeadingText}>
          Please enter the details below to continue
        </Text>

        {/* Email */}
        <InputBox
          label="Email"
          text={email}
          placeholder="Enter your email"
          onChangeText={setEmail}
        />

        {/* Password */}
        <InputBox
          label="Password"
          text={password}
          placeholder="Enter your password"
          onChangeText={setPassword}
        />

        {/* Submit Button */}
        <Button label="Login" onClick={onLogin} />

        <Link href="/sign-up" asChild>
          <Pressable>
            <Text style={styles.footer}>
              New here? <Text style={styles.linkText}>Create account</Text>
            </Text>
          </Pressable>
        </Link>
      </View>


      <View style={styles.progressBarOverlay}>
        { loadProgressbar ?? <CircularProgress /> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  loginCard: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    padding: 30,
  },
  headingText: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    padding: 10,
  },
  subHeadingText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "semibold",
  },
  footer: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
  },
  linkText: {
    color: "green",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  progressBarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
