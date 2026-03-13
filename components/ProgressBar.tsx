import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';

export default function CircularProgressBar() {
  return (
    <View>
      <Progress.Circle size={80} thickness={10} indeterminate={true}/>
    </View>
  );
}
