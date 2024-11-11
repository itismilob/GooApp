import { StyleSheet, Text } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface ThemedTextProps {
  children: string;
  style?: object;
  bold?: boolean | undefined;
}

export default function ThemedText({ children, style, bold }: ThemedTextProps) {
  return (
    <Text style={[style, bold ? styles.fontBold : styles.fontRagualr]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  fontRagualr: {
    fontFamily: 'HostGrotesk',
  },
  fontBold: {
    fontFamily: 'HostGroteskBold',
  },
});
