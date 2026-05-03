import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import HeaderTitle from '../common/HeaderTitle';
import { useApiCall } from '../../hooks/useApiCall';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setJobs } from '../../redux/slices/jobSlice';
import { getJobs } from '../../services/jobService';
import { TJob } from '../../types/jobTypes';
import SeeMoreButton from '../common/SeeMoreButton';
import TrendingJobCard from './TrendingJobCard';

const DEFAULT_VISIBLE_ITEMS = 4;

const TrendingJobsSection = () => {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(state => state.job.jobs);
  const [expanded, setExpanded] = useState(false);

  const { error, execute } = useApiCall(getJobs, data => {
    dispatch(setJobs(data));
  });

  useEffect(() => {
    execute();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleJobs = useMemo(() => {
    if (expanded) {
      return jobs;
    }

    return jobs.slice(0, DEFAULT_VISIBLE_ITEMS);
  }, [expanded, jobs]);

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
      <SeeMoreButton
        expanded={expanded}
        hidden={jobs.length <= DEFAULT_VISIBLE_ITEMS}
        onPress={() => setExpanded(current => !current)}
      />
    </View>
  );
};

export default TrendingJobsSection;
