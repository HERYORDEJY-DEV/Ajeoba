/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React from 'react';
import {StyleSheet, Text, TextInput, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootNavigation from '~/navigation/RootNavigation.tsx';
import setDefaultProps from 'react-native-simple-default-props';
import {globalStyles} from '~/styles';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  // RN Text component default props
  setDefaultProps(Text, {
    style: {
      color: globalStyles.colors.colorsGrayGray800,
      fontSize: 14,
      fontFamily: globalStyles?.fontFamily.regular,
    },
    allowFontScaling: false,
  });

  // RN TextInput component default props
  setDefaultProps(TextInput, {
    style: {
      color: globalStyles.colors.colorsGrayGray800,
      fontSize: 14,
      fontFamily: globalStyles?.fontFamily.regular,
      backgroundColor: 'transparent',
    },
    placeholderTextColor: globalStyles.colors.colorsGrayGray50,
    underlineColorAndroid: 'transparent',
    allowFontScaling: false,
  });

  return (
    <>
      {/*<SafeAreaProvider initialMetrics={initialWindowMetrics}>*/}
      <RootNavigation />
      {/*</SafeAreaProvider>*/}
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
