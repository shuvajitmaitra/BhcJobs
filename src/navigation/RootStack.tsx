import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/home/LandingScreen';
import GlobalHeader from '../components/common/GlobalHeader';

const Stack = createNativeStackNavigator();
const renderHeader = () => {
  return <GlobalHeader />;
};

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{
          header: () => renderHeader(),
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
