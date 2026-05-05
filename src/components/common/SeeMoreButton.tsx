import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useThemeColors } from '../../hooks/useThemeColors';

type SeeMoreButtonProps = {
  expanded?: boolean;
  onPress?: () => void;
  hidden?: boolean;
};

const SeeMoreButton = ({ expanded = false, onPress, hidden = false }: SeeMoreButtonProps) => {
  const { colors } = useThemeColors();
  if (hidden) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        onPress?.();
      }}
      className="mt-6 h-10 w-20 items-center justify-center self-center rounded-xl border border-primary bg-accent">
      {expanded ? (
        <ChevronUp size={25} color={colors.primary} strokeWidth={2.4} />
      ) : (
        <ChevronDown size={25} color={colors.primary} strokeWidth={2.4} />
      )}
    </TouchableOpacity>
  );
};

export default SeeMoreButton;
