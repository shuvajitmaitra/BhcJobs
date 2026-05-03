import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Phone, Mail, User, Lock, Eye, EyeOff } from 'lucide-react-native';

type InputType = 'name' | 'email' | 'phone' | 'password' | 'text';

interface InputFieldProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  type?: InputType;
  error?: string | boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  type = 'text',
  error,
  maxLength,
  ...rest
}) => {
  const { colors } = useThemeColors();
  const styles = getStyles(colors);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const getIcon = () => {
    const color = error ? '#EF4444' : '#2563EB';

    switch (type) {
      case 'phone':
        return <Phone size={20} color={color} />;
      case 'email':
        return <Mail size={20} color={color} />;
      case 'password':
        return <Lock size={20} color={color} />;
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
    } else {
      onChangeText(text);
    }
  };

  return (
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
  );
};

export default InputField;

const getStyles = (colors: { background: string; foreground: string }) =>
  StyleSheet.create({
    inputStyle: {
      flex: 1,
      marginLeft: 10,
      backgroundColor: colors.background,
      fontSize: 16,
      color: colors.foreground,
    },
  });
