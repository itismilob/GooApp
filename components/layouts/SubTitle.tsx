import { Fonts } from '@/constants/Styles';
import { View, Text, StyleSheet } from 'react-native';

interface SubTitleProps {
  children?: JSX.Element | string | null;
}

export default function SubTitle({ children }: SubTitleProps) {
  return (
    <View style={styles.subTitle}>
      <Text style={styles.subTitleText}>{children}</Text>
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
