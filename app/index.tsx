import { Colors } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function () {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/pages/Main');
    }, 1000);
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
      <Text
        style={{
          fontSize: 80,
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        GooApp
      </Text>
    </View>
  );
}
