import Netinfo from '@react-native-community/netinfo';

// netInfoState 반환
export async function getNetInfo() {
  return await Netinfo.fetch();
}
