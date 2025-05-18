import { Text, TextProps } from 'react-native';

interface props extends TextProps {}

export default function StyledText({ style, ...rest }: props) {
  const font = {
    fontFamily: 'Pretendard-Bold',
  };

  return <Text style={[font, style]} {...rest} />;
}
