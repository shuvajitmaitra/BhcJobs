import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import GlobalStatusBar from './GlobalStatusBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from '../../utils/Images';
import { useColorScheme } from 'nativewind';
import { gGap } from '../../utils/Sizes';
import { ArrowLeft, Moon, SunMedium, User } from 'lucide-react-native';
import { useAppSelector } from '../../redux/hooks';
import RNText from './RNText';
import { useThemeColors } from '../../hooks/useThemeColors';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import ProfileInfoModal from '../auth/ProfileInfoModal';

const GlobalHeader = ({ canBack }: { canBack?: boolean }) => {
  const { top } = useSafeAreaInsets();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { colors } = useThemeColors();
  const isDark = colorScheme === 'dark';
  const { isAuthenticate } = useAppSelector(state => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [infoModalVisible, setInfoModalVisible] = useState(false);

  return (
    <View
      style={{ paddingTop: top }}
      className="border-b border-border bg-background"
    >
      <GlobalStatusBar />
      {infoModalVisible && (
        <ProfileInfoModal
          isVisible={infoModalVisible}
          onClose={() => {
            setInfoModalVisible(!infoModalVisible);
          }}
        />
      )}
      <View className="flex-row items-center justify-between px-5 pb-2">
        <View className="flex-row items-center">
          {canBack && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              className="h-10 w-10 justify-center items-start"
            >
              <ArrowLeft size={30} color={colors.foreground} />
            </TouchableOpacity>
          )}
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
        </View>

        <View className="flex-row items-center gap-3">
          {isAuthenticate ? (
            <TouchableOpacity
              onPress={() => {
                setInfoModalVisible(!infoModalVisible);
              }}
              className="h-10 w-10 items-center justify-center border border-primary  rounded-full  shadow-soft"
            >
              <User color={colors.primary} size={22} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignIn');
              }}
              className="h-10 px-2 items-center justify-center border border-primary  rounded-full  shadow-soft"
            >
              <RNText className="text-lg font-semibold text-primary">
                Sign In
              </RNText>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={toggleColorScheme}
            className="h-10 items-center justify-center rounded-full border border-primary p-3"
          >
            {isDark ? (
              <SunMedium size={25} color={colors.primary} />
            ) : (
              <Moon size={25} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GlobalHeader;
