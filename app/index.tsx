import ThemedText from '@/components/theme/ThemedText';
import { Colors } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function () {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/pages/Main');
    }, 0);
  });
  return (
    <View
      style={{
        backgroundColor: Colors.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ThemedText
        bold
        style={{
          fontSize: 80,
          color: 'white',
        }}
      >
        GooApp
      </ThemedText>
    </View>
  );
}
