import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import HeaderTitle from '../common/HeaderTitle';
import { useApiCall } from '../../hooks/useApiCall';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setJobs } from '../../redux/slices/jobSlice';
import { getJobs } from '../../services/jobService';
import { TJob } from '../../types/jobTypes';
import TrendingJobCard from './TrendingJobCard';

const DEFAULT_VISIBLE_ITEMS = 1;

const TrendingJobsSection = () => {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(state => state.job.jobs);

  const { error, execute } = useApiCall(getJobs, data => {
    dispatch(setJobs(data));
  });

  useEffect(() => {
    execute();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleJobs = jobs.slice(0, DEFAULT_VISIBLE_ITEMS);
  if (error) {
    return;
  }

  const renderItem = ({ item }: { item: TJob }) => {
    return <TrendingJobCard item={item} />;
  };

  return (
    <View className="mt-4 px-3">
      <HeaderTitle title="Trending Jobs" />
      <FlatList
        data={visibleJobs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TrendingJobsSection;
