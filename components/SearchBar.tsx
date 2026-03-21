import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  searchText: string;
  setSearchText: ( text: string ) => void;
  onClick: () => void;
}

export function SearchBar({ searchText, setSearchText, onClick }: Props) {

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, width: '80%', borderRadius: 10, borderWidth: 0.5, paddingLeft: 10 }}
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search..."
        placeholderTextColor="gray"
        autoFocus
      />
      <TouchableOpacity style={styles.searchButton} onPress={ onClick }>
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
    marginVertical: 10,
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
    borderWidth: 0.5,
  },
  searchButton: {
    height: 40,
    width: '20%',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
    borderRadius: 10,
  },
  searchButtonText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
