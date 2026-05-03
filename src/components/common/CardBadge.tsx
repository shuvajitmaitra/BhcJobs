import React from 'react';
import { View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { withOpacity } from '../../utils/commonFunction';
import { useThemeColors } from '../../hooks/useThemeColors';
import RNText from './RNText';

type CardBadgeProps = {
  text: string;
  icon: LucideIcon;
  className?: string;
  textClassName?: string;
  iconColor?: string;
  iconSize?: number;
};

const CardBadge = ({
  text,
  icon: Icon,
  className = '',
  textClassName = '',
  iconColor = '#4B84F6',
  iconSize = 20,
}: CardBadgeProps) => {
  const { colors } = useThemeColors();

  return (
    <View
      style={{ backgroundColor: withOpacity(colors.primary, 0.1) }}
      className={`flex-row items-center gap-2 rounded-xl border border-primary bg-muted px-4 py-2 ${className}`}
    >
      <Icon color={iconColor} size={iconSize} strokeWidth={2.1} />
      <RNText
        className={`text-base font-medium uppercase tracking-[0.4px] text-foreground ${textClassName}`}
      >
        {text}
      </RNText>
    </View>
  );
};

export default CardBadge;
