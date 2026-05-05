import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAppSelector } from '../../redux/hooks';

const GlobalStatusBar = () => {
  const theme = useAppSelector((state) => state.auth.theme);
  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />;
};

export default GlobalStatusBar;
