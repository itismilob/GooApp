import { ReactElement, useState } from 'react';
import DefaultButton from './DefaultButton';
import { TouchableOpacityProps } from 'react-native';

interface props extends TouchableOpacityProps {
  children: ReactElement;
  className: string;
  isOn: boolean;
}

export default function ToggleButton({
  children,
  className,
  isOn,
  ...rest
}: props) {
  if (isOn)
    return (
      <DefaultButton className={'bg-green-950 ' + className} {...rest}>
        {children}
      </DefaultButton>
    );
  else
    return (
      <DefaultButton className={'bg-green-700 ' + className} {...rest}>
        {children}
      </DefaultButton>
    );
}
