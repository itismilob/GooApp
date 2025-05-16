import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '../types/navigationTypes';

// import screens
import Loading from '../screens/Loading';
import NicknameNoti from '../screens/NicknameNoti';
import Home from '../screens/Home';
import Puzzle from '../screens/Puzzle';
import Tutorial from '../screens/Tutorial';
import Scoreboard from '../screens/Scoreboard';
import Record from '../screens/Record';
import Rank from '../screens/Rank';

const DefaultNavigator = createNativeStackNavigator<DefaultNavigatorParams>({
  initialRouteName: 'Loading',
  screens: {
    Loading: Loading,
    NicknameNoti: NicknameNoti,
    Home: Home,
    Puzzle: Puzzle,
    Tutorial: Tutorial,
    Scoreboard: Scoreboard,
    Record: Record,
    Rank: Rank,
  },
});

export default function DefaultNavigation() {
  return DefaultNavigator;
}
