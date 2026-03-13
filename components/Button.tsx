import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    label: string,
    onClick: () => void
}

export default function Button({ label, onClick }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onClick}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold"
    }
})