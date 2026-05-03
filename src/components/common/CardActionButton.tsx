import React from 'react';
import { Pressable } from 'react-native';
import RNText from './RNText';

type CardActionButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'outline' | 'solid';
  className?: string;
};

const CardActionButton = ({
  label,
  onPress,
  variant = 'outline',
  className = '',
}: CardActionButtonProps) => {
  const buttonClassName =
    variant === 'solid'
      ? 'flex-1 items-center justify-center rounded-xl bg-primary py-3'
      : 'flex-1 items-center justify-center rounded-xl border border-primary bg-transparent py-3';

  const textClassName =
    variant === 'solid'
      ? 'text-lg font-bold text-white'
      : 'text-lg font-bold text-primary';

  return (
    <Pressable onPress={onPress} className={`${buttonClassName} ${className}`}>
      <RNText className={textClassName}>{label}</RNText>
    </Pressable>
  );
};

export default CardActionButton;
