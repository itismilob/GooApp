import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { Sizes } from '@/constants/Styles';

interface HeaderProps {
  children?: ReactNode | null;
}

export default function Header({ children }: HeaderProps) {
  return <View style={styles.header}>{children}</View>;
}

const styles = StyleSheet.create({
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
