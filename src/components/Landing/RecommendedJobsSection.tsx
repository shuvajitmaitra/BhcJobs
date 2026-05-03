import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import HeaderTitle from '../common/HeaderTitle';
import { useApiCall } from '../../hooks/useApiCall';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setJobs } from '../../redux/slices/jobSlice';
import { getJobs } from '../../services/jobService';
import { TJob } from '../../types/jobTypes';
import SeeMoreButton from '../common/SeeMoreButton';
import {
  convertCurrencyAmount,
  formatCurrencyCodeAmount,
  getDeadlineText,
  showToast,
} from '../../utils/commonFunction';
import {
  getCurrencyCodeFromLocale,
  getDeviceLocale,
} from '../../utils/currency';
import RecommendedJobCard from './RecommendedJobCard';

const DEFAULT_VISIBLE_ITEMS = 4;

const RecommendedJobsSection = () => {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(state => state.job.jobs);
  const [expanded, setExpanded] = useState(false);

  const locale = getDeviceLocale();
  const localCurrency = getCurrencyCodeFromLocale(locale);

  const { error, execute } = useApiCall(getJobs, data => {
    dispatch(setJobs(data));
  });

  useEffect(() => {
    execute();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleJobs = expanded ? jobs : jobs.slice(0, DEFAULT_VISIBLE_ITEMS);

  if (error) {
    return null;
  }

  const renderItem = ({ item }: { item: TJob }) => {
    const currency = item.currency ?? '';
    const salaryText = formatCurrencyCodeAmount(
      item.min_salary,
      currency || localCurrency,
      locale,
    );

    const salaryApproxText = convertCurrencyAmount({
      amount: item.min_salary,
      currentCurrency: currency,
      localCurrency,
      locale,
    });
    const foodText = formatCurrencyCodeAmount(
      Number(item.food_amount),
      currency || localCurrency,
      locale,
    );

    const foodApproxText = convertCurrencyAmount({
      amount: typeof item.food_amount === 'number' ? item.food_amount : null,
      currentCurrency: currency,
      localCurrency,
      locale,
    });

    return (
      <RecommendedJobCard
        item={item}
        salaryText={salaryText}
        salaryApproxText={salaryApproxText}
        foodText={foodText}
        foodApproxText={foodApproxText}
        deadlineText={getDeadlineText(item.expiry)}
        onPressApply={() => {
          showToast({ title: 'Coming soon...' });
        }}
      />
    );
  };

  return (
    <View className="mt-4 px-3">
      <HeaderTitle title="Recommended Jobs" />
      <FlatList
        data={visibleJobs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
      <SeeMoreButton
        expanded={expanded}
        hidden={jobs.length <= DEFAULT_VISIBLE_ITEMS}
        onPress={() => setExpanded(current => !current)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
  },
});

export default RecommendedJobsSection;
