import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import RNText from '../common/RNText';
import { gGap } from '../../utils/Sizes';
// import BannerWave from './BannerWave';

const BannerSection = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const heroGradient = isDark
    ? ['rgb(22 33 54)', 'rgb(34 43 60)']
    : ['rgb(68 118 241)', 'rgb(124 183 255)'];
  // const waveBackground = isDark
  //   ? 'rgba(14, 22, 38, 1)'
  //   : 'rgba(248, 250, 255, 1)';

  return (
    <>
      <LinearGradient
        colors={heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="overflow-hidden"
      >
        <View className="w-full">
          <View className="overflow-hidden px-5 py-12">
            <View className="items-center">
              <RNText className="text-center font-black text-3xl text-white">
                #1 Platform for Saudi Jobs
              </RNText>

              <RNText className="mt-3 text-center text-white/80 mx-4 font-semibold">
                Apply for jobs in Saudi Arabia with verified employers. We
                connect Bangladeshi workforce with high-demand Saudi jobs.
              </RNText>

              <View className="mt-6 w-10/12 flex-row items-center bg-white px-3 rounded-full">
                <TextInput
                  placeholder="Search Job"
                  placeholderTextColor="#8B96AD"
                  className="flex-1 text-[#2A3448] h-14 pl-2"
                />

                <Pressable className="items-center justify-center bg-brand-primary rounded-full p-2">
                  <Search color="#FFFFFF" size={gGap(16)} strokeWidth={2.4} />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
      {/* <BannerWave backgroundColor={waveBackground} /> */}
    </>
  );
};

export default BannerSection;
