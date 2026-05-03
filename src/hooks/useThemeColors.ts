import { useMemo } from 'react';
import { useColorScheme } from 'nativewind';
import { darkColors, lightColors } from '../theme/colors';

export const useThemeColors = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = useMemo(
    () => (isDark ? darkColors : lightColors),
    [isDark],
  );

  return {
    colors,
    colorScheme,
    isDark,
    setColorScheme,
    toggleColorScheme,
  };
};
