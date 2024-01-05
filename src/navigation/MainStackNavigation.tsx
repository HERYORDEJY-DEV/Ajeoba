import React from 'react';
import {MainStackParamList} from '~/navigation/types.ts';
import TabStackNavigation from '~/navigation/TabStackNavigation.tsx';
import ProductDetails from '~/screens/ProductDetails.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductList from '~/screens/ProductList.tsx';

const {Screen, Navigator} = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigation() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={'Tab'} component={TabStackNavigation} />
      <Screen name={'ProductDetails'} component={ProductDetails} />
      <Screen name={'ProductList'} component={ProductList} />
    </Navigator>
  );
}
