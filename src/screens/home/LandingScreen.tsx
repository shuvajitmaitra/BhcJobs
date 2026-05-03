import React from 'react';
import { ScrollView } from 'react-native';
import BannerSection from '../../components/Landing/BannerSection';
import PopularIndustriesSection from '../../components/Landing/PopularIndustriesSection';
import TrendingJobsSection from '../../components/Landing/TrendingJobsSection';

const LandingScreen = () => {
  const scrollContentStyle = { paddingBottom: 32 };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={scrollContentStyle}
      showsVerticalScrollIndicator={false}
    >
      <BannerSection />
      <PopularIndustriesSection />
      <TrendingJobsSection />
    </ScrollView>
  );
};

export default LandingScreen;
