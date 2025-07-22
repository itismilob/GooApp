import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';

// import screens
import Loading from '@/screens/Loading';
import NicknameNoti from '@/screens/NicknameNoti';
import Home from '@/screens/Home';
import Puzzle from '@/screens/Puzzle';
import Tutorial from '@/screens/Tutorial';
import Scoreboard from '@/screens/Scoreboard';
import Record from '@/screens/Record';
import Rank from '@/screens/Rank';

import NetworkOfflineModal from '@/screens/NetworkOfflineModal';

export const DefaultNavigator =
  createNativeStackNavigator<DefaultNavigatorParams>({
    initialRouteName: 'Loading',
    screenOptions: {
      headerShown: false,
    },
    screens: {
      Loading: Loading,
      NicknameNoti: NicknameNoti,
      Home: Home,
      Puzzle: Puzzle,
      Tutorial: Tutorial,
      Scoreboard: Scoreboard,
      Record: Record,
      Rank: Rank,
      NetworkOfflineModal: {
        screen: NetworkOfflineModal,
        options: {
          presentation: 'transparentModal',
        },
      },
    },
  });
