import { TextProps } from 'react-native';
import StyledText from './StyledText';

interface props extends TextProps {
  size: 20 | 30 | 60;
}

// 타이틀로 사용하는 컴포넌트
export default function TitleText({ size, ...rest }: props) {
  return <StyledText style={{ fontSize: size }} {...rest} />;
}
