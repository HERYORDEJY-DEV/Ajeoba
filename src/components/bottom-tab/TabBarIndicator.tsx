import React from 'react';
import {Dimensions, StyleSheet, View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';

const {width} = Dimensions.get('window');

type Props = {
  color: string;
  animatedStyle: ViewStyle;
  tabCount: number;
};

export default function TabBarIndicator(props: Props) {
  return (
    <Animated.View
      style={[
        styles.container,
        props.animatedStyle,
        {width: width / props.tabCount},
      ]}>
      <View style={[styles.content, {backgroundColor: props.color}]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 3,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  content: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: 42,
    height: 3,
    backgroundColor: 'transparent',
  },
});
