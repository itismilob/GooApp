import { ReactElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import TitleText from './TitleText';

interface props extends TouchableOpacityProps {
  className?: string;
  children: ReactElement;
  text: string;
}

export default function IconButton({
  children,
  className,
  text,
  ...rest
}: props) {
  return (
    <TouchableOpacity
      className={`bg-light-green flex-row gap-6 p-8 w-full justify-center items-center rounded-default ${className}`}
      {...rest}
    >
      {children}
      <TitleText size={30}>{text}</TitleText>
    </TouchableOpacity>
  );
}
