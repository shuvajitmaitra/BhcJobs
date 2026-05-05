import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { z } from 'zod';
import { UserRoundCheck, UserPlus } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';
import InputField from '../../components/common/InputField';
import { handleApiError, showToast } from '../../utils/commonFunction';
import { signInUser } from '../../services/authService';
import { useAppDispatch } from '../../redux/hooks';
import { setToken } from '../../redux/slices/authSlice';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
  useNavigation,
} from '@react-navigation/native';

const schema = z.object({
  phone: z
    .string()
    .min(10, 'Phone number is required')
    .max(13, 'Phone number can be 13 digits max'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
});

type FormData = z.infer<typeof schema>;

const SignInScreen = () => {
  const { isDark } = useThemeColors();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState(false);

  const gradient = isDark
    ? (['#253349', '#1C2A3A', '#0F1822', '#080E16'] as const)
    : (['#7aa8ea', '#b3cef3', '#edf5fe', '#e8f5fc'] as const);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { phone: '', password: '' },
  });

  const onSubmit = async (data: FormData) => {
    Keyboard.dismiss()
    setIsLoading(true);

    const response = await signInUser(data);
    if (response?.status) {
      dispatch(setToken(response.data.token));
      navigation.navigate('Landing');
    } else {
      handleApiError(response, setError);
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    showToast({ title: 'Coming soon...' });
  };

  const handleCreateAccount = () => {
    navigation.dispatch(StackActions.replace('SignUp'));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background">
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: '50%', width: '100%', position: 'absolute' }}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-1 flex-grow justify-center items-center py-10 px-6">
        <View className="w-full gap-4 rounded-3xl border border-border bg-card p-7">
          <View className="mb-4 flex-row items-center justify-center gap-x-3">
            <View className="bg-primary/10 h-12 w-12 items-center justify-center rounded-full">
              <UserRoundCheck size={26} color="#2563EB" />
            </View>
            <Text className="text-2xl font-bold tracking-tight text-primary">Job Seeker Login</Text>
          </View>

          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputField
                type="phone"
                value={value}
                onChangeText={(text: string) => {
                  const filtered = text.replace(/[^0-9]/g, '').slice(0, 13);
                  onChange(filtered);
                }}
                placeholder="01XXXXXXXXX"
                error={!!errors.phone}
                errorMessage={errors.phone?.message}
                isRequired={true}
                label="Mobile Number"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputField
                type="password"
                value={value}
                onChangeText={onChange}
                placeholder="Enter password"
                errorMessage={errors.password?.message}
                error={!!errors.password}
                isRequired={true}
                label="Password"
              />
            )}
          />

          <TouchableOpacity className="self-end" onPress={handleForgotPassword}>
            <Text className="text-sm font-semibold text-primary">Forgot Your Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`mb-5 items-center justify-center rounded-2xl bg-primary py-4 ${
              !isValid || isLoading ? 'opacity-50' : ''
            }`}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isLoading}
            activeOpacity={0.85}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <View className="flex-row items-center gap-x-2">
                <Text className="text-lg font-bold tracking-widest text-primary-foreground">
                  SIGN IN
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <View className="mb-5 flex-row items-center">
            <View className="h-px flex-1 bg-border" />
            <Text className="mx-4 text-sm font-semibold text-muted-foreground">OR</Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <TouchableOpacity
            className="flex-row items-center justify-center"
            onPress={handleCreateAccount}
            activeOpacity={0.8}>
            <Text className="text-base text-foreground">New to BhcJobs.com?{'  '}</Text>
            <View className="flex-row items-center gap-x-1">
              <Text className="text-base font-bold text-primary">Create an account</Text>
              <UserPlus size={15} color="#2563EB" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
