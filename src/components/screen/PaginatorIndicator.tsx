import React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {globalStyles} from '~/styles';

interface Props {
  data?: [];
  dotIndex: number;
  activeDotIndex: {value: number};
  borderColor?: string;
  activeBorderColor?: string;
  borderWidth?: number;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  height?: number;
  activeHeight?: number;
  width?: number;
  activeWidth?: number;
  borderRadius?: number;
  activeBorderRadius?: number;
  onPressActive?: (e: number) => void;
  containerStyles?: ViewStyle;
  contentStyles?: ViewStyle;
}

export default function PaginatorIndicator({...props}: Props) {
  const pagDotStyle = useAnimatedStyle(() => {
    const isActive = props.dotIndex === Number(props.activeDotIndex.value);
    return {
      //
      backgroundColor: withTiming(
        isActive
          ? props.activeBackgroundColor ??
              globalStyles.colors.colorsPrimaryPrimary400
          : props.backgroundColor ?? '#D9D9D9',
        {duration: 100},
      ),
      height: isActive ? props.activeHeight ?? 7 : props.height ?? 7, // isActive ? props.activeSize ?? 10 :
      width: isActive ? props.activeWidth ?? 19 : props.width ?? 7, //props.activeSize ?? 10 : props.size ?? 10,
      borderRadius: isActive
        ? props.activeBorderRadius ?? 12
        : props.borderRadius ?? 7,

      ...props.contentStyles,
    };
  });

  return (
    <Pressable
      onPress={() => props.onPressActive?.(props.dotIndex)}
      style={{...props.containerStyles}}>
      <Animated.View
        key={`${props.dotIndex}`}
        style={{
          ...pagDotStyle,
        }}
      />
    </Pressable>
  );
}
