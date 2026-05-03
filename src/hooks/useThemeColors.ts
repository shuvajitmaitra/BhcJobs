import { useMemo } from 'react';
import { useColorScheme } from 'nativewind';
import { darkColors, lightColors } from '../theme/colors';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleLocalTheme } from '../redux/slices/authSlice';

export const useThemeColors = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useAppSelector(state => state.auth.theme);
  const dispatch = useAppDispatch();

  const themeToggle = () => {
    if (theme === 'dark') {
      setColorScheme('light');
      dispatch(toggleLocalTheme());
    } else {
      setColorScheme('dark');
      dispatch(toggleLocalTheme());
    }
  };

  const colors = useMemo(() => (isDark ? darkColors : lightColors), [isDark]);

  return {
    colors,
    colorScheme,
    isDark,
    setColorScheme,
    toggleColorScheme: themeToggle,
  };
};
