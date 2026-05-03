import { View } from 'react-native';
import React from 'react';
import RNText from './RNText';

const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <View className="w-3/5 bg-slate-500/20 h-14 border border-border items-center justify-center rounded-full self-center my-5">
      <RNText className="text-2xl font-bold text-foreground">{title}</RNText>
    </View>
  );
};

export default HeaderTitle;
