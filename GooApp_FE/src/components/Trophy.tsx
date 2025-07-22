import { View } from 'react-native';
import TitleText from './TitleText';

import Badge1 from '@/assets/images/badge1.svg';
import Badge2 from '@/assets/images/badge2.svg';
import Badge3 from '@/assets/images/badge3.svg';

interface props {
  rank: number;
}

const getSvg = (rank: number) => {
  if (rank === 1) {
    return <Badge1 height={40} width={40} />;
  }
  if (rank === 2) {
    return <Badge2 height={40} width={40} />;
  }
  if (rank === 3) {
    return <Badge3 height={40} width={40} />;
  }
};

export default function Trophy({ rank }: props) {
  return (
    <View className="items-center justify-center top-1">{getSvg(rank)}</View>
  );
}
