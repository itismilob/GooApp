import { View, StyleSheet } from 'react-native';

export default function Contents({ children }: { children: JSX.Element }) {
  return <View style={styles.contents}>{children}</View>;
}

const styles = StyleSheet.create({
  contents: {
    flex: 8,
    alignItems: 'center',
    width: '100%',
  },
});
