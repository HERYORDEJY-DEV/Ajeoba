import {useColorScheme} from 'react-native';

export function useThemeMode() {
  const isDarkMode = useColorScheme() === 'dark';
  return isDarkMode;
}
