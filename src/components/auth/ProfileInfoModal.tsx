import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { X } from 'lucide-react-native';
import RNText from '../common/RNText';
import { cleanUserData, setUser } from '../../redux/slices/authSlice';
import { useApiCall } from '../../hooks/useApiCall';
import { getUserInfo } from '../../services/authService';

const ProfileInfoModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { execute } = useApiCall(getUserInfo, data => {
    console.log('data', JSON.stringify(data, null, 2));
    dispatch(setUser(data));
  });
  const { user: allData } = useAppSelector(state => state.auth);

  useEffect(() => {
    execute();
  }, []);

  const user = allData?.data;

  const handleLogout = () => {
    onClose();
    dispatch(cleanUserData());
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/80 justify-center items-center px-4">
          <TouchableWithoutFeedback>
            <View className="w-full max-w-md bg-card rounded-2xl p-5">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-foreground">
                  Profile Info
                </Text>

                <TouchableOpacity onPress={onClose}>
                  <X size={22} className="text-muted-foreground" />
                </TouchableOpacity>
              </View>

              <View className="h-px bg-border mb-4" />

              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mb-3">
                  <Text className="text-xs text-muted-foreground">Name</Text>
                  <Text className="text-base text-foreground font-medium">
                    {user?.name || 'N/A'}
                  </Text>
                </View>

                <View className="mb-3">
                  <Text className="text-xs text-muted-foreground">Phone</Text>
                  <Text className="text-base text-foreground font-medium">
                    {user?.phone || 'N/A'}
                  </Text>
                </View>

                <View className="mb-3">
                  <Text className="text-xs text-muted-foreground">Email</Text>
                  <Text className="text-base text-foreground font-medium">
                    {user?.email || 'N/A'}
                  </Text>
                </View>

                <View className="mb-3">
                  <Text className="text-xs text-muted-foreground">Gender</Text>
                  <Text className="text-base text-foreground font-medium">
                    {user?.j_s_personal_info?.gender || 'N/A'}
                  </Text>
                </View>

                <View className="mb-3">
                  <Text className="text-xs text-muted-foreground">
                    Date of Birth
                  </Text>
                  <Text className="text-base text-foreground font-medium">
                    {user?.j_s_personal_info?.dob || 'N/A'}
                  </Text>
                </View>

                <View className="mb-3">
                  <Text className="text-xs text-muted-foreground">
                    Passport
                  </Text>
                  <Text className="text-base text-foreground font-medium">
                    {user?.j_s_personal_info?.passport_number || 'N/A'}
                  </Text>
                </View>

                <View className="mt-4 p-3 bg-muted rounded-xl">
                  <Text className="text-xs text-muted-foreground">
                    Profile Completion
                  </Text>
                  <Text className="text-lg font-bold text-primary">
                    {user?.profile_completion ?? 0}%
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    handleLogout();
                  }}
                  className="flex-1 h-12 justify-center items-center bg-red-400 rounded-lg mt-4"
                >
                  <RNText className="text-lg font-semibold text-white">
                    Sign Out
                  </RNText>
                </Pressable>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ProfileInfoModal;
