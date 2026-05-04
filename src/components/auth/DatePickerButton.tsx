import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import RNText from '../common/RNText';
import { useThemeColors } from '../../hooks/useThemeColors';
import { formatDate } from '../../utils/commonFunction';
import { Calendar } from 'lucide-react-native';

const DatePickerButton = ({
  value,
  onDateChange,
  error,
}: {
  value: Date;
  onDateChange: (date: Date) => void;
  error: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const { colorScheme } = useThemeColors();
  const [selectedDate, setSelectedDate] = useState<Date | ''>('');

  return (
    <View
      className={`flex-row h-14 items-center bg-card border rounded-2xl px-4 ${
        error ? 'border-destructive' : 'border-input'
      }`}
    >
      <Pressable
        onPress={() => {
          setOpen(!open);
        }}
        className="flex-1 flex-row items-center gap-2 "
      >
        <Calendar size={20} color={'#2563EB'} />
        <RNText className="text-lg text-foreground">
          {selectedDate ? formatDate(selectedDate).display : 'Select Date'}
        </RNText>
      </Pressable>
      <DatePicker
        theme={colorScheme}
        modal
        mode="date"
        open={open}
        date={value}
        onConfirm={date => {
          setOpen(false);
          onDateChange(date);
          setSelectedDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        maximumDate={new Date()}
      />
    </View>
  );
};

export default DatePickerButton;
