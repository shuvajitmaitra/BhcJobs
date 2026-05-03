import { Image, Pressable, View } from 'react-native';
import React from 'react';
import GlobalStatusBar from './GlobalStatusBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from '../../utils/Images';
import { useColorScheme } from 'nativewind';
import { gGap } from '../../utils/Sizes';
import { Moon, SunMedium, User } from 'lucide-react-native';
import { useAppSelector } from '../../redux/hooks';
import RNText from './RNText';
import { useThemeColors } from '../../hooks/useThemeColors';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

const GlobalHeader = () => {
  const { top } = useSafeAreaInsets();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { colors } = useThemeColors();
  const isDark = colorScheme === 'dark';
  const { isAuthenticate } = useAppSelector(state => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View
      style={{ paddingTop: top }}
      className="border-b border-border bg-background"
    >
      <GlobalStatusBar />
      <View className="flex-row items-center justify-between px-5 pb-2">
        <Pressable
          onPress={() => {
            navigation.navigate('Landing');
          }}
          className="items-start justify-center"
        >
          <Image
            source={{
              uri: isDark ? Images.LOGO_NIGHT_MODE : Images.LOGO_DAY_MODE,
            }}
            resizeMode="contain"
            style={{
              height: gGap(48),
              width: gGap(160),
            }}
          />
        </Pressable>

        <View className="flex-row items-center gap-3">
          {isAuthenticate ? (
            <Pressable className="h-10 w-10 items-center justify-center border border-primary  rounded-full  shadow-soft">
              <User color={colors.primary} size={22} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                navigation.navigate('SignIn');
              }}
              className="h-10 px-2 items-center justify-center border border-primary  rounded-full  shadow-soft"
            >
              <RNText className="text-lg font-semibold text-primary">
                Sign In
              </RNText>
            </Pressable>
          )}

          <Pressable
            onPress={toggleColorScheme}
            className="h-10 items-center justify-center rounded-full border border-primary p-3"
          >
            {isDark ? (
              <SunMedium size={25} color={colors.primary} />
            ) : (
              <Moon size={25} color={colors.primary} />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GlobalHeader;
