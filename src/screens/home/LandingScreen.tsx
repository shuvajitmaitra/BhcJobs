import React from 'react';
import { ScrollView } from 'react-native';
import BannerSection from '../../components/Landing/BannerSection';
import PopularIndustriesSection from '../../components/Landing/PopularIndustriesSection';

const LandingScreen = () => {
  const scrollContentStyle = { paddingBottom: 32 };

  return (
    <ScrollView
      className="flex-1 bg-app-bg"
      contentContainerStyle={scrollContentStyle}
      showsVerticalScrollIndicator={false}
    >
      <BannerSection />
      <PopularIndustriesSection />
    </ScrollView>
  );
};

export default LandingScreen;
