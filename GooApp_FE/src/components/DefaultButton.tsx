import { ReactElement } from 'react';
import { TouchableOpacity, View, TouchableOpacityProps } from 'react-native';

interface props extends TouchableOpacityProps {
  children: ReactElement;
  className?: string;
}

export default function DefaultButton({ children, className, ...rest }: props) {
  return (
    <TouchableOpacity
      className={'rounded-xl justify-center items-center ' + className}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}
