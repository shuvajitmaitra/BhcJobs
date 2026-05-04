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
import { useApiCall } from '../../hooks/useApiCall';
import { createUser } from '../../services/authService';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { TRegisterPayload } from '../../types/authTypes';
import LinearGradient from 'react-native-linear-gradient';
import { useThemeColors } from '../../hooks/useThemeColors';
import { UserPlus, UserRoundCheck } from 'lucide-react-native';
import InputField from '../../components/common/InputField';
import DatePicker from 'react-native-date-picker';
import DatePickerButton from '../../components/auth/DatePickerButton';
import GenderSelectField from '../../components/auth/GenderSelectField';

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { isDark } = useThemeColors();

  const { execute, loading: isLoading } = useApiCall(createUser, data => {
    if (!data.error) {
      navigation.navigate('VerifyUser');
    }
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: 'Shuvajit Maitra',
      phone: '01949887896',
      email: 'shuvajitmaitra@gmail.com',
      password: 'Shuvajit#1',
      confirm_password: 'Shuvajit#1',
      nid: '',
      dob: new Date(),
      passport_number: 'A12345697',
      gender: 'Male',
    },
  });

  const onSubmit = (data: TRegisterPayload) => {
    execute(data);
  };
  const gradient = isDark
    ? ['#253349', '#1C2A3A', '#0F1822', '#080E16']
    : ['#7aa8ea', '#b3cef3', '#edf5fe', '#e8f5fc'];
  const handleSignIn = () => {
    navigation.dispatch(StackActions.replace('SignIn'));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: '50%', width: '100%', position: 'absolute' }}
      />
      <View className="flex-1 ">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="flex-grow justify-start items-center py-10 px-6"
        >
          <View className="bg-card w-full rounded-3xl p-7 border border-border gap-4">
            <View className="flex-row items-center justify-center gap-x-3">
              <Text className="text-2xl font-bold text-primary tracking-tight">
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
            <View className="">
              <Text className="text-sm font-medium text-foreground mb-2">
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
                <Text className="text-destructive text-xs mt-1 ml-0.5">
                  {errors.dob.message}
                </Text>
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
              <Text className="text-sm font-medium text-foreground mb-2">
                Gender <Text className="text-destructive">*</Text>
              </Text>

              <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <GenderSelectField
                    onGenderChange={onChange}
                    error={!!errors.gender}
                  />
                )}
              />

              {errors.gender && (
                <Text className="text-destructive text-xs mt-1 ml-0.5">
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
              className={`bg-primary rounded-2xl py-4 items-center justify-center mb-5 ${
                !isValid || isLoading ? 'opacity-50' : ''
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isLoading}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <View className="flex-row items-center gap-x-2">
                  <Text className="text-primary-foreground text-lg font-bold tracking-widest">
                    SIGN UP
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <View className="flex-row items-center mb-5">
              <View className="flex-1 h-px bg-border" />
              <Text className="mx-4 text-muted-foreground text-sm font-semibold">
                OR
              </Text>
              <View className="flex-1 h-px bg-border" />
            </View>
            <TouchableOpacity
              className="flex-row items-center justify-center"
              onPress={handleSignIn}
              activeOpacity={0.8}
            >
              <Text className="text-foreground text-base">
                Already have an account?{'  '}
              </Text>
              <View className="flex-row items-center gap-x-1">
                <Text className="text-primary text-base font-bold">
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
