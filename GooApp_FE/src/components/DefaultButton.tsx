import { ReactElement, useEffect, useState } from 'react';
import { TouchableOpacity, View, TouchableOpacityProps } from 'react-native';
import TitleText from './TitleText';
import { defaultRound, lightGreen } from '@/styles/const';

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
  if (color === 'green') {
    return (
      <TouchableOpacity
        className={`bg-light-green p-8 w-full justify-center items-center rounded-default ${className}`}
        {...rest}
      >
        <TitleText size={30}>{children}</TitleText>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        className={`p-8 w-full justify-center items-center rounded-default ${className}`}
        {...rest}
      >
        <TitleText size={30}>{children}</TitleText>
      </TouchableOpacity>
    );
  }
}
