import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {globalStyles} from '~/styles';

interface Props extends TouchableOpacityProps {
  title: string;
}

export default function PrimaryButton(props: Props): React.JSX.Element {
  return (
    <TouchableOpacity {...props} style={[styles.container, props.style]}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colors.colorsPrimaryPrimary400,
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    flex: 1,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: globalStyles.fontFamily.medium,
    color: globalStyles.colors.colorsButtonLabelPrimary,
  },
});
