import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  TextInputProps,
} from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColors';
import {
  Phone,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
} from 'lucide-react-native';

type InputType = 'name' | 'email' | 'phone' | 'password' | 'passport' | 'text';

interface InputFieldProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  type?: InputType;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  type = 'text',
  error,
  errorMessage,
  label,
  isRequired,
  maxLength,
  ...rest
}) => {
  const { colors } = useThemeColors();
  const styles = getStyles(colors);

  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    const color = error ? '#EF4444' : '#2563EB';

    switch (type) {
      case 'phone':
        return <Phone size={20} color={color} />;
      case 'email':
        return <Mail size={20} color={color} />;
      case 'password':
        return <Lock size={20} color={color} />;
      case 'passport':
        return <CreditCard size={20} color={color} />;
      case 'name':
      default:
        return <User size={20} color={color} />;
    }
  };

  const getKeyboardType = (): TextInputProps['keyboardType'] => {
    if (type === 'email') return 'email-address';
    if (type === 'phone') return 'phone-pad';
    return 'default';
  };

  const handleChange = (text: string) => {
    if (type === 'phone') {
      const filtered = text.replace(/[^0-9]/g, '').slice(0, 11);
      onChangeText(filtered);
    } else if (type === 'passport') {
      const filtered = text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      onChangeText(filtered);
    } else {
      onChangeText(text);
    }
  };

  return (
    <View className="">
      {label && (
        <Text className="text-sm font-medium text-foreground mb-2">
          {label} {isRequired && <Text className="text-destructive">*</Text>}
        </Text>
      )}

      <View
        className={`flex-row h-14 items-center bg-card border rounded-2xl px-4 ${
          error ? 'border-destructive' : 'border-input'
        }`}
      >
        {getIcon()}

        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          keyboardType={getKeyboardType()}
          secureTextEntry={type === 'password' && !showPassword}
          maxLength={maxLength}
          autoCapitalize={type === 'passport' ? 'characters' : 'none'}
          style={styles.inputStyle}
          {...rest}
        />

        {type === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
            {showPassword ? (
              <EyeOff size={20} color="#6B7280" />
            ) : (
              <Eye size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && (
        <Text className="text-destructive text-xs mt-1 ml-0.5">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default InputField;

const getStyles = (colors: {
  background: string;
  foreground: string;
  mutedForeground: string;
}) =>
  StyleSheet.create({
    inputStyle: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: colors.foreground,
    },
  });
