import React from 'react';
import { Text, View } from 'react-native';
import { useLandingData } from '../../hooks/useLandingData';

const LandingScreen = () => {
  const {
    companies,
    companiesError,
    companiesLoading,
    industries,
    industriesError,
    industriesLoading,
    isAuthenticate,
    jobs,
    jobsError,
    jobsLoading,
  } = useLandingData();

  return (
    <View className="flex-1 justify-center items-center bg-app-bg">
      <Text>LandingScreen</Text>
      <Text>{`Authenticated: ${isAuthenticate ? 'yes' : 'no'}`}</Text>
      <View>
        <Text>{`Industries loading: ${industriesLoading ? 'yes' : 'no'}`}</Text>
        {industriesError ? (
          <Text>{`Industries error: ${industriesError}`}</Text>
        ) : null}
        <Text>{`Loaded industries: ${industries.length}`}</Text>
      </View>
      <View>
        <Text>{`Companies loading: ${companiesLoading ? 'yes' : 'no'}`}</Text>
        {companiesError ? (
          <Text>{`Companies error: ${companiesError}`}</Text>
        ) : null}
        <Text>{`Loaded companies: ${companies.length}`}</Text>
      </View>
      <View>
        <Text>{`Jobs loading: ${jobsLoading ? 'yes' : 'no'}`}</Text>
        {jobsError ? <Text>{`Jobs error: ${jobsError}`}</Text> : null}
        <Text>{`Loaded jobs: ${jobs.length}`}</Text>
      </View>
    </View>
  );
};

export default LandingScreen;
