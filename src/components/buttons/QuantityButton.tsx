import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {globalStyles} from '~/styles';
import {svgAssets} from '~/assets';

const {MinusIcon, PlusIcon} = svgAssets;

interface Props extends TouchableOpacityProps {
  value: number;
  onChange: (value: number) => void;
}

export default function QuantityButton({
  value = 1,
  ...props
}: Props): React.JSX.Element {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={styles.minusButton}
        disabled={props.disabled || value === 1}
        onPress={() => props.onChange?.(value - 1)}>
        <MinusIcon />
      </TouchableOpacity>
      <Text style={[styles.value]}>{value}</Text>
      <TouchableOpacity
        style={styles.plusButton}
        disabled={props.disabled}
        onPress={() => props.onChange?.(value + 1)}>
        <PlusIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colors.colorsSecondarySecondary25,
    borderColor: globalStyles.colors.colorsPrimaryPrimary400,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    width: 118,
    borderRadius: 8,
    flexDirection: 'row',
    paddingVertical: 14,
  },
  minusButton: {paddingRight: 19, paddingLeft: 17},
  plusButton: {paddingLeft: 19, paddingRight: 17},
  value: {
    fontSize: 14,
    fontFamily: globalStyles.fontFamily.semiBold,
    color: globalStyles.colors.colorsPrimaryPrimary400,
    // lineHeight: 13.341,
  },
});
