import { Pressable, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

export default function Scoreboard() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Scoreboard'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <Text>Scoreboard</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Puzzle');
        }}
      >
        <Text>다시하기</Text>
      </Pressable>
    </View>
  );
}
