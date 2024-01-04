import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface TabBarItemProps extends TouchableOpacityProps {
  title: string;
  isActive: boolean;
}

export function TabBarItem({title, isActive, ...props}: TabBarItemProps) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} {...props}>
      <Text style={isActive && styles.selected}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', paddingVertical: 16},
  selected: {fontWeight: '700'},
});
