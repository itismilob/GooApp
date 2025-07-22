import { useEffect, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

export default function useCheckNetInfo(
  connected?: () => void,
  disconnected?: () => void,
): () => void {
  const netInfo = useNetInfo();

  // 네트워크 확인을 시작시키는 트리거
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    if (trigger) {
      if (netInfo.isConnected === true && connected) {
        connected();
      } else if (netInfo.isConnected === false && disconnected) {
        disconnected();
      }
    }
  }, [netInfo, trigger]);

  const triggerOn = () => {
    setTrigger(true);
  };

  return triggerOn;
}
