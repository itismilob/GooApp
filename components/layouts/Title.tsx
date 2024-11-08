import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '@/constants/Styles';

interface TitleProps {
  children?: string | JSX.Element;
}

export default function Title({ children }: TitleProps) {
  return (
    <View style={styles.title}>
      {typeof children === 'string' ? (
        <Text style={styles.titleText}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: Fonts.title,
    fontWeight: 'bold',
    color: 'white',
  },
});
