import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { User } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';
import RNText from '../common/RNText';
const emojisWithIcons = ['Male', 'Female'];

const GenderSelectField = ({
  error,
  onGenderChange,
}: {
  error: boolean;
  onGenderChange: (gender: 'Male' | 'Female') => void;
}) => {
  const { colors } = useThemeColors();
  return (
    <View>
      <SelectDropdown
        data={emojisWithIcons}
        onSelect={(selectedItem, index) => {
          onGenderChange(selectedItem);
        }}
        renderButton={selectedItem => {
          return (
            <View
              className={`flex-row h-14 items-center bg-card border gap-2 rounded-2xl px-4 ${
                error ? 'border-destructive' : 'border-input'
              }`}
            >
              <User size={20} color={'#2563EB'} />
              <Text className="text-lg text-foreground">
                {(selectedItem && selectedItem) || 'Select gender'}
              </Text>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...(isSelected && { backgroundColor: colors.input }),
              }}
              className={`p-4 border-t-border bg-card ${
                index !== 0 && 'border-t'
              }`}
            >
              <RNText className="text-foreground text-lg">{item}</RNText>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

export default GenderSelectField;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },

  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
