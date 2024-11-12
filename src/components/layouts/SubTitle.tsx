import { Fonts, Sizes } from '@/constants/Styles';
import { View, Text, StyleSheet } from 'react-native';
import ThemedText from '../theme/ThemedText';

interface SubTitleProps {
  children?: JSX.Element | string | null;
}

export default function SubTitle({ children }: SubTitleProps) {
  return (
    <View style={styles.subTitle}>
      {typeof children === 'string' ? (
        <ThemedText style={styles.subTitleText}>{children}</ThemedText>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  subTitleText: {
    fontSize: Fonts.subTitle,
    color: 'white',
  },
});
