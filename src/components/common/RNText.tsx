import React from 'react';
import {
  Text,
  TextProps,
  StyleProp,
  TextStyle,
  StyleSheet,
} from 'react-native';

interface RNTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const RNText = ({ children, style, ...props }: RNTextProps) => {
  const flattenedStyle = StyleSheet.flatten(style);
  const cleanedStyle = flattenedStyle
    ? Object.fromEntries(
        Object.entries(flattenedStyle).filter(([key]) => key !== 'lineHeight'),
      )
    : undefined;

  return (
    <Text {...props} style={[cleanedStyle]}>
      {children}{' '}
    </Text>
  );
};

export default RNText;
