import { StyleSheet, Text, View, TextInput } from "react-native";

type Props = {
  label: string;
  text: string;
  placeholder: string,
  onChangeText: (text: string) => void;
};

export default function InputBox({ label, text, placeholder, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        placeholderTextColor="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    gap: 5,
  },
  label: {
    fontSize: 14,
  },
  input: {
    height: 40,
    color: "#111111",
    fontSize: 12,
    backgroundColor: "#eae6e69c",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
});
