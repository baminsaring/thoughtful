import { View, Text, StyleSheet } from "react-native";

import { SearchBar } from "@/components/SearchBar";

export default function SearchScreen() {
    return (
        <View style={styles.searchContainer}>
            <Text>Search Something...</Text>
            <SearchBar />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    }
})