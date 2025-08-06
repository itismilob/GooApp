import { Text, TextProps } from 'react-native';

interface props extends TextProps {
  className?: string;
}

export default function StyledText({ className, ...rest }: props) {
  const font = {
    fontFamily: 'Pretendard-Bold',
  };

  // 글자 색이 설정되지 않으면 기본값 흰색
  if (!className?.includes('color')) {
    className += ' color-white';
  }

  return <Text style={font} className={className} {...rest} />;
}
