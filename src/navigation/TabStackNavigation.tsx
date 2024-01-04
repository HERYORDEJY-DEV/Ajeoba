import React from 'react';
import {TabStackParamList} from '~/navigation/types.ts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import TabBar from '~/components/bottom-tab/TabBar.tsx';
import Home from '~/screens/Home.tsx';
import Profile from '~/screens/Profile.tsx';
import Wallet from '~/screens/Wallet.tsx';
import Orders from '~/screens/Orders.tsx';
import {globalStyles} from '~/styles';

const {Screen, Navigator} = createBottomTabNavigator<TabStackParamList>();

export default function TabStackNavigation() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => (
        <TabBar
          {...{
            activeTintColor: globalStyles.colors.colorsPrimaryPrimary400,
            inactiveTintColor: 'rgba(0, 0, 0, 0.50)',
            tabBarStyle: {
              backgroundColor: globalStyles.colors.colorsSecondarySecondary25,
            },
            ...props,
          }}
        />
      )}>
      <Screen name={'Home'} component={Home} />
      <Screen name={'Orders'} component={Orders} />
      <Screen name={'Wallet'} component={Wallet} />
      <Screen name={'Profile'} component={Profile} />
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
