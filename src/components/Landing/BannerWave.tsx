import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AnimatedView = Animated.createAnimatedComponent(View);

type BannerWaveProps = {
  backgroundColor: string;
};

const createSineWavePath = (
  width = 1440,
  height = 180,
  midY = 80,
  amplitude = 25,
  cycles = 1,
) => {
  const points = Array.from({ length: 121 }, (_, i) => {
    const x = (i / 120) * width;
    const y = midY + amplitude * Math.sin((x / width) * cycles * 2 * Math.PI);

    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  });

  return `${points.join(' ')} L${width},${height} L0,${height} Z`;
};

const WAVE_PATH = createSineWavePath();

const BannerWave = ({ backgroundColor }: BannerWaveProps) => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-SCREEN_WIDTH, {
        duration: 15000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.waveContainer} pointerEvents="none">
      <AnimatedView style={[styles.animatedWaveRow, animatedStyle]}>
        <Svg
          width={SCREEN_WIDTH}
          height={96}
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <Path fill={backgroundColor} d={WAVE_PATH} />
        </Svg>

        <Svg
          width={SCREEN_WIDTH}
          height={96}
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <Path fill={backgroundColor} d={WAVE_PATH} />
        </Svg>
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  waveContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    height: 96,
    overflow: 'hidden',
  },
  animatedWaveRow: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 2,
    flexDirection: 'row',
  },
});

export default BannerWave;
