import {useWindowDimensions} from 'react-native';

export const SCREEN = {
  PORTRAIT: 'PORTRAIT',
  LANDSCAPE: 'LANDSCAPE',
};

export default function useOrientation(value, delay) {
  const {width, height} = useWindowDimensions();

  return width < height ? SCREEN.PORTRAIT : SCREEN.LANDSCAPE;
}
