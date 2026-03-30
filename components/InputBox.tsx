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
    width: '100%',
    marginVertical: 10,
    gap: 5,
  },
  label: {
    fontSize: 14,
  },
  input: {
    height: 40,
    color: "#050505",
    fontSize: 12,
    backgroundColor: "#fbf8f89c",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.3,
  },
});
