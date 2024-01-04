import React from 'react';
import {MainStackParamList} from '~/navigation/types.ts';
import {StyleSheet} from 'react-native';
import TabStackNavigation from '~/navigation/TabStackNavigation.tsx';
import ProductDetails from '~/screens/ProductDetails.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Screen, Navigator} = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigation() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={'Tab'} component={TabStackNavigation} />
      <Screen name={'ProductDetails'} component={ProductDetails} />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 14,
  },
});
