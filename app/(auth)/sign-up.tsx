import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

import InputBox from "@/components/InputBox";
import Button from "@/components/Button";
import { Link } from "expo-router";

export default function LoginScreen() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const { signUp } = useAuth();

  const onLogin = () => {
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      Alert.alert("Fields can't be empty!");
    } else {
      signUp(fullName, email, password, avatarUrl);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <Text style={styles.headingText}>Sign Up</Text>
        <Text style={styles.subHeadingText}>
          Please enter the details below to continue
        </Text>

        {/* Full Name */}
        <InputBox
          label="Full Name"
          text={fullName}
          placeholder="Enter your name"
          onChangeText={setFullName}
        />

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

        {/* Avatar */}
        <InputBox
          label="Avatar"
          text={avatarUrl}
          placeholder="Paste the link of your photo"
          onChangeText={setAvatarUrl}
        />

        {/* Submit Button */}
        <Button label="Sign Up" onClick={onLogin} />

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Link href="/sign-in" style={styles.linkText}>
            Sign In
          </Link>
        </Text>
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
});
