import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

export function SearchBar() {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search..."
        autoFocus
      />
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    width: "100%",
    marginVertical: 20,
    justifyContent: 'center',
    gap: 5,
  },
  input: {
    height: 40,
    width: "80%",
    color: "black",
    fontSize: 14,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchButton: {
    flex: 1,
    height: 40,
    width: '20%',
    justifyContent: 'center',
    backgroundColor: '#5263df',
    borderRadius: 10,
  },
  searchButtonText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
