import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  iconName: string;
  label: string;
  onClick: () => void
};

export default function PicturePickerButton({ iconName, label, onClick }: Props) {
  return (
    <View style={styles.buttonContent}>
      <TouchableOpacity style={{ flexDirection:'row', gap: 20, alignItems: 'center' }} onPress={onClick}>
        <Ionicons name={ iconName === "camera" ? 'camera-outline': 'image-outline'} size={26} />
        <Text style={styles.buttonLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    flex: 0,
    flexDirection: "row",
    padding: 10,
    alignItems: 'center'
  },
  buttonLabel: {
    fontSize: 16
  }
});
