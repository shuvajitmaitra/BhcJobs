import React from 'react';
import { ScrollView, View } from 'react-native';
import BannerSection from '../../components/Landing/BannerSection';

const LandingScreen = () => {
  const scrollContentStyle = { paddingBottom: 32 };

  return (
    <ScrollView
      className="flex-1 bg-app-surface"
      contentContainerStyle={scrollContentStyle}
      showsVerticalScrollIndicator={false}
    >
      <BannerSection />
      <View className="px-5 pt-6" />
    </ScrollView>
  );
};

export default LandingScreen;
