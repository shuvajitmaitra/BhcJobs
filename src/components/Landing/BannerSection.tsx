import React from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Search } from 'lucide-react-native';
import RNText from '../common/RNText';
import { gGap } from '../../utils/Sizes';

const BannerSection = () => {
  return (
    <View className="w-full overflow-hidden">
      <View className="overflow-hidden px-5 pt-10">
        <View className="items-center pt-10">
          <RNText className="mt-6 text-center font-black text-white">
            #1 Platform for Saudi Jobs
          </RNText>

          <RNText className="mt-5 text-center text-white/80">
            Apply for jobs in Saudi Arabia with verified employers. We connect
            Bangladeshi workforce with high-demand Saudi jobs.
          </RNText>

          <View className="mt-9 w-full flex-row items-center">
            <TextInput
              placeholder="Search Job"
              placeholderTextColor="#8B96AD"
              className="flex-1 text-[#2A3448]"
            />

            <Pressable className="items-center justify-center">
              <Search color="#FFFFFF" size={gGap(24)} strokeWidth={2.4} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BannerSection;
