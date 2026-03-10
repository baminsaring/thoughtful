import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";

//import user from "@/assets/images/person_placeholder.png";

type Props = {
    title: string,
    content: string,
    userImgUri: string
}

export function PostCard({ title, content, userImgUri }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.userProfileContainer}>
                {/* User Profile Image */}
                <Image 
                //    source={user}
                    source={{ uri: "https://imgs.search.brave.com/0M93Cj9KEPOwuG8uaecx67yJ4qtySoL7cBE9VOBTXSQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LnNo/dXR0ZXJzdG9jay5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvNS8y/MDI0LzA2L3Byb2Zp/bGVfcGhvdG9fc2Ft/cGxlXzIzLmpwZz9z/c2w9MQ" }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                {/* User Name */}
                <Text>John Doe</Text>
                {/* Post created timeline */}
                <Text>2 hr ago</Text>
            </View>

            {/* Header */}
            <Text style={styles.heading}>{title}</Text>

            {/* Sub Header */}
            <Text style={styles.subHeading}>{content}</Text>
            
            {/* Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Read more</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        minWidth:"100%",
        margin: 10,
        padding: 20,
        gap: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    userProfileContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        //borderWidth: 1
    },
    timelineText: {
        textAlign: 'right',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    subHeading: {
        fontSize: 14,
        fontStyle: 'italic'
    },
    button: {
        flex: 1,
        padding: 10,
        width: '95%',
        backgroundColor: '#5263df',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})