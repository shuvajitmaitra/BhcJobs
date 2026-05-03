import React from 'react';
import { Pressable } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

type SeeMoreButtonProps = {
  expanded?: boolean;
  onPress?: () => void;
  hidden?: boolean;
};

const SeeMoreButton = ({
  expanded = false,
  onPress,
  hidden = false,
}: SeeMoreButtonProps) => {
  if (hidden) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      className="mt-6 h-20 w-32 self-center items-center justify-center rounded-[20px] border-2 border-brand-primary bg-app-surface"
    >
      <ChevronDown
        size={28}
        color="#4B84F6"
        strokeWidth={2.4}
        style={{
          transform: [{ rotate: expanded ? '180deg' : '0deg' }],
        }}
      />
    </Pressable>
  );
};

export default SeeMoreButton;
