import { StatusBar } from 'react-native';
import React from 'react';
import { useColorScheme } from 'nativewind';

const GlobalStatusBar = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark' ? true : false;
  return <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />;
};

export default GlobalStatusBar;
