import { View, Pressable, Platform, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNText from '../common/RNText';
import { formatDate } from '../../utils/commonFunction';
import { Calendar } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

const DatePickerButton = ({
  value,
  onDateChange,
  error,
}: {
  value: Date;
  onDateChange: (date: Date) => void;
  error: boolean;
}) => {
  const {colorScheme} = useThemeColors()
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setOpen(false);
      if (event.type === 'set' && date) {
        setSelectedDate(date);
        onDateChange(date);
      }
    } else {
      
      if (date) setTempDate(date);
    }
  };

  const handleIOSConfirm = () => {
    setSelectedDate(tempDate);
    onDateChange(tempDate);
    setOpen(false);
  };

  const handleIOSCancel = () => {
    setTempDate(selectedDate ?? value); 
    setOpen(false);
  };

  return (
    <View
      className={`flex-row h-14 items-center bg-card border rounded-2xl px-4 ${
        error ? 'border-destructive' : 'border-input'
      }`}
    >
      <Pressable
        onPress={() => setOpen(true)}
        className="flex-1 flex-row items-center gap-2"
      >
        <Calendar size={20} color={'#2563EB'} />
        <RNText className="text-lg text-foreground">
          {selectedDate ? formatDate(selectedDate).display : 'Select Date'}
        </RNText>
      </Pressable>

      
      {Platform.OS === 'android' && open && (
        <DateTimePicker
          mode="date"
          value={selectedDate ?? value}
          maximumDate={new Date()}
          onChange={handleChange}
          display="default"
          themeVariant={colorScheme}
          
        />
      )}

      
      {Platform.OS === 'ios' && (
        <Modal
          visible={open}
          transparent
          animationType="slide"
          onRequestClose={handleIOSCancel}
        >
          
          <TouchableOpacity
            className="flex-1 bg-black/40 justify-center"
            activeOpacity={1}
            onPress={handleIOSCancel}
          />

          
          <View className="bg-card rounded-t-3xl pb-8 justify-center items-center">
            
            <View className="flex-row justify-between items-center px-5 pt-4 pb-2 w-full">
              <TouchableOpacity onPress={handleIOSCancel} className="py-1 px-2">
                <RNText className="text-base text-muted-foreground">Cancel</RNText>
              </TouchableOpacity>
              <RNText className="text-base font-semibold text-foreground">Select Date</RNText>
              <TouchableOpacity onPress={handleIOSConfirm} className="py-1 px-2">
                <RNText className="text-base font-semibold text-primary">Done</RNText>
              </TouchableOpacity>
            </View>
            <View>

            </View>
            <DateTimePicker
              mode="date"
              value={tempDate}
              maximumDate={new Date()}
              onChange={handleChange}
              display="default"
              themeVariant={colorScheme}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DatePickerButton;