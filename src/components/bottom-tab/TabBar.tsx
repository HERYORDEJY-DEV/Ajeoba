// TabBar.tsx
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import TabBarIndicator from '~/components/bottom-tab/TabBarIndicator.tsx';
import {svgAssets} from '~/assets';

const {width} = Dimensions.get('window');
const {
  HomeTabActiveIcon,
  HomeTabIcon,
  OrdersTabIcon,
  OrdersTabActiveIcon,
  WalletTabIcon,
  WalletTabActiveIcon,
  ProfileTabIcon,
  ProfileTabActiveIcon,
} = svgAssets;
interface Props extends BottomTabBarProps {
  activeTintColor: string;
  inactiveTintColor: string;
  tabBarStyle: ViewStyle;
}

export default function TabBar({state, navigation, ...props}: Props) {
  const {activeTintColor, inactiveTintColor} = props;
  const {routeNames, index: selectedTab} = state;
  const tabWidth = width / routeNames.length;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(tabWidth * selectedTab)}],
  }));
  const safeAreaInsets = useSafeAreaInsets();

  const getTabIcon = (label: string, isFocused: boolean) => {
    switch (label) {
      case 'Home':
        return isFocused ? <HomeTabActiveIcon /> : <HomeTabIcon />;
      case 'Orders':
        return isFocused ? <OrdersTabActiveIcon /> : <OrdersTabIcon />;
      case 'Wallet':
        return isFocused ? <WalletTabActiveIcon /> : <WalletTabIcon />;
      case 'Profile':
        return isFocused ? <ProfileTabActiveIcon /> : <ProfileTabIcon />;
    }
  };

  return (
    <>
      <View
        style={[
          styles.container,
          props.tabBarStyle,
          {paddingBottom: safeAreaInsets.bottom},
        ]}>
        <TabBarIndicator
          color={activeTintColor}
          animatedStyle={animatedStyle}
          tabCount={state.routes.length}
        />
        {state.routes.map((route, index) => {
          const label = route.name;
          const key = route.key;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={key}
              onPress={onPress}
              style={styles.tabItem}>
              {getTabIcon(label, isFocused)}
              <Text
                style={{
                  color: isFocused ? activeTintColor : inactiveTintColor,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', backgroundColor: 'white'},
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 9,
    rowGap: 4,
  },
});
