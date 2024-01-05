import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigation from '~/navigation/MainStackNavigation.tsx';

export default function RootNavigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <MainStackNavigation />
    </NavigationContainer>
  );
}
