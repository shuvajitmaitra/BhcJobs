import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { OtpInput } from 'react-native-otp-entry';
import { useThemeColors } from '../../hooks/useThemeColors';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { handleApiError, showToast } from '../../utils/commonFunction';
import { verifyPhone } from '../../services/authService';

const OTP_LENGTH = 4;
const EXPIRE_SECONDS = 4 * 60 + 10;

const VerifyUserScreen = () => {
  const [otp, setOtp] = useState<string>('');
  const [secondsLeft, setSecondsLeft] = useState(EXPIRE_SECONDS);
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const { colors } = useThemeColors();
  const route =
    useRoute<RouteProp<{ VerifyUser: { phone: string } }, 'VerifyUser'>>();
  const navigation = useNavigation();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setResendDisabled(false);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(
    2,
    '0',
  )}:${String(secondsLeft % 60).padStart(2, '0')}`;

  const handleSubmit = async () => {
    const code = otp;
    if (code.length < OTP_LENGTH) {
      showToast({
        title: 'Incomplete',
        description: 'Please enter all 4 digits.',
      });
      return;
    }
    if (!route?.params?.phone) {
      showToast({
        title: 'Incomplete',
        description: 'Phone number missing, Try again!.',
      });
      return;
    }
    setIsLoading(true);
    const response = await verifyPhone({ phone: route?.params?.phone, otp });
    console.log('response', JSON.stringify(response, null, 2))
    if (response?.status) {
      navigation.dispatch(StackActions.replace('SignIn'));
    } else {
      handleApiError(response);
    }
    setIsLoading(false);
  };

  const handleResend = () => {
    if (resendDisabled) return;
    setOtp('');
    setSecondsLeft(EXPIRE_SECONDS);
    setResendDisabled(true);
    inputRef.current?.focus();
    Alert.alert('Sent', 'A new OTP has been sent.');
  };

  const isComplete = otp.length === OTP_LENGTH;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center items-center px-6 py-10 bg-background"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="bg-card w-full rounded-3xl px-7 pt-8 pb-8"
          style={{
            maxWidth: 420,
            shadowColor: '#2563EB',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: 20,
            elevation: 8,
          }}
        >
          <Text className="text-2xl font-bold text-foreground text-center mb-6">
            OTP Verification
          </Text>

          <View className="items-center mb-6">
            <View className="bg-primary/10 rounded-full p-4">
              <ShieldCheck size={40} color="#2563EB" strokeWidth={1.8} />
            </View>
          </View>

          <Text className="text-base text-foreground text-center leading-6 mb-1">
            We've sent a 4-digit OTP to{' '}
            <Text className="text-destructive font-semibold">
              {route?.params?.phone}
            </Text>
          </Text>
          <Text className="text-base text-foreground text-center leading-6 mb-5">
            Kindly enter it below to continue.
          </Text>

          <Text className="text-center text-primary font-semibold text-base mb-6">
            OTP will expire in{' '}
            <Text className="font-bold text-primary">{formattedTime}</Text>
          </Text>

          <OtpInput
            numberOfDigits={OTP_LENGTH}
            focusColor="#2563EB"
            autoFocus={true}
            placeholder="----"
            blurOnFilled={true}
            disabled={false}
            type="numeric"
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            onTextChange={text => setOtp(text.trim())}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            textProps={{
              accessibilityRole: 'text',
              accessibilityLabel: 'OTP digit',
              allowFontScaling: false,
            }}
            theme={{
              containerStyle: {
                width: 'auto',
              },
              pinCodeContainerStyle: {
                flex: 1,
                height: 60,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
              },
              placeholderTextStyle: {
                color: colors.foreground,
              },
            }}
          />

          <View className="flex-row justify-center items-center mb-7 mt-4">
            <Text className="text-foreground font-semibold text-base">
              Didn't get the code?{'  '}
            </Text>
            <TouchableOpacity onPress={handleResend} disabled={resendDisabled}>
              <Text
                className={`text-base font-semibold ${
                  resendDisabled ? 'text-muted-foreground' : 'text-primary'
                }`}
              >
                Send again
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className={`bg-primary rounded-2xl py-4 items-center justify-center ${
              !isComplete || isLoading ? 'opacity-50' : ''
            }`}
            onPress={handleSubmit}
            disabled={!isComplete || isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text className="text-primary-foreground text-lg font-bold tracking-wide">
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyUserScreen;
