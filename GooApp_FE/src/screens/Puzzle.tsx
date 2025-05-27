import { Pressable, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

import HeaderButton from '@/components/HeaderButton';

export default function Puzzle() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Puzzle'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <HeaderButton>퍼즐</HeaderButton>
      <Text>Puzzle</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Scoreboard');
        }}
      >
        <Text>점수판 이동</Text>
      </Pressable>
    </View>
  );
}
