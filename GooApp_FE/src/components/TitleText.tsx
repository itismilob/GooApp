import { TextProps } from 'react-native';
import StyledText from './StyledText';

interface props extends TextProps {
  size: 20 | 30 | 50 | 60;
  className?: string;
}

// 타이틀로 사용하는 컴포넌트
export default function TitleText({ size, className, ...rest }: props) {
  if (size == 20) {
    return <StyledText className={'text-xl ' + className} {...rest} />;
  }
  if (size == 30) {
    return <StyledText className={'text-3xl ' + className} {...rest} />;
  }
  if (size == 50) {
    return (
      <StyledText className={'leading-[1.4] text-5xl ' + className} {...rest} />
    );
  }
  if (size == 60) {
    return (
      <StyledText className={'leading-[1.4] text-6xl ' + className} {...rest} />
    );
  }
}
