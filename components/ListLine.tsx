import { Colors } from '@/constants/Styles';
import { View } from 'react-native';

export default function ListLine() {
  return (
    <View
      style={{
        width: '100%',
        height: 3,
        borderRadius: 10000,
        backgroundColor: Colors.background,
      }}
    />
  );
}
