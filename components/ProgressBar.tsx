import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';

type Props = {
  color: string;
  size:  number;
}

export default function CircularProgressBar({ color, size }: Props) {
  return (
    <View>
      <Progress.Circle color={color} size={size} thickness={10} indeterminate={true} />
    </View>
  );
}
