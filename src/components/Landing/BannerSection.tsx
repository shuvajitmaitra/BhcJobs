import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import RNText from '../common/RNText';
import { gGap } from '../../utils/Sizes';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors } from '@/hooks/useThemeColors';
// import BannerWave from './BannerWave';

const BannerSection = () => {
  const { isDark } = useThemeColors();
  const heroGradient = isDark
    ? (['#111827', '#1D2735'] as const)
    : (['#4476f1', '#7cb7ff'] as const);

  return (
    <>
      <View style={{ overflow: 'hidden' }}>
        <LinearGradient colors={heroGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View className="w-full">
            <View style={{ overflow: 'hidden' }} className="px-5 py-12">
              <View className="items-center">
                <RNText className="text-center text-3xl font-black text-white">
                  #1 Platform for Saudi Jobs
                </RNText>

                <RNText className="mx-4 mt-3 text-center font-semibold text-white/80">
                  Apply for jobs in Saudi Arabia with verified employers. We connect Bangladeshi
                  workforce with high-demand Saudi jobs.
                </RNText>

                <View className="mt-6 w-10/12 flex-row items-center rounded-full bg-white px-3">
                  <TextInput
                    placeholder="Search Job"
                    placeholderTextColor="#8B96AD"
                    className="h-14 flex-1 pl-2 text-[#2A3448]"
                  />

                  <Pressable className="items-center justify-center rounded-full bg-primary p-2">
                    <Search color="#FFFFFF" size={gGap(16)} strokeWidth={2.4} />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

export default BannerSection;
