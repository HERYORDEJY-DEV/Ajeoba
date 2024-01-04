import React, {PropsWithChildren} from 'react';
import {StatusBar, StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeMode} from '~/hooks/useThemeMode.ts';
import {globalStyles} from '~/styles';

interface Props extends PropsWithChildren {
  style?: ViewStyle;
}

export default function CustomScreenContainer(props: Props): React.JSX.Element {
  const isDarkMode = useThemeMode();
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      <>{props.children}</>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.screenBackground,
  },
});
