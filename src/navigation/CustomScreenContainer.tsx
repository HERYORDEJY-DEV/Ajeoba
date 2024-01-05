import React, {PropsWithChildren} from 'react';
import {StatusBar, StyleSheet, ViewStyle} from 'react-native';
import {Edges, SafeAreaView} from 'react-native-safe-area-context';
import {useThemeMode} from '~/hooks/useThemeMode.ts';
import {globalStyles} from '~/styles';

interface Props extends PropsWithChildren {
  style?: ViewStyle;
  edges?: Edges;
}

export default function CustomScreenContainer({
  ...props
}: Props): React.JSX.Element {
  const isDarkMode = useThemeMode();
  return (
    <SafeAreaView style={[styles.container, props.style]} edges={props.edges}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
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
