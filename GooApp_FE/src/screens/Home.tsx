import { Pressable, Text, View } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Home'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <Text>GooApp</Text>
      <Text>멋있는 파랑 청설모</Text>

      <Pressable
        onPress={() => {
          navigation.navigate('Tutorial');
        }}
      >
        <Text>퍼즐</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Record');
        }}
      >
        <Text>기록</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Rank');
        }}
      >
        <Text>랭크</Text>
      </Pressable>
    </View>
  );
}
