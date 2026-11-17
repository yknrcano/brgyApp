import { useWindowDimensions } from 'react-native';

// Scales sizes against a 390pt-wide phone, clamped so tablets and small phones stay sane.
export default function useResponsive() {
  const { width, height } = useWindowDimensions();
  const factor = Math.min(Math.max(width / 390, 0.9), 1.25);
  return {
    width,
    height,
    isTablet: width >= 600,
    s: (n) => Math.round(n * factor),
  };
}
