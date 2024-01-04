// TabBar.tsx
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import TabBarIndicator from '~/components/bottom-tab/TabBarIndicator.tsx';

const {width} = Dimensions.get('window');

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const {routeNames, index: selectedTab} = state;
  const tabWidth = width / routeNames.length;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(tabWidth * selectedTab)}],
  }));
  const {bottom} = useSafeAreaInsets();

  return (
    <>
      <TabBarIndicator
        tabCount={routeNames.length}
        animatedStyle={animatedStyle}
      />
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: isFocused ? '#00f' : '#333'}}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', backgroundColor: 'white'},
});
