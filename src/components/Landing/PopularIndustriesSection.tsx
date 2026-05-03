import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import HeaderTitle from '../common/HeaderTitle';
import { useApiCall } from '../../hooks/useApiCall';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIndustries } from '../../redux/slices/industrySlice';
import { getIndustries } from '../../services/industryService';
import IndustryCard from './IndustryCard';
import { TIndustry } from '../../types/industryTypes';
import { gGap } from '../../utils/Sizes';
import SeeMoreButton from '../common/SeeMoreButton';

const PopularIndustriesSection = () => {
  const dispatch = useAppDispatch();
  const industries = useAppSelector(state => state.industry.industries);
  const [expanded, setExpanded] = useState(false);

  const { error, execute } = useApiCall(getIndustries, data => {
    dispatch(setIndustries(data));
  });

  useEffect(() => {
    execute();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleIndustries = useMemo(() => {
    if (expanded) {
      return industries;
    }

    return industries.slice(0, 6);
  }, [expanded, industries]);

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
        data={visibleIndustries}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />

      <SeeMoreButton
        expanded={expanded}
        // hidden={expanded}
        onPress={() => setExpanded(current => !current)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    gap: gGap(10),
  },
  contentContainer: {
    gap: gGap(10),
  },
});

export default PopularIndustriesSection;
