import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { BriefcaseBusiness } from 'lucide-react-native';
import RNText from '../common/RNText';
import { TIndustry } from '../../types/industryTypes';
import env from '../../../env';

type IndustryCardProps = {
  item: TIndustry;
  onPress?: () => void;
};

const IndustryCard = ({ item, onPress }: IndustryCardProps) => {
  const { name, jobs_count, image } = item;
  const imageUri = `${env.STORAGE_BASE_URL}/industry-image/${image}`;
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center rounded-2xl border border-border bg-card px-5 py-6"
    >
      <View className="mb-[18px] h-14 w-14 items-center justify-center">
        {image ? (
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
        {name}
      </RNText>

      <RNText className="mt-2 text-center text-sm font-medium leading-5 text-muted-foreground">
        {`${jobs_count} Available Jobs`}
      </RNText>
    </Pressable>
  );
};

export default IndustryCard;
