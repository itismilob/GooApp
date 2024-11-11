import { StyleSheet, Text } from 'react-native';

interface ThemedTextProps {
  children: string;
  style?: object;
}

export default function ThemedText({ children, style }: ThemedTextProps) {
  return <Text style={{ ...styles.themedText, ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
  themedText: {
    fontFamily: 'HostGrotesk',
  },
});
