import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { createUser } from '../../services/authService';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { TRegisterPayload } from '../../types/authTypes';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors } from '../../hooks/useThemeColors';
import InputField from '../../components/common/InputField';
import DatePickerButton from '../../components/auth/DatePickerButton';
import GenderSelectField from '../../components/auth/GenderSelectField';
import { handleApiError } from '../../utils/commonFunction';

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { isDark } = useThemeColors();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      nid: '',
      dob: new Date(),
      passport_number: '',
      gender: '',
    },
  });

  const onSubmit = async (data: TRegisterPayload) => {
    setIsLoading(true);
    const response = await createUser(data);
    if (response?.status) {
      navigation.navigate('VerifyUser', { phone: data.phone });
    } else {
      handleApiError(response, setError);
    }
    setIsLoading(false);
  };
  const gradient = isDark
    ? (['#253349', '#1C2A3A', '#0F1822', '#080E16'] as const)
    : (['#7aa8ea', '#b3cef3', '#edf5fe', '#e8f5fc'] as const);
  const handleSignIn = () => {
    navigation.dispatch(StackActions.replace('SignIn'));
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
      <View className="flex-1 ">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="flex-grow justify-start items-center py-10 px-6">
          <View className="w-full gap-4 rounded-3xl border border-border bg-card p-7">
            <View className="flex-row items-center justify-center gap-x-3">
              <Text className="text-2xl font-bold tracking-tight text-primary">
                Create an account
              </Text>
            </View>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputField
                  type="name"
                  value={value}
                  onChangeText={(text: string) => {
                    onChange(text.trim());
                  }}
                  placeholder="Full Name"
                  errorMessage={errors.name?.message}
                  isRequired={true}
                  error={!!errors.name}
                  label="Full Name"
                />
              )}
            />
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
                  errorMessage={errors.phone?.message}
                  isRequired={true}
                  error={!!errors.phone}
                  label="Phone Number"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputField
                  type="email"
                  value={value}
                  onChangeText={(text: string) => {
                    onChange(text.trim());
                  }}
                  placeholder="enter email"
                  errorMessage={errors.email?.message}
                  isRequired={true}
                  error={!!errors.email}
                  label="Email"
                />
              )}
            />
            <View className="">
              <Text className="mb-2 text-sm font-medium text-foreground">
                Date of Birth <Text className="text-destructive">*</Text>
              </Text>

              <Controller
                name="dob"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePickerButton
                    value={value}
                    onDateChange={(date: Date) => {
                      onChange(date);
                    }}
                    error={!!errors.dob}
                  />
                )}
              />

              {errors.dob && (
                <Text className="ml-0.5 mt-1 text-xs text-destructive">{errors.dob.message}</Text>
              )}
            </View>
            <Controller
              name="passport_number"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputField
                  type="passport"
                  value={value}
                  onChangeText={(text: string) => {
                    onChange(text.trim());
                  }}
                  placeholder="Passport No"
                  errorMessage={errors.passport_number?.message}
                  isRequired={true}
                  error={!!errors.passport_number}
                  label="Passport No"
                />
              )}
            />
            <View className="">
              <Text className="mb-2 text-sm font-medium text-foreground">
                Gender <Text className="text-destructive">*</Text>
              </Text>

              <Controller
                name="gender"
                control={control}
                render={({ field: { onChange } }) => (
                  <GenderSelectField onGenderChange={onChange} error={!!errors.gender} />
                )}
              />

              {errors.gender && (
                <Text className="ml-0.5 mt-1 text-xs text-destructive">
                  {errors.gender.message}
                </Text>
              )}
            </View>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputField
                  type="password"
                  value={value}
                  onChangeText={(text: string) => {
                    onChange(text.trim());
                  }}
                  placeholder="Password"
                  errorMessage={errors.password?.message}
                  isRequired={true}
                  error={!!errors.password}
                  label="Password"
                />
              )}
            />
            <Controller
              name="confirm_password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputField
                  type="password"
                  value={value}
                  onChangeText={(text: string) => {
                    onChange(text.trim());
                  }}
                  placeholder="Confirm Password"
                  errorMessage={errors.confirm_password?.message}
                  isRequired={true}
                  error={!!errors.confirm_password}
                  label="Confirm Password"
                />
              )}
            />
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
                    SIGN UP
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
              onPress={handleSignIn}
              activeOpacity={0.8}>
              <Text className="text-base text-foreground">Already have an account?{'  '}</Text>
              <View className="flex-row items-center gap-x-1">
                <Text className="text-base font-bold text-primary">Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
