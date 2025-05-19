import { Text, TextProps } from 'react-native';

interface props extends TextProps {
  className?: string;
}

export default function StyledText({ className, ...rest }: props) {
  const font = {
    fontFamily: 'Pretendard-Bold',
    color: 'white',
  };

  return <Text style={font} className={className} {...rest} />;
}
