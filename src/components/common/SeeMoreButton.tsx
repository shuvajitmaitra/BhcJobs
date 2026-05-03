import React from 'react';
import { Pressable } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

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
      className="mt-6 h-10 w-20 self-center items-center justify-center rounded-xl border-2 border-brand-primary bg-app-surface"
    >
      {expanded ? (
        <ChevronUp size={25} color="#4B84F6" strokeWidth={2.4} />
      ) : (
        <ChevronDown size={25} color="#4B84F6" strokeWidth={2.4} />
      )}
    </Pressable>
  );
};

export default SeeMoreButton;
