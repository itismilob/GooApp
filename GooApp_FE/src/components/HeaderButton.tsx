import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StyledText from './StyledText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import TitleText from './TitleText';

interface props {
  // 화면 타이틀
  children: string;
}

export default function HeaderButton({ children }: props) {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Home'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="w-full px-6 py-4 bg-default-green flex-row items-center justify-between">
      <TouchableOpacity
        className="w-10"
        onPress={() => {
          navigation.popToTop();
        }}
      >
        <Icon name="angle-left" size={30} color="white" />
      </TouchableOpacity>
      <TitleText size={30}>{children}</TitleText>
    </View>
  );
}
