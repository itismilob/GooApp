import { Colors } from '@/constants/Styles';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

export default function PagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: styles.background,
      }}
    ></Stack>
  );
}

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
});
