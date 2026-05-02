import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loadCompanies } from '../../services/companyService';
import { loadIndustries } from '../../services/industryService';
import { loadJobs } from '../../services/jobService';

const LandingScreen = () => {
  const dispatch = useAppDispatch();
  const { industries, isLoading, error } = useAppSelector(
    state => state.industry,
  );
  const { companies, isLoading: companiesLoading } = useAppSelector(
    state => state.company,
  );
  const { jobs, isLoading: jobsLoading } = useAppSelector(state => state.job);
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    loadIndustries(dispatch);
    loadCompanies(dispatch);
    loadJobs(dispatch);
  }, [dispatch]);

  return (
    <View className="flex-1 justify-center items-center bg-app-bg">
      <Text>LandingScreen</Text>
      <Text>{`Authenticated: ${isAuthenticated ? 'yes' : 'no'}`}</Text>
      {error ? <Text>{error}</Text> : null}
      {isLoading || companiesLoading || jobsLoading ? (
        <Text>Loading...</Text>
      ) : null}
      {!isLoading && !error ? (
        <View>
          <Text>{`Loaded industries: ${industries.length}`}</Text>
          <Text>{`Loaded companies: ${companies.length}`}</Text>
          <Text>{`Loaded jobs: ${jobs.length}`}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default LandingScreen;
