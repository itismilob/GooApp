import { ReactElement } from 'react';
import { TouchableOpacity, View, TouchableOpacityProps } from 'react-native';
import TitleText from './TitleText';
import { defaultGreen } from '@/styles/const';

interface props extends TouchableOpacityProps {
  className?: string;
  children: string;
  color?: 'green';
}

export default function DefaultButton({
  children,
  className,
  color,
  ...rest
}: props) {
  const bg = color === 'green' ? defaultGreen : '';

  return (
    <TouchableOpacity
      className={`bg-[${bg}] rounded-xl justify-center items-center ${className}`}
      {...rest}
    >
      <TitleText size={30}>{children}</TitleText>
    </TouchableOpacity>
  );
}
