import { Image, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import GlobalStatusBar from './GlobalStatusBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from '../../utils/Images';
import { gGap } from '../../utils/Sizes';
import { ArrowLeft, Moon, SunMedium, User } from 'lucide-react-native';
import { useAppSelector } from '../../redux/hooks';
import RNText from './RNText';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import ProfileInfoModal from '../auth/ProfileInfoModal';
import * as Haptics from 'expo-haptics';

const GlobalHeader = ({ canBack }: { canBack?: boolean }) => {
  const { top } = useSafeAreaInsets();
  const { colors, isDark, toggleColorScheme } = useThemeColors();
  const { isAuthenticate } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [infoModalVisible, setInfoModalVisible] = useState(false);

  return (
    <View style={{ paddingTop: top }} className="border-b border-border bg-background">
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
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                navigation.goBack();
              }}
              className="h-10 w-10 items-start justify-center">
              <ArrowLeft size={30} color={colors.foreground} />
            </Pressable>
          )}
          <Pressable
            onPress={() => {
              navigation.navigate('Landing');
            }}
            className="items-start justify-center">
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
            <Pressable
              onPress={() => {
                setInfoModalVisible(!infoModalVisible);
              }}
              className="shadow-soft h-10 w-10 items-center justify-center rounded-full  border  border-primary">
              <User color={colors.primary} size={22} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                navigation.navigate('SignIn');
              }}
              className="shadow-soft h-10 items-center justify-center rounded-full border  border-primary  px-2">
              <RNText className="text-lg font-semibold text-primary">Sign In</RNText>
            </Pressable>
          )}

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

              toggleColorScheme();
            }}
            className="h-10 items-center justify-center rounded-full border border-primary p-3">
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
