import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '@/constants/Styles';
import ThemedText from '../theme/ThemedText';

interface TitleProps {
  children?: string | JSX.Element;
}

export default function Title({ children }: TitleProps) {
  return (
    <View style={styles.title}>
      {typeof children === 'string' ? (
        <ThemedText bold style={styles.titleText}>
          {children}
        </ThemedText>
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
    color: 'white',
  },
});
