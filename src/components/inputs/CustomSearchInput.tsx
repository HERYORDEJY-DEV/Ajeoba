import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {svgAssets} from '~/assets';

const {SearchIcon} = svgAssets;

interface Props extends TextInputProps {
  containerStyle?: ViewStyle;
}

export default function CustomSearchInput(props: Props): React.JSX.Element {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <SearchIcon />
      <TextInput
        {...props}
        multiline={false}
        style={styles.textInput}
        // placeholderTextColor={globalStyles.colors.colorsGrayGray50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 47,
    // width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    columnGap: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(242, 242, 242, 0.50)',
    flex: 1,
  },
  textInput: {
    backgroundColor: 'transparent',
    flex: 1,
    height: '100%',
    paddingVertical: 13,
  },
});
