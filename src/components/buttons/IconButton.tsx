import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {globalStyles} from '~/styles';

interface Props extends TouchableOpacityProps {
  iconElement: React.ReactNode;
}

export default function IconButton(props: Props): React.JSX.Element {
  return props.iconElement ? (
    <TouchableOpacity {...props} style={[styles.container, props.style]}>
      {props.iconElement}
    </TouchableOpacity>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colors.colorsPrimaryPrimary400,
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    width: 46,
    borderRadius: 8,
  },
});
