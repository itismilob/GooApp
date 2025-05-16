import { Pressable, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

export default function Puzzle() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Puzzle'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
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
