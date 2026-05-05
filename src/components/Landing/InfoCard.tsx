import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { BriefcaseBusiness } from 'lucide-react-native';
import RNText from '../common/RNText';

type InfoCardProps = {
  title: string;
  subtitle: string;
  imageUri?: string | null;
  onPress?: () => void;
  roundedImage?: boolean;
};

const InfoCard = ({
  title,
  subtitle,
  imageUri,
  onPress,
  roundedImage = false,
}: InfoCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center rounded-2xl border border-border bg-card px-5 py-6"
    >
      <View
        style={roundedImage ? { overflow: 'hidden' } : undefined}
        className={`mb-[18px] h-14 w-14 items-center justify-center ${
          roundedImage ? 'rounded-full border border-primary' : ''
        }`}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            resizeMode="contain"
            className="h-full w-full"
          />
        ) : (
          <BriefcaseBusiness color="#4B84F6" size={34} strokeWidth={2.1} />
        )}
      </View>

      <RNText className="text-center text-[20px] font-extrabold leading-[26px] text-foreground">
        {title}
      </RNText>

      <RNText className="mt-2 text-center text-sm font-medium leading-5 text-muted-foreground">
        {subtitle}
      </RNText>
    </Pressable>
  );
};

export default InfoCard;
