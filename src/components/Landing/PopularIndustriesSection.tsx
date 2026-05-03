import { FlatList, View } from 'react-native';
import React, { useEffect } from 'react';
import HeaderTitle from '../common/HeaderTitle';
import { useApiCall } from '../../hooks/useApiCall';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIndustries } from '../../redux/slices/industrySlice';
import { getIndustries } from '../../services/industryService';
import IndustryCard from './IndustryCard';
import { TIndustry } from '../../types/industryTypes';
import { gGap } from '../../utils/Sizes';

const PopularIndustriesSection = () => {
  const dispatch = useAppDispatch();
  const industries = useAppSelector(state => state.industry.industries);

  const { error, execute } = useApiCall(getIndustries, data => {
    dispatch(setIndustries(data));
  });

  useEffect(() => {
    execute();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return;
  }

  const renderItem = ({ item }: { item: TIndustry }) => {
    return <IndustryCard item={item} />;
  };
  return (
    <View className="px-3">
      <HeaderTitle title="Popular Industries" />
      <FlatList
        data={industries}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: gGap(10) }}
        contentContainerStyle={{ gap: gGap(10) }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PopularIndustriesSection;
